// ─── Renderer / Scene / Camera ───────────────────────────────────────────────
const canvas   = document.getElementById('bg');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x03000a, 1);

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 5.5;

const clock = new THREE.Clock();

// ─── GLSL Simplex 3D Noise ───────────────────────────────────────────────────
const NOISE = `
vec3 _m289v(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 _m289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 _perm(vec4 x){return _m289(((x*34.)+1.)*x);}
vec4 _tiSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=_m289v(i);
  vec4 p=_perm(_perm(_perm(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 xv=x_*ns.x+ns.yyyy;vec4 yv=y_*ns.x+ns.yyyy;vec4 h=1.-abs(xv)-abs(yv);
  vec4 b0=vec4(xv.xy,yv.xy);vec4 b1=vec4(xv.zw,yv.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=_tiSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

// ─── Planet Sphere ───────────────────────────────────────────────────────────
const sphereMat = new THREE.ShaderMaterial({
  vertexShader: `
    ${NOISE}
    uniform float uTime; uniform float uMorph;
    varying vec3 vNorm; varying vec3 vWorld; varying float vDisp;
    void main(){
      vec3 p=position;
      float n1=snoise(p*1.55+uTime*0.09)*0.32;
      float n2=snoise(p*3.10+uTime*0.06)*0.13;
      float n3=snoise(p*6.80+uTime*0.04)*0.048;
      float disp=(n1+n2+n3)*uMorph;
      vec3 displaced=p+normal*disp;
      vDisp=disp; vNorm=normalMatrix*normal;
      vWorld=(modelMatrix*vec4(displaced,1.0)).xyz;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(displaced,1.0);
    }`,
  fragmentShader: `
    uniform vec3 uCam;
    varying vec3 vNorm; varying vec3 vWorld; varying float vDisp;
    void main(){
      vec3 view=normalize(uCam-vWorld);
      vec3 n=normalize(vNorm);
      float fr=pow(1.0-max(dot(view,n),0.0),2.8);
      vec3 dark=vec3(0.012,0.004,0.055);
      vec3 mid=vec3(0.45,0.12,0.88);
      vec3 bright=vec3(0.72,0.48,1.0);
      vec3 col=dark;
      col=mix(col,mid,fr*0.88);
      col=mix(col,bright,pow(fr,5.0)*0.65);
      col+=mid*smoothstep(0.0,0.38,vDisp)*0.28;
      gl_FragColor=vec4(col,0.72+fr*0.28);
    }`,
  uniforms: {
    uTime:  { value: 0 },
    uMorph: { value: 1.0 },
    uCam:   { value: camera.position },
  },
  transparent: true,
});
const planet = new THREE.Mesh(new THREE.SphereGeometry(2.0, 128, 128), sphereMat);
scene.add(planet);

// ─── Atmosphere Halo ─────────────────────────────────────────────────────────
const atmMat = new THREE.ShaderMaterial({
  vertexShader: `
    varying vec3 vN; varying vec3 vW;
    void main(){
      vN=normalMatrix*normal;
      vW=(modelMatrix*vec4(position,1.0)).xyz;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
    }`,
  fragmentShader: `
    uniform vec3 uCam; varying vec3 vN; varying vec3 vW;
    void main(){
      vec3 d=normalize(uCam-vW);
      float f=pow(1.0-max(dot(d,normalize(vN)),0.0),3.2);
      gl_FragColor=vec4(vec3(0.45,0.12,0.88)*f,f*0.48);
    }`,
  uniforms: { uCam: { value: camera.position } },
  transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
});
scene.add(new THREE.Mesh(new THREE.SphereGeometry(2.18, 64, 64), atmMat));

// ─── Orbital Ring ────────────────────────────────────────────────────────────
const ring = new THREE.Mesh(
  new THREE.TorusGeometry(3.0, 0.013, 6, 120),
  new THREE.MeshBasicMaterial({ color: 0x7733bb, transparent: true, opacity: 0.28 })
);
ring.rotation.x = Math.PI / 2.6;
ring.rotation.z = Math.PI / 7;
scene.add(ring);

// ─── Floating Debris ─────────────────────────────────────────────────────────
const debrisDefs = [
  { geo: THREE.OctahedronGeometry,   r: 0.14, pos: [-5.8,  2.6, -3.2], spd: 0.6  },
  { geo: THREE.IcosahedronGeometry,  r: 0.09, pos: [ 5.2, -1.8, -3.8], spd: 0.45 },
  { geo: THREE.TetrahedronGeometry,  r: 0.12, pos: [-3.5, -3.2, -4.0], spd: 0.8  },
  { geo: THREE.OctahedronGeometry,   r: 0.08, pos: [ 4.2,  3.1, -5.0], spd: 0.55 },
  { geo: THREE.IcosahedronGeometry,  r: 0.10, pos: [-6.5, -1.2, -4.5], spd: 0.7  },
  { geo: THREE.DodecahedronGeometry, r: 0.07, pos: [ 3.0,  4.2, -5.5], spd: 0.35 },
];
const debris = debrisDefs.map(({ geo, r, pos, spd }) => {
  const m = new THREE.Mesh(
    new geo(r, 0),
    new THREE.MeshBasicMaterial({ color: 0x9944cc, wireframe: true, transparent: true, opacity: 0.35 })
  );
  m.position.set(...pos);
  m.userData = { spd, oy: pos[1] };
  scene.add(m);
  return m;
});

// ─── Stars ───────────────────────────────────────────────────────────────────
function makeStars(count, rMin, rMax, color, size, opacity) {
  const buf = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = rMin + Math.random() * (rMax - rMin);
    const t = Math.random() * Math.PI * 2;
    const p = Math.acos(2 * Math.random() - 1);
    buf[i*3]   = r * Math.sin(p) * Math.cos(t);
    buf[i*3+1] = r * Math.sin(p) * Math.sin(t);
    buf[i*3+2] = r * Math.cos(p);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(buf, 3));
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ size, color, transparent: true, opacity, sizeAttenuation: true })));
}

makeStars(600, 16, 30, 0xd4bef5, 0.10, 0.72);   // main stars
makeStars(120, 12, 20, 0xd4bef5, 0.18, 0.55);   // brighter closer stars
makeStars( 40,  9, 15, 0xcc88ff, 0.24, 0.80);   // purple accent dots

// ─── Nebula Clusters ─────────────────────────────────────────────────────────
function makeNebula(count, cx, cy, cz, spread, color, size) {
  const buf = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    buf[i*3]   = cx + (Math.random() - 0.5) * spread;
    buf[i*3+1] = cy + (Math.random() - 0.5) * spread * 0.6;
    buf[i*3+2] = cz + (Math.random() - 0.5) * spread * 0.4;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(buf, 3));
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ size, color, transparent: true, opacity: 0.28, sizeAttenuation: true })));
}

makeNebula(90, -8,  3, -8, 5, 0x8833bb, 0.12);
makeNebula(70,  7, -4, -9, 4, 0x6622aa, 0.10);
makeNebula(50,  0,  6, -10, 3, 0xaa55dd, 0.09);

// ─── Mouse / Camera ───────────────────────────────────────────────────────────
const mouse = { x: 0, y: 0 };
const cam   = { x: 0, y: 0 };

window.addEventListener('mousemove', e => {
  mouse.x =  (e.clientX / innerWidth  - 0.5) * 2;
  mouse.y = -(e.clientY / innerHeight - 0.5) * 2;
});

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});

// ─── Animation Loop ───────────────────────────────────────────────────────────
let morphTarget  = 1.0;
let morphCurrent = 1.0;

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  planet.rotation.y = t * 0.055;
  planet.rotation.x = t * 0.025;

  ring.rotation.z += 0.0006;

  debris.forEach((d, i) => {
    d.rotation.x += 0.005 * d.userData.spd;
    d.rotation.y += 0.007 * d.userData.spd;
    d.position.y  = d.userData.oy + Math.sin(t * 0.4 + i * 1.3) * 0.22;
  });

  morphCurrent += (morphTarget - morphCurrent) * 0.06;
  sphereMat.uniforms.uTime.value  = t;
  sphereMat.uniforms.uMorph.value = morphCurrent;
  sphereMat.uniforms.uCam.value.copy(camera.position);
  atmMat.uniforms.uCam.value.copy(camera.position);

  cam.x += (mouse.x * 0.32 - cam.x) * 0.032;
  cam.y += (mouse.y * 0.2  - cam.y) * 0.032;
  camera.position.x = cam.x;
  camera.position.y = cam.y;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
animate();

// ─── Navigation ──────────────────────────────────────────────────────────────
const homeEl    = document.getElementById('home');
const sectionEl = document.getElementById('section-view');
const bodyEl    = document.getElementById('sectionBody');
const globalNav = document.getElementById('global-nav');
const loader    = document.getElementById('loader');

function deformPlanet() {
  morphTarget = 2.6;
  setTimeout(() => { morphTarget = 1.0; }, 650);
}

function showHome() {
  deformPlanet();
  sectionEl.classList.remove('active');
  globalNav.classList.remove('in-section');
  setTimeout(() => homeEl.classList.add('active'), 320);
}

function showSection(name) {
  const tpl = document.getElementById('tpl-' + name);
  if (!tpl) return;
  deformPlanet();
  homeEl.classList.remove('active');
  sectionEl.classList.remove('active');
  globalNav.classList.add('in-section');
  setTimeout(() => {
    bodyEl.innerHTML = '';
    bodyEl.appendChild(tpl.content.cloneNode(true));
    sectionEl.scrollTop = 0;
    sectionEl.classList.add('active');
  }, 370);
}

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-target]');
  if (!btn) return;
  const t = btn.dataset.target;
  if (t === 'home') showHome();
  else showSection(t);
});

// ─── Ambient Audio ────────────────────────────────────────────────────────────
const musicBtn = document.getElementById('musicBtn');
let audioCtx   = null;
let masterGain = null;
let playing    = false;

function buildAudio() {
  if (audioCtx) return;
  audioCtx   = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
  const compressor = audioCtx.createDynamicsCompressor();
  compressor.threshold.value = -24; compressor.ratio.value = 4;
  masterGain.connect(compressor);
  compressor.connect(audioCtx.destination);

  const delay = audioCtx.createDelay(6.0);
  delay.delayTime.value = 3.5;
  const delayFb = audioCtx.createGain(); delayFb.gain.value = 0.38;
  delay.connect(delayFb); delayFb.connect(delay); delayFb.connect(masterGain);

  const lpf = audioCtx.createBiquadFilter();
  lpf.type = 'lowpass'; lpf.frequency.value = 520; lpf.Q.value = 0.6;
  lpf.connect(masterGain); lpf.connect(delay);

  [{ f:55.0,g:0.26 },{ f:82.4,g:0.14 },{ f:110.0,g:0.09 },{ f:164.8,g:0.055 },{ f:220.0,g:0.03 }]
    .forEach(({ f, g }) => {
      const osc = audioCtx.createOscillator();
      const gn  = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = f * (1 + (Math.random() - 0.5) * 0.003);
      gn.gain.value = g;
      osc.connect(gn); gn.connect(lpf); osc.start();
    });

  const sr  = audioCtx.sampleRate;
  const buf = audioCtx.createBuffer(1, sr * 3, sr);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = audioCtx.createBufferSource(); src.buffer = buf; src.loop = true;
  const nbp = audioCtx.createBiquadFilter(); nbp.type = 'bandpass'; nbp.frequency.value = 320; nbp.Q.value = 0.9;
  const ng  = audioCtx.createGain(); ng.gain.value = 0.009;
  src.connect(nbp); nbp.connect(ng); ng.connect(masterGain); src.start();
}

function startMusic() {
  buildAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  playing = true;
  masterGain.gain.linearRampToValueAtTime(0.42, audioCtx.currentTime + 4.0);
  musicBtn.textContent = '♫';
  musicBtn.classList.add('active');
}

musicBtn.addEventListener('click', () => {
  if (!audioCtx) { startMusic(); return; }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  playing = !playing;
  if (playing) {
    masterGain.gain.linearRampToValueAtTime(0.42, audioCtx.currentTime + 2.5);
    musicBtn.textContent = '♫'; musicBtn.classList.add('active');
  } else {
    masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2.0);
    musicBtn.textContent = '♪'; musicBtn.classList.remove('active');
  }
});

// ─── Loader ENTER ─────────────────────────────────────────────────────────────
document.getElementById('loader-enter').addEventListener('click', () => {
  loader.classList.add('hidden');
  setTimeout(() => { loader.style.display = 'none'; }, 950);
  homeEl.classList.add('active');
  globalNav.classList.add('visible');
  startMusic();
});

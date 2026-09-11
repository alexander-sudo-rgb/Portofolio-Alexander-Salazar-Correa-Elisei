const canvas = document.getElementById('bg');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 15;

const shapes = [];
const geometries = [
    new THREE.CircleGeometry(0.6, 32),
    new THREE.RingGeometry(0.35, 0.6, 32),
    new THREE.PlaneGeometry(0.9, 0.9),
    new THREE.CircleGeometry(0.7, 3),
    new THREE.CircleGeometry(0.6, 6)
];

let material = new THREE.MeshBasicMaterial({ 
    color: 0xd92525, 
    side: THREE.DoubleSide, 
    transparent: true, 
    opacity: 0.7 
});

for (let i = 0; i < 90; i++) {
    const geo = geometries[Math.floor(Math.random() * geometries.length)];
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 10
    );
    mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    mesh.userData = {
        velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.06, 
            (Math.random() - 0.5) * 0.06, 
            (Math.random() - 0.5) * 0.01
        ),
        rotSpeed: new THREE.Vector3(
            (Math.random() - 0.5) * 0.02, 
            (Math.random() - 0.5) * 0.02, 
            (Math.random() - 0.5) * 0.02
        ),
        radius: 0.7
    };
    shapes.push(mesh);
    scene.add(mesh);
}

const mouse = { x: 0, y: 0 };
const camTarget = { x: 0, y: 0 };
const raycaster = new THREE.Raycaster();
const mouseVector = new THREE.Vector2();
let draggedObj = null;
let dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
let lastDragPos = new THREE.Vector3();
let magnetActive = false;
let mouseWorldPos = new THREE.Vector3();

window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    
    mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouseVector, camera);
    raycaster.ray.intersectPlane(dragPlane, mouseWorldPos);

    if (draggedObj) {
        let currentDragPos = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(dragPlane, currentDragPos)) {
            let delta = currentDragPos.clone().sub(lastDragPos);
            draggedObj.position.add(delta);
            draggedObj.userData.velocity.copy(delta).multiplyScalar(0.8);
            lastDragPos.copy(currentDragPos);
        }
    }
});

window.addEventListener('mousedown', (e) => {
    if (e.target.closest('.s-content') || e.target.closest('.global-nav') || e.target.closest('.top-controls') || e.target.closest('.home-center') || e.target.closest('#loader')) return;
    
    if (e.button === 1) {
        e.preventDefault();
        magnetActive = true;
        return;
    }

    mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseVector, camera);
    const intersects = raycaster.intersectObjects(shapes);
    if (intersects.length > 0) {
        draggedObj = intersects[0].object;
        dragPlane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(dragPlane.normal), draggedObj.position);
        raycaster.ray.intersectPlane(dragPlane, lastDragPos);
    }
}, {passive: false});

window.addEventListener('mouseup', (e) => { 
    if (e.button === 1) {
        magnetActive = false;
    }
    draggedObj = null; 
});

window.addEventListener('mouseleave', () => { 
    magnetActive = false;
    draggedObj = null; 
});

window.addEventListener('touchstart', (e) => {
    if (e.target.closest('.s-content') || e.target.closest('.global-nav') || e.target.closest('.top-controls') || e.target.closest('.home-center') || e.target.closest('#loader')) return;
    
    mouseVector.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouseVector, camera);
    const intersects = raycaster.intersectObjects(shapes);
    if (intersects.length > 0) {
        draggedObj = intersects[0].object;
        dragPlane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(dragPlane.normal), draggedObj.position);
        raycaster.ray.intersectPlane(dragPlane, lastDragPos);
    }
}, {passive: false});

window.addEventListener('touchmove', (e) => {
    if (draggedObj) {
        mouseVector.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouseVector.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);
        let currentDragPos = new THREE.Vector3();
        if (raycaster.ray.intersectPlane(dragPlane, currentDragPos)) {
            let delta = currentDragPos.clone().sub(lastDragPos);
            draggedObj.position.add(delta);
            draggedObj.userData.velocity.copy(delta).multiplyScalar(0.8);
            lastDragPos.copy(currentDragPos);
        }
    }
}, {passive: false});

window.addEventListener('touchend', () => { draggedObj = null; });

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

function animate() {
    requestAnimationFrame(animate);
    
    for (let i = 0; i < shapes.length; i++) {
        let s1 = shapes[i];
        
        s1.rotation.x += s1.userData.rotSpeed.x;
        s1.rotation.y += s1.userData.rotSpeed.y;
        s1.rotation.z += s1.userData.rotSpeed.z;

        if (magnetActive && s1 !== draggedObj) {
            let dir = new THREE.Vector3().subVectors(mouseWorldPos, s1.position);
            if (dir.length() > 0.5) {
                dir.normalize();
                s1.userData.velocity.add(dir.multiplyScalar(0.015));
            }
        }

        if (s1 !== draggedObj) {
            s1.position.add(s1.userData.velocity);
            s1.userData.velocity.multiplyScalar(0.998);

            if (s1.position.x > 38) { s1.position.x = 38; s1.userData.velocity.x *= -1; }
            if (s1.position.x < -38) { s1.position.x = -38; s1.userData.velocity.x *= -1; }
            if (s1.position.y > 22) { s1.position.y = 22; s1.userData.velocity.y *= -1; }
            if (s1.position.y < -22) { s1.position.y = -22; s1.userData.velocity.y *= -1; }
            if (s1.position.z > 8) { s1.position.z = 8; s1.userData.velocity.z *= -1; }
            if (s1.position.z < -12) { s1.position.z = -12; s1.userData.velocity.z *= -1; }
        }

        for (let j = i + 1; j < shapes.length; j++) {
            let s2 = shapes[j];
            let dist = s1.position.distanceTo(s2.position);
            let minDist = s1.userData.radius + s2.userData.radius;
            
            if (dist < minDist) {
                let normal = s1.position.clone().sub(s2.position).normalize();
                let relativeVelocity = s1.userData.velocity.clone().sub(s2.userData.velocity);
                let speed = relativeVelocity.dot(normal);
                
                if (speed < 0) {
                    let impulse = normal.multiplyScalar(-speed * 1.0);
                    if (s1 !== draggedObj) s1.userData.velocity.add(impulse);
                    if (s2 !== draggedObj) s2.userData.velocity.sub(impulse);
                }
                
                let overlap = minDist - dist;
                let separation = normal.clone().multiplyScalar(overlap / 2);
                if (s1 !== draggedObj) s1.position.add(separation);
                if (s2 !== draggedObj) s2.position.sub(separation);
            }
        }
    }

    camTarget.x += (mouse.x * 2 - camTarget.x) * 0.05;
    camTarget.y += (mouse.y * 2 - camTarget.y) * 0.05;
    camera.position.x = camTarget.x;
    camera.position.y = camTarget.y;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}
animate();

const homeEl = document.getElementById('home');
const sectionEl = document.getElementById('section-view');
const bodyEl = document.getElementById('sectionBody');
const globalNav = document.getElementById('global-nav');
const loader = document.getElementById('loader');

function showHome() {
    sectionEl.classList.remove('active');
    homeEl.classList.add('active');
}

function showSection(name) {
    const tpl = document.getElementById('tpl-' + name);
    if (!tpl) return;
    homeEl.classList.remove('active');
    
    bodyEl.innerHTML = '';
    bodyEl.appendChild(tpl.content.cloneNode(true));
    sectionEl.scrollTop = 0;
    sectionEl.classList.add('active');
}

document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-target]');
    if (!btn) return;
    const target = btn.dataset.target;
    if (target === 'home') showHome();
    else showSection(target);
});

const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '♪';
        musicBtn.classList.remove('active');
    } else {
        bgMusic.play().catch(e => {});
        musicBtn.textContent = '♫';
        musicBtn.classList.add('active');
    }
    isPlaying = !isPlaying;
}

musicBtn.addEventListener('click', toggleMusic);

const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        scene.background.setHex(0x050505);
        material.color.setHex(0xffffff);
    } else {
        scene.background.setHex(0xffffff);
        material.color.setHex(0xd92525);
    }
});

document.getElementById('loader-enter').addEventListener('click', () => {
    loader.classList.add('hidden');
    setTimeout(() => { loader.style.display = 'none'; }, 950);
    homeEl.classList.add('active');
    globalNav.classList.add('visible');
    bgMusic.play().then(() => {
        isPlaying = true;
        musicBtn.textContent = '♫';
        musicBtn.classList.add('active');
    }).catch(e => {});
});

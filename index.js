const sections = [
  { id: 'profil',  label: 'Profile',  color: '#a7f3d0', textColor: '#0f172a' },
  { id: 'epitech', label: 'Epitech',  color: '#7c3aed', textColor: '#ffffff' },
  { id: 'projets', label: 'Projects', color: '#ff5c33', textColor: '#ffffff' },
  { id: 'skills',  label: 'Skills',   color: '#fde047', textColor: '#0f172a' },
  { id: 'bilan',   label: 'Review',   color: '#27272a', textColor: '#ffffff' },
  { id: 'cv',      label: 'CV',       color: '#ec4899', textColor: '#ffffff' },
  { id: 'contact', label: 'Contact',  color: '#7dd3fc', textColor: '#0f172a' }
];

const CX = 500;
const CY = 500;
const OUTER_R = 490;
const INNER_R = 281;
const LABEL_R = 388;
const GAP_DEG = 2.5;
const SLICE_DEG = 360 / sections.length;
const SVG_NS = 'http://www.w3.org/2000/svg';

const svg = document.getElementById('ring-svg');
const defaultAnim = document.getElementById('default-anim');
const sectionContent = document.getElementById('section-content');
const centerDisplay = document.getElementById('center-display');

let activeSlice = null;

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function buildArcPath(startDeg, endDeg) {
  const s = toRad(startDeg + GAP_DEG / 2);
  const e = toRad(endDeg - GAP_DEG / 2);
  const x1 = CX + INNER_R * Math.cos(s);
  const y1 = CY + INNER_R * Math.sin(s);
  const x2 = CX + OUTER_R * Math.cos(s);
  const y2 = CY + OUTER_R * Math.sin(s);
  const x3 = CX + OUTER_R * Math.cos(e);
  const y3 = CY + OUTER_R * Math.sin(e);
  const x4 = CX + INNER_R * Math.cos(e);
  const y4 = CY + INNER_R * Math.sin(e);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  const f = (n) => n.toFixed(3);
  return `M${f(x1)},${f(y1)} L${f(x2)},${f(y2)} A${OUTER_R},${OUTER_R},0,${large},1,${f(x3)},${f(y3)} L${f(x4)},${f(y4)} A${INNER_R},${INNER_R},0,${large},0,${f(x1)},${f(y1)} Z`;
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function resetToDefault() {
  if (activeSlice) {
    activeSlice.classList.remove('active');
    activeSlice = null;
  }
  sectionContent.classList.remove('visible');
  setTimeout(() => {
    sectionContent.innerHTML = '';
    sectionContent.style.background = 'transparent';
    sectionContent.style.color = '';
    defaultAnim.classList.remove('hidden');
  }, 320);
}

function handleSliceClick(section, pathEl) {
  if (activeSlice === pathEl) {
    resetToDefault();
    return;
  }

  if (activeSlice) activeSlice.classList.remove('active');
  activeSlice = pathEl;
  pathEl.classList.add('active');

  const source = document.getElementById('content-' + section.id);

  defaultAnim.classList.add('hidden');
  sectionContent.classList.remove('visible');

  setTimeout(() => {
    sectionContent.innerHTML = source.innerHTML;
    sectionContent.style.background = hexToRgba(section.color, 0.95);
    sectionContent.style.color = section.textColor;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-center-btn';
    closeBtn.textContent = '× Close';
    closeBtn.addEventListener('click', resetToDefault);
    sectionContent.appendChild(closeBtn);

    sectionContent.classList.add('visible');
    sectionContent.scrollTop = 0;
  }, 210);
}

sections.forEach((section, i) => {
  const startDeg = -90 + i * SLICE_DEG;
  const endDeg = startDeg + SLICE_DEG;
  const midDeg = (startDeg + endDeg) / 2;
  const midRad = toRad(midDeg);

  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', buildArcPath(startDeg, endDeg));
  path.setAttribute('fill', section.color);
  path.classList.add('slice-path');

  const lx = CX + LABEL_R * Math.cos(midRad);
  const ly = CY + LABEL_R * Math.sin(midRad);

  const text = document.createElementNS(SVG_NS, 'text');
  text.setAttribute('x', lx.toFixed(3));
  text.setAttribute('y', ly.toFixed(3));
  text.setAttribute('fill', section.textColor);
  text.classList.add('slice-label');
  text.textContent = section.label;

  path.addEventListener('click', () => handleSliceClick(section, path));

  svg.appendChild(path);
  svg.appendChild(text);
});

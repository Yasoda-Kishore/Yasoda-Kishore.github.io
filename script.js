const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menu.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Subtle Matrix-style background, inspired by the visual language of the reference portfolio.
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let w, h, columns, drops;
const chars = '01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ$#<>[]{}';

function resizeMatrix(){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.width = innerWidth * dpr;
  h = canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  columns = Math.floor(innerWidth / 18);
  drops = Array.from({length: columns}, () => Math.random() * -80);
}
function drawMatrix(){
  ctx.fillStyle = 'rgba(5,7,8,0.075)';
  ctx.fillRect(0,0,innerWidth,innerHeight);
  ctx.font = '12px JetBrains Mono, monospace';
  for(let i=0;i<columns;i++){
    const char = chars[Math.floor(Math.random()*chars.length)];
    const x = i * 18;
    const y = drops[i] * 18;
    ctx.fillStyle = (i % 7 === 0) ? '#65f4b0' : '#3c8f70';
    ctx.fillText(char,x,y);
    if(y > innerHeight && Math.random() > .975) drops[i] = 0;
    drops[i] += .55;
  }
  requestAnimationFrame(drawMatrix);
}
window.addEventListener('resize', resizeMatrix);
resizeMatrix();
drawMatrix();

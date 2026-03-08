/* ═══════════════════════════════════════════════════════════════
   ZinaldoQuantumLab — Quantum Rush v2
   game.js — Toute la logique du jeu
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ═══════════════════════════════════════════
//  CANVAS SETUP
// ═══════════════════════════════════════════
const canvas = document.getElementById('gc');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = Math.min(window.innerWidth, 960);
  canvas.height = Math.min(window.innerHeight - 52, 560);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ═══════════════════════════════════════════
//  INPUT
// ═══════════════════════════════════════════
const keys = {};
const mb = { left: false, right: false, jump: false, atk: false, dash: false };
const justPressed = {};

window.addEventListener('keydown', e => {
  if (!keys[e.code]) justPressed[e.code] = true;
  keys[e.code] = true;
  if (['Space','ArrowLeft','ArrowRight','ArrowUp','KeyZ','KeyX'].includes(e.code))
    e.preventDefault();
});
window.addEventListener('keyup', e => { keys[e.code] = false; });

function consumeJust(code) { const v = justPressed[code]; justPressed[code] = false; return v; }
function isDown(code, mob)  { return keys[code] || mob; }

// ═══════════════════════════════════════════
//  DONNÉES DES 10 NIVEAUX
// ═══════════════════════════════════════════
const LEVEL_DEFS = [
  { name: 'SECTOR ALPHA',   theme: 'cyber',   bg: ['#020812','#050f20'], enemies:  4, width: 2800, boss: null,         music: '⚡' },
  { name: 'NEBULA GRID',    theme: 'nebula',  bg: ['#030818','#0a0530'], enemies:  7, width: 3200, boss: null,         music: '🔮' },
  { name: 'QUANTUM FOREST', theme: 'forest',  bg: ['#021808','#051510'], enemies:  9, width: 3200, boss: 'ZIBO MK2',   music: '🌲' },
  { name: 'PLASMA DESERT',  theme: 'desert',  bg: ['#180a00','#0a0500'], enemies: 11, width: 3600, boss: null,         music: '🔥' },
  { name: 'ICE DIMENSION',  theme: 'ice',     bg: ['#010d18','#001828'], enemies: 12, width: 3600, boss: 'QUANTARA',   music: '❄️' },
  { name: 'LAVA CORE',      theme: 'lava',    bg: ['#1a0400','#0a0200'], enemies: 14, width: 4000, boss: null,         music: '🌋' },
  { name: 'VOID SECTOR',    theme: 'void',    bg: ['#080010','#020008'], enemies: 15, width: 4000, boss: 'NEBULON',    music: '🕳️' },
  { name: 'CRYSTAL MATRIX', theme: 'crystal', bg: ['#001a1a','#001020'], enemies: 17, width: 4200, boss: null,         music: '💎' },
  { name: 'SHADOW REALM',   theme: 'shadow',  bg: ['#080008','#050005'], enemies: 19, width: 4400, boss: 'VORTEX JR',  music: '👁️' },
  { name: 'VORTEX CORE',    theme: 'vortex',  bg: ['#0d0020','#050010'], enemies: 20, width: 4800, boss: 'VORTEX',     music: '💀' },
];

// ── Palettes de thème par niveau ──
const THEMES = {
  cyber:   { plat1: '#0a1a30', plat2: '#00f5ff', ground: '#061525', coin: '#ffd700', accent: '#00f5ff' },
  nebula:  { plat1: '#1a0a30', plat2: '#aa00ff', ground: '#0f0520', coin: '#ff88ff', accent: '#aa00ff' },
  forest:  { plat1: '#0a2010', plat2: '#00ff88', ground: '#051508', coin: '#88ff44', accent: '#00cc66' },
  desert:  { plat1: '#2a1a00', plat2: '#ff8800', ground: '#180a00', coin: '#ffcc00', accent: '#ff6600' },
  ice:     { plat1: '#001a2a', plat2: '#88ddff', ground: '#000d18', coin: '#aaeeff', accent: '#44bbff' },
  lava:    { plat1: '#2a0800', plat2: '#ff4400', ground: '#1a0200', coin: '#ffaa00', accent: '#ff2200' },
  void:    { plat1: '#0a001a', plat2: '#7700ff', ground: '#040008', coin: '#cc88ff', accent: '#5500cc' },
  crystal: { plat1: '#001818', plat2: '#00ffdd', ground: '#000f10', coin: '#88ffee', accent: '#00ddcc' },
  shadow:  { plat1: '#0d000d', plat2: '#ff00ff', ground: '#060006', coin: '#ff88ff', accent: '#cc00cc' },
  vortex:  { plat1: '#100015', plat2: '#ff00aa', ground: '#070005', coin: '#ff66cc', accent: '#ff00aa' },
};

// ── Types de power-ups ──
const POWERUP_TYPES = [
  { type: 'health', icon: '❤️',  color: '#ff4466', label: 'VIE +1'        },
  { type: 'energy', icon: '⚡',  color: '#00f5ff', label: 'ÉNERGIE MAX'   },
  { type: 'shield', icon: '🛡',  color: '#4488ff', label: 'BOUCLIER'      },
  { type: 'speed',  icon: '💨',  color: '#00ff88', label: 'VITESSE x2'    },
  { type: 'double', icon: '✦✦', color: '#ffd700', label: 'DOUBLE LASER'  },
];

// ═══════════════════════════════════════════
//  ÉTAT GLOBAL DU JEU
// ═══════════════════════════════════════════
let G = {
  state:       'menu',  // menu | playing | levelcomplete | gameover | win
  level:       1,
  score:       0,
  totalScore:  0,
  lives:       3,
  unlocked:    1,
  completed:   [],
  stars:       {},
  frameCount:  0,
  cameraX:     0,
  levelTime:   0,
  comboCount:  0,
  comboTimer:  0,
  coinCount:   0,
  enemyKills:  0,
  totalCoins:  0,
  totalEnemies:0,
};

let LD = null;          // données du niveau courant
let particles   = [];
let projectiles = [];
let powerups    = [];
let shakeTimer  = 0;
let shakeAmt    = 0;

// ── Joueur (Zinaldo) ──
const P = {
  x: 80, y: 200, w: 30, h: 38,
  vx: 0, vy: 0, onGround: false,
  lives: 3, maxLives: 5,
  energy: 100, maxEnergy: 100,
  shield: 0,   maxShield: 100,
  invincible: 0,
  attacking: 0, attackCD: 0,
  dashing:   0, dashCD:   0,
  jumpCount: 0,
  facingRight: true,
  anim: 0,
  speedBoost:  0,
  doubleLaser: 0,
  lastDx: 0,
};

// ═══════════════════════════════════════════
//  HELPERS UI
// ═══════════════════════════════════════════
function showScreen(id) {
  ['scr-start','scr-lvlsel','scr-gameover','scr-win','scr-lvlcomplete'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = (s === id ? 'flex' : 'none');
  });
  G.state = 'menu';
  document.getElementById('game-wrap').style.display    = 'none';
  document.getElementById('mobile-ctrls').style.display = 'none';
  document.getElementById('controls-hint').style.display= 'none';
}

function openLevelSelect() {
  buildLevelGrid();
  showScreen('scr-lvlsel');
}

function buildLevelGrid() {
  const grid = document.getElementById('level-grid');
  grid.innerHTML = '';
  LEVEL_DEFS.forEach((def, i) => {
    const n   = i + 1;
    const st  = G.completed[n] || 0;
    const cls = n <= G.unlocked ? (st > 0 ? 'completed' : 'unlocked') : 'locked';
    const div = document.createElement('div');
    div.className = `lvl-btn ${cls}`;
    div.innerHTML = `
      <span class="lvl-icon">${def.music}</span>
      <span class="lvl-num">${n}</span>
      <span class="lvl-name">${def.name}</span>
      ${st ? `<span style="font-size:9px;color:#ffd700">${'★'.repeat(st)}</span>` : ''}`;
    if (n <= G.unlocked) div.onclick = () => startFromLevel(n);
    grid.appendChild(div);
  });
}

function startFromLevel(n) {
  ['scr-start','scr-lvlsel','scr-gameover','scr-win','scr-lvlcomplete'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = 'none';
  });
  document.getElementById('game-wrap').style.display    = 'block';
  document.getElementById('mobile-ctrls').style.display = 'flex';
  document.getElementById('controls-hint').style.display= 'block';
  G.level = n; G.score = 0; G.totalScore = 0;
  resetPlayer();
  initLevel();
  G.state = 'playing';
  showPopup('pop-level', `NIVEAU ${n}`, LEVEL_DEFS[n-1].name);
  if (LEVEL_DEFS[n-1].boss)
    setTimeout(() => showPopup('pop-boss', '⚠ BOSS ALERT', LEVEL_DEFS[n-1].boss + ' APPROCHE!'), 3000);
}

function restartCurrentLevel() {
  document.getElementById('scr-gameover').style.display = 'none';
  startFromLevel(G.level);
}

function goNextLevel() {
  document.getElementById('scr-lvlcomplete').style.display = 'none';
  if (G.level >= 10) { showScreen('scr-win'); return; }
  G.level++;
  if (G.level > G.unlocked) G.unlocked = G.level;
  resetPlayer(true);
  initLevel();
  G.state = 'playing';
  document.getElementById('game-wrap').style.display    = 'block';
  document.getElementById('mobile-ctrls').style.display = 'flex';
  showPopup('pop-level', `NIVEAU ${G.level}`, LEVEL_DEFS[G.level-1].name);
  if (LEVEL_DEFS[G.level-1].boss)
    setTimeout(() => showPopup('pop-boss', '⚠ BOSS ALERT', LEVEL_DEFS[G.level-1].boss + ' APPROCHE!'), 3000);
}

function showPopup(id, main, sub = '') {
  const el = document.getElementById(id);
  if (!el) return;
  const h = el.querySelector('h2');
  const p = el.querySelector('p');
  if (h) h.textContent = main;
  if (p) p.textContent = sub;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

function showPowerupNotif(pu) {
  const el = document.getElementById('powerup-notif');
  document.getElementById('pu-icon').textContent = pu.icon;
  document.getElementById('pu-text').textContent = pu.label;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

function updateHUD() {
  document.getElementById('score-hud').textContent = G.score;
  document.getElementById('level-hud').textContent = G.level;
  document.getElementById('energy-fill').style.width = (P.energy / P.maxEnergy * 100) + '%';

  const shPill = document.getElementById('shield-pill');
  if (P.shield > 0) {
    shPill.style.display = 'flex';
    document.getElementById('shield-fill').style.width = (P.shield / P.maxShield * 100) + '%';
  } else {
    shPill.style.display = 'none';
  }

  const hp = document.getElementById('hp-hearts');
  hp.innerHTML = '';
  for (let i = 0; i < P.maxLives; i++) {
    const s = document.createElement('span');
    s.className   = 'heart';
    s.textContent = i < P.lives ? '♥' : '♡';
    s.style.color = i < P.lives ? '#ff4466' : '#ffffff22';
    hp.appendChild(s);
  }

  const combo = document.getElementById('combo-hud');
  if (G.comboCount > 1) {
    combo.style.display = 'flex';
    document.getElementById('combo-num').textContent = G.comboCount;
  } else {
    combo.style.display = 'none';
  }
}

// ═══════════════════════════════════════════
//  GÉNÉRATION DU NIVEAU
// ═══════════════════════════════════════════
function initLevel() {
  const def   = LEVEL_DEFS[G.level - 1];
  const H     = canvas.height;
  const W     = def.width;
  const theme = THEMES[def.theme];

  particles = []; projectiles = []; powerups = [];
  G.frameCount = 0; G.cameraX = 0; G.levelTime = 0;
  G.coinCount  = 0; G.enemyKills = 0; G.comboCount = 0; G.comboTimer = 0;

  const platforms = [], coins = [], enemies = [], powerupSpots = [];
  

  // ── Sol ──
  platforms.push({ x: 0, y: H - 40, w: W, h: 40, type: 'ground', moving: false });

  // ── Plateformes ──
  const pCount = 14 + G.level * 3;
  let lx = 200;
  for (let i = 0; i < pCount; i++) {
    const x        = lx + 80 + Math.random() * 180;
    const y        = H - 130 - Math.random() * (H * 0.42);
    const w        = 70 + Math.random() * 130;
    const isMoving = Math.random() < 0.15 + G.level * 0.025;
    const isSpiked = G.level >= 4 && Math.random() < 0.12;
    platforms.push({
      x, y, w, h: 16,
      type: 'platform',
      moving: isMoving,
      spiked: isSpiked,
      mx:     x,
      mRange: 50 + Math.random() * 80,
      mSpeed: (0.5 + Math.random() * 0.8) * (G.level * 0.3),
      mDir:   Math.random() < .5 ? 1 : -1,
      vertical: Math.random() < 0.2,
    });
    // pièces Q sur la plateforme
    const cCount = 2 + Math.floor(Math.random() * 4);
    for (let c = 0; c < cCount; c++)
      coins.push({ x: x + 16 + c * 22, y: y - 26, collected: false, anim: Math.random() * 6.28 });
    if (Math.random() < 0.12 + G.level * 0.01)
      powerupSpots.push({ x: x + w / 2 - 12, y: y - 50 });
    lx = x + w;
  }

  // ── Power-ups ──
  powerupSpots.slice(0, 2 + Math.floor(G.level / 2)).forEach(s => {
    const pu = POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)];
    powerups.push({ ...pu, ...s, collected: false, anim: Math.random() * 6.28 });
  });

  // ── Ennemis ──
  const enemyTypes = ['minion','zibo','quantara','nebulon'];
  for (let i = 0; i < def.enemies; i++) {
    const ep = platforms[1 + Math.floor(Math.random() * (platforms.length - 2))];
    const etype =
      G.level >= 7 ? enemyTypes[Math.floor(Math.random() * 4)] :
      G.level >= 4 ? enemyTypes[Math.floor(Math.random() * 3)] :
      G.level >= 2 ? enemyTypes[Math.floor(Math.random() * 2)] :
                     'minion';
    enemies.push(makeEnemy(etype, ep, H));
  }

  // ── Boss ──
  let boss = null;
  if (def.boss) boss = makeBoss(def.boss, W, H);

  // ── Portail de sortie ──
  const portal = { x: W - 120, y: H - 120, w: 48, h: 80, active: true, anim: 0 };

  LD = { platforms, coins, enemies, boss, portal, powerups, width: W, theme, def };
  G.totalCoins   = coins.length;
  G.totalEnemies = enemies.length;
  updateHUD();
}

function makeEnemy(type, plat, H) {
  const bases = {
    minion:   { w: 28, h: 32, hp: 1, spd: 1.2, xp: 100 },
    zibo:     { w: 32, h: 38, hp: 2, spd: 1.5, xp: 150, shoots:    true },
    quantara: { w: 28, h: 36, hp: 2, spd: 1.8, xp: 200, teleports: true },
    nebulon:  { w: 36, h: 32, hp: 3, spd: 1.0, xp: 250, webs:      true },
  };
  const b = bases[type];
  return {
    type, x: plat.x + 40, y: plat.y - b.h,
    w: b.w, h: b.h,
    vx: b.spd * (Math.random() < .5 ? 1 : -1) * (1 + G.level * 0.08),
    hp: b.hp + (G.level > 5 ? 1 : 0),
    maxHp: b.hp + (G.level > 5 ? 1 : 0),
    xp: b.xp, alive: true,
    ground: plat, hitFlash: 0, anim: Math.random() * 6.28,
    shootCD: 0, teleCD: 0, webCD: 0,
    vy: 0, onGround: true,
    shoots:    b.shoots    || false,
    teleports: b.teleports || false,
    webs:      b.webs      || false,
  };
}

function makeBoss(name, W, H) {
  const bases = {
    'ZIBO MK2':  { w: 56, h: 68, hp: 15, color: '#ff4466', emoji: '🤖' },
    'QUANTARA':  { w: 48, h: 72, hp: 20, color: '#aa00ff', emoji: '🔮' },
    'NEBULON':   { w: 70, h: 56, hp: 25, color: '#0088ff', emoji: '🕷️' },
    'VORTEX JR': { w: 60, h: 76, hp: 28, color: '#ff00aa', emoji: '👁️' },
    'VORTEX':    { w: 80, h: 96, hp: 40, color: '#ff00cc', emoji: '💀' },
  };
  const b = bases[name] || bases['VORTEX'];
  return {
    name, x: W - 250, y: H - 40 - b.h,
    w: b.w, h: b.h, vx: -2.5, vy: 0,
    hp: b.hp, maxHp: b.hp,
    color: b.color, emoji: b.emoji,
    alive: true, phase: 1, hitFlash: 0,
    attackTimer: 0, anim: 0,
    onGround: false, jumpCD: 0, projectileCD: 0,
  };
}

function resetPlayer(keepPowerups = false) {
  P.x = 80; P.y = 200; P.vx = 0; P.vy = 0;
  P.onGround = false; P.invincible = 0;
  P.attacking = 0; P.attackCD = 0;
  P.dashing   = 0; P.dashCD   = 0;
  P.jumpCount = 0; P.facingRight = true;
  if (!keepPowerups) {
    P.energy      = P.maxEnergy;
    P.shield      = 0;
    P.speedBoost  = 0;
    P.doubleLaser = 0;
  }
}

// ═══════════════════════════════════════════
//  PARTICULES
// ═══════════════════════════════════════════
function spawnParts(x, y, color, n = 8, spd = 4, gravity = 0.08) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    particles.push({
      x, y,
      vx: Math.cos(a) * spd * (0.5 + Math.random()),
      vy: Math.sin(a) * spd * (0.5 + Math.random()) - 1,
      life: 1, decay: 0.025 + Math.random() * 0.025,
      color, size: 2 + Math.random() * 4, gravity,
    });
  }
}

function spawnBurst(x, y, colors, n = 20) {
  colors.forEach(c => spawnParts(x, y, c, n / colors.length, 6, 0.1));
}

// ═══════════════════════════════════════════
//  RENDU (DRAW)
// ═══════════════════════════════════════════

/** Fond : ciel dégradé + grille parallaxe + orbes nébuleuses */
function drawBG() {
  const { bg } = LD.def;
  const W = canvas.width, H = canvas.height;

  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, bg[0]);
  sky.addColorStop(1, bg[1]);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Grille parallaxe
  ctx.strokeStyle = LD.theme.accent + '18';
  ctx.lineWidth   = 1;
  const gs = 55, ox = (-G.cameraX * 0.15) % gs;
  for (let x = ox; x < W; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0;  y < H; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // Orbes nébuleuses en parallaxe lente
  for (let i = 0; i < 5; i++) {
    const ox2 = ((i * 421 - G.cameraX * 0.04) % (W + 200) + W + 200) % (W + 200);
    const oy  = 50 + (i * 97) % 180;
    const r   = 40 + i * 15;
    const g2  = ctx.createRadialGradient(ox2, oy, 0, ox2, oy, r);
    const c   = i % 2 === 0 ? LD.theme.accent : LD.theme.plat2;
    g2.addColorStop(0, c + '33'); g2.addColorStop(1, 'transparent');
    ctx.globalAlpha = 0.4 + Math.sin(G.frameCount * 0.004 + i) * 0.2;
    ctx.fillStyle = g2;
    ctx.beginPath(); ctx.arc(ox2, oy, r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawPlatform(pl) {
  ctx.save(); ctx.translate(-G.cameraX, 0);
  const t = LD.theme;

  if (pl.type === 'ground') {
    const g = ctx.createLinearGradient(0, pl.y, 0, pl.y + pl.h);
    g.addColorStop(0, t.plat1); g.addColorStop(1, '#010508');
    ctx.fillStyle = g;
    ctx.fillRect(pl.x, pl.y, pl.w, pl.h);
    ctx.strokeStyle = t.accent + '66'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(pl.x, pl.y); ctx.lineTo(pl.x + pl.w, pl.y); ctx.stroke();
    ctx.strokeStyle = t.accent + '15'; ctx.lineWidth = 1;
    for (let gx = pl.x; gx < pl.x + pl.w; gx += 50) {
      ctx.beginPath(); ctx.moveTo(gx, pl.y); ctx.lineTo(gx, pl.y + pl.h); ctx.stroke();
    }
  } else {
    const ec = pl.moving ? t.accent : t.plat2;
    const g  = ctx.createLinearGradient(0, pl.y, 0, pl.y + pl.h);
    g.addColorStop(0, t.plat1 + 'ee'); g.addColorStop(1, t.plat1 + '44');
    ctx.fillStyle = g;
    ctx.fillRect(pl.x, pl.y, pl.w, pl.h);
    ctx.shadowColor = ec; ctx.shadowBlur = pl.moving ? 10 : 5;
    ctx.strokeStyle = ec + 'cc'; ctx.lineWidth = 2;
    ctx.strokeRect(pl.x, pl.y, pl.w, pl.h);
    ctx.fillStyle = ec + '66';
    ctx.fillRect(pl.x, pl.y, pl.w, 3);

    // Piques
    if (pl.spiked) {
      ctx.fillStyle = '#ff3300'; ctx.shadowColor = '#ff3300'; ctx.shadowBlur = 8;
      for (let sx = pl.x + 8; sx < pl.x + pl.w - 8; sx += 18) {
        ctx.beginPath();
        ctx.moveTo(sx, pl.y);
        ctx.lineTo(sx + 9, pl.y - 10);
        ctx.lineTo(sx + 18, pl.y);
        ctx.fill();
      }
    }
  }
  ctx.shadowBlur = 0; ctx.restore();
}

function drawCoin(c) {
  if (c.collected) return;
  c.anim += 0.055;
  ctx.save(); ctx.translate(-G.cameraX, 0);
  const sc = 1 + Math.sin(c.anim) * 0.12;
  ctx.shadowColor = LD.theme.coin; ctx.shadowBlur = 10;
  ctx.fillStyle = LD.theme.coin;
  ctx.beginPath(); ctx.arc(c.x, c.y, 7 * sc, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#000000aa';
  ctx.font = `bold ${9 * sc}px monospace`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('Q', c.x, c.y);
  ctx.restore();
}

function drawPowerup(pu) {
  if (pu.collected) return;
  pu.anim += 0.04;
  ctx.save(); ctx.translate(-G.cameraX, 0);
  const bob = Math.sin(pu.anim) * 5;
  ctx.shadowColor = pu.color; ctx.shadowBlur = 16;
  ctx.fillStyle   = pu.color + '22';
  ctx.strokeStyle = pu.color + 'aa'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(pu.x, pu.y + bob, 24, 24, 4); ctx.fill(); ctx.stroke();
  ctx.font = '14px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(pu.icon, pu.x + 12, pu.y + 12 + bob);
  ctx.restore();
}

function drawProjectile(pr) {
  ctx.save(); ctx.translate(-G.cameraX, 0);
  ctx.shadowColor = pr.color; ctx.shadowBlur = 12;
  ctx.fillStyle   = pr.color;
  if (pr.type === 'laser') {
    ctx.fillRect(pr.x - pr.w / 2, pr.y - 3, pr.w, 6);
    const g = ctx.createLinearGradient(pr.x - pr.w / 2, 0, pr.x + pr.w / 2, 0);
    g.addColorStop(0, 'transparent'); g.addColorStop(0.5, pr.color + 'cc'); g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.fillRect(pr.x - pr.w / 2, pr.y - 3, pr.w, 6);
  } else {
    ctx.beginPath(); ctx.arc(pr.x, pr.y, pr.r || 5, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

function drawEnemy(e) {
  if (!e.alive) return;
  ctx.save(); ctx.translate(-G.cameraX, 0);
  if (e.hitFlash > 0) ctx.globalAlpha = 0.4;
  e.anim += 0.04;
  const cx = e.x + e.w / 2, cy = e.y + e.h / 2;

  if (e.type === 'minion') {
    const bob = Math.sin(e.anim) * 4;
    ctx.shadowColor = '#9900ff'; ctx.shadowBlur = 12;
    ctx.fillStyle = '#6600cc';
    ctx.beginPath(); ctx.ellipse(cx, cy + bob, e.w / 2, e.h / 2 - 2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ff44ff';
    [[cx - 7, cy - 5 + bob, 4],[cx + 7, cy - 5 + bob, 4]].forEach(([ex, ey, er]) => {
      ctx.beginPath(); ctx.arc(ex, ey, er, 0, Math.PI * 2); ctx.fill();
    });

  } else if (e.type === 'zibo') {
    ctx.shadowColor = '#ff4466'; ctx.shadowBlur = 10;
    ctx.fillStyle = '#cc2244'; ctx.fillRect(e.x + 4, e.y + 12, e.w - 8, e.h - 12);
    ctx.fillStyle = '#ff3355'; ctx.fillRect(e.x + 6, e.y, e.w - 12, 14);
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(e.x + 8, e.y + 3, 5, 5);
    ctx.fillRect(e.x + e.w - 14, e.y + 3, 5, 5);
    ctx.strokeStyle = '#ff5577'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, e.y); ctx.lineTo(cx, e.y - 10); ctx.stroke();
    ctx.fillStyle = '#ff5577'; ctx.beginPath(); ctx.arc(cx, e.y - 12, 4, 0, Math.PI * 2); ctx.fill();
    const la = Math.sin(e.anim) * 6;
    ctx.fillStyle = '#991133';
    ctx.fillRect(e.x + 4,       e.y + e.h - 8 + la * 0.4, 9, 8);
    ctx.fillRect(e.x + e.w - 13, e.y + e.h - 8 - la * 0.4, 9, 8);

  } else if (e.type === 'quantara') {
    const fl = Math.sin(e.anim * 1.2) * 6;
    ctx.shadowColor = '#aa00ff'; ctx.shadowBlur = 15;
    ctx.fillStyle = '#550088';
    ctx.beginPath(); ctx.moveTo(e.x, e.y + e.h + fl); ctx.lineTo(cx, e.y + 12 + fl); ctx.lineTo(e.x + e.w, e.y + e.h + fl); ctx.fill();
    const rg = ctx.createRadialGradient(cx, cy + fl, 0, cx, cy + fl, e.w / 2);
    rg.addColorStop(0, '#cc44ff88'); rg.addColorStop(1, 'transparent');
    ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(cx, cy + fl, e.w / 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#bb88ff';
    ctx.beginPath(); ctx.arc(cx, e.y + 8 + fl, 11, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#330055';
    ctx.beginPath(); ctx.moveTo(cx - 14, e.y + 14 + fl); ctx.lineTo(cx, e.y - 8 + fl); ctx.lineTo(cx + 14, e.y + 14 + fl); ctx.fill();
    ctx.fillStyle = '#aa00ff';
    ctx.fillRect(e.x, e.y + 12 + fl, e.w, 4);
    ctx.fillStyle = '#ffff00';
    ctx.beginPath(); ctx.arc(cx - 5, e.y + 10 + fl, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 5, e.y + 10 + fl, 3, 0, Math.PI * 2); ctx.fill();

  } else if (e.type === 'nebulon') {
    ctx.shadowColor = '#0088ff'; ctx.shadowBlur = 12;
    ctx.fillStyle = '#004488';
    ctx.beginPath(); ctx.ellipse(cx, cy, e.w / 2, e.h / 2, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#0066cc'; ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      const la = Math.sin(e.anim + i * 0.5) * 8;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(e.x - (i < 2 ? 12 + i * 8 : -(12 + (i - 2) * 8)), cy + la);
      ctx.stroke();
    }
    ctx.fillStyle = '#00ffff';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.arc(cx - 8 + i * 8, cy - 4, 3, 0, Math.PI * 2); ctx.fill();
    }
  }

  // Barre de vie si plusieurs PV
  if (e.maxHp > 1) {
    ctx.fillStyle = '#ffffff15'; ctx.fillRect(e.x, e.y - 12, e.w, 5);
    ctx.fillStyle = '#ff4466';   ctx.fillRect(e.x, e.y - 12, e.w * (e.hp / e.maxHp), 5);
  }

  ctx.globalAlpha = 1; ctx.shadowBlur = 0; ctx.restore();
}

function drawBoss(b) {
  if (!b || !b.alive) return;
  ctx.save(); ctx.translate(-G.cameraX, 0);
  if (b.hitFlash > 0) ctx.globalAlpha = 0.3;
  b.anim += 0.025;
  const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
  const pulse  = 1 + Math.sin(b.anim * 2) * 0.08;
  const phase2 = b.hp <= b.maxHp / 2;

  // Aura extérieure
  const ag = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80 * pulse);
  ag.addColorStop(0, b.color + '44'); ag.addColorStop(1, 'transparent');
  ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(cx, cy, 80 * pulse, 0, Math.PI * 2); ctx.fill();

  if (phase2) {
    ctx.strokeStyle = b.color + '66'; ctx.lineWidth = 2;
    for (let r = 0; r < 3; r++) {
      ctx.save(); ctx.translate(cx, cy);
      ctx.rotate(b.anim * 2 + r * (Math.PI * 2 / 3));
      ctx.beginPath(); ctx.ellipse(0, 0, 40 + r * 15, 40 + r * 15, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
    }
  }

  ctx.shadowColor = b.color; ctx.shadowBlur = 20;
  ctx.fillStyle = '#110022';
  ctx.beginPath(); ctx.ellipse(cx, cy + 8, b.w / 2 * pulse, b.h / 2 * pulse, 0, 0, Math.PI * 2); ctx.fill();

  ctx.strokeStyle = b.color + '88'; ctx.lineWidth = 1.5;
  for (let i = 0; i < 5; i++) {
    const a = b.anim + i * (Math.PI * 2 / 5);
    ctx.beginPath(); ctx.arc(cx + Math.cos(a) * 22, cy + Math.sin(a) * 22, 10, a, a + Math.PI); ctx.stroke();
  }

  ctx.fillStyle = '#220033';
  ctx.beginPath(); ctx.arc(cx, b.y + b.h * 0.2, b.w * 0.35 * pulse, 0, Math.PI * 2); ctx.fill();

  const hs = phase2 ? 1.4 : 1;
  ctx.fillStyle = b.color;
  ctx.beginPath(); ctx.moveTo(cx - b.w * 0.3,  b.y + b.h * 0.25); ctx.lineTo(cx - b.w * 0.45, b.y - 10 * hs); ctx.lineTo(cx - b.w * 0.15, b.y + b.h * 0.18); ctx.fill();
  ctx.beginPath(); ctx.moveTo(cx + b.w * 0.3,  b.y + b.h * 0.25); ctx.lineTo(cx + b.w * 0.45, b.y - 10 * hs); ctx.lineTo(cx + b.w * 0.15, b.y + b.h * 0.18); ctx.fill();

  const eyY = b.y + b.h * 0.2;
  ctx.fillStyle   = phase2 ? '#ffffff' : '#ff00ff';
  ctx.shadowColor = phase2 ? '#fff' : '#ff00ff'; ctx.shadowBlur = 20;
  [cx - b.w * 0.18, cx + b.w * 0.18].forEach(ex => {
    ctx.beginPath(); ctx.arc(ex, eyY, phase2 ? 8 : 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(ex + 1, eyY, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = phase2 ? '#ffffff' : '#ff00ff';
  });

  // Barre de vie du boss
  const bw = 200, bx = cx - bw / 2, by = b.y - 40;
  ctx.fillStyle = '#220022'; ctx.fillRect(bx, by, bw, 14);
  const hg = ctx.createLinearGradient(bx, 0, bx + bw, 0);
  hg.addColorStop(0, b.color); hg.addColorStop(1, '#ff4466');
  ctx.fillStyle = hg; ctx.fillRect(bx, by, bw * (b.hp / b.maxHp), 14);
  ctx.strokeStyle = b.color + '88'; ctx.lineWidth = 1; ctx.strokeRect(bx, by, bw, 14);
  if (phase2) { ctx.fillStyle = '#ffaa00'; ctx.fillRect(bx, by, bw * 0.5, 14); }
  ctx.font = 'bold 9px Orbitron,monospace';
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
  ctx.fillText(`${b.emoji} ${b.name} ${b.emoji}`, cx, by - 6);

  ctx.globalAlpha = 1; ctx.shadowBlur = 0; ctx.restore();
}

function drawPlayer() {
  const p = P;
  if (p.invincible > 0 && Math.floor(G.frameCount / 3) % 2 === 0) return;
  ctx.save(); ctx.translate(-G.cameraX, 0);
  p.anim += 0.08;
  const bob = p.onGround ? Math.sin(p.anim) * 1.5 : 0;

  if (p.dashing > 0) {
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = LD.theme.accent;
    ctx.fillRect(p.x + (p.facingRight ? -30 : 10), p.y + bob, 20, p.h);
    ctx.globalAlpha = 1;
  }
  if (p.shield > 0) {
    ctx.strokeStyle = '#4488ff'; ctx.shadowColor = '#4488ff'; ctx.shadowBlur = 15;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5 + Math.sin(G.frameCount * 0.1) * 0.2;
    ctx.beginPath(); ctx.arc(p.x + p.w / 2, p.y + p.h / 2 + bob, 26, 0, Math.PI * 2); ctx.stroke();
    ctx.globalAlpha = 1;
  }
  if (p.speedBoost > 0) { ctx.shadowColor = '#00ff88'; ctx.shadowBlur = 12; }
  if (p.attacking > 0) {
    const r = ctx.createRadialGradient(p.x + p.w / 2, p.y + p.h / 2, 0, p.x + p.w / 2, p.y + p.h / 2, 55);
    r.addColorStop(0, '#00f5ff33'); r.addColorStop(1, 'transparent');
    ctx.fillStyle = r; ctx.beginPath(); ctx.arc(p.x + p.w / 2, p.y + p.h / 2, 55, 0, Math.PI * 2); ctx.fill();
  }

  ctx.shadowBlur = 0; ctx.fillStyle = '#00f5ff0f';
  ctx.beginPath(); ctx.ellipse(p.x + p.w / 2, p.y + p.h + 2, 14, 4, 0, 0, Math.PI * 2); ctx.fill();

  const dir = p.facingRight;
  ctx.fillStyle = '#00223344';
  ctx.beginPath();
  ctx.moveTo(p.x + (dir ? 4 : p.w - 4), p.y + 14 + bob);
  ctx.lineTo(p.x + (dir ? -10 : p.w + 10), p.y + p.h + bob + 4);
  ctx.lineTo(p.x + (dir ? p.w - 4 : 4), p.y + p.h + bob);
  ctx.fill();

  ctx.shadowColor = '#00f5ff'; ctx.shadowBlur = p.attacking > 0 ? 14 : 5;
  const bg2 = ctx.createLinearGradient(0, p.y, 0, p.y + p.h);
  bg2.addColorStop(0, '#00aabb'); bg2.addColorStop(1, '#003d50');
  ctx.fillStyle = bg2; ctx.fillRect(p.x + 3, p.y + 13 + bob, p.w - 6, p.h - 13);

  ctx.fillStyle = '#aaeeff';
  ctx.beginPath(); ctx.arc(p.x + p.w / 2, p.y + 8 + bob, 11, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#00f5ff';
  const vx = dir ? p.x + p.w / 2 - 2 : p.x + 3;
  ctx.fillRect(vx, p.y + 4 + bob, 9, 5);
  ctx.fillStyle = '#ffffff99'; ctx.fillRect(vx + 1, p.y + 5 + bob, 3, 3);

  ctx.shadowColor = '#ffd700'; ctx.shadowBlur = 8;
  ctx.fillStyle = p.doubleLaser > 0 ? '#ff88ff' : '#ffd700';
  ctx.beginPath(); ctx.arc(p.x + p.w / 2, p.y + 22 + bob, 5, 0, Math.PI * 2); ctx.fill();

  ctx.shadowBlur = 0;
  const la = p.onGround ? Math.sin(p.anim * 2) * 5 : 0;
  ctx.fillStyle = '#002233';
  ctx.fillRect(p.x + 4,       p.y + p.h - 9 + bob + la * 0.4, 9, 9);
  ctx.fillRect(p.x + p.w - 13, p.y + p.h - 9 + bob - la * 0.4, 9, 9);
  ctx.fillStyle = '#00f5ff';
  ctx.fillRect(p.x + 3,       p.y + p.h - 3 + bob + la * 0.3, 11, 3);
  ctx.fillRect(p.x + p.w - 14, p.y + p.h - 3 + bob - la * 0.3, 11, 3);

  ctx.shadowBlur = 0; ctx.restore();
}

function drawPortal() {
  const po = LD.portal;
  ctx.save(); ctx.translate(-G.cameraX, 0);
  const cx = po.x + po.w / 2, cy = po.y + po.h / 2;
  po.anim = (po.anim || 0) + 0.03;
  for (let r = 0; r < 4; r++) {
    ctx.save(); ctx.translate(cx, cy);
    ctx.rotate(po.anim * (r % 2 === 0 ? 1 : -1) + r * (Math.PI / 2));
    ctx.strokeStyle = r % 2 === 0 ? '#00f5ffaa' : '#ff00aaaa';
    ctx.lineWidth = 2 + r * 0.5;
    ctx.shadowColor = r % 2 === 0 ? '#00f5ff' : '#ff00aa'; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.ellipse(0, 0, 16 + r * 8, 25 + r * 8, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
  g.addColorStop(0, '#ffffff99'); g.addColorStop(0.5, '#00f5ff44'); g.addColorStop(1, 'transparent');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.font = 'bold 9px Orbitron,monospace';
  ctx.textAlign = 'center'; ctx.shadowColor = '#00f5ff'; ctx.shadowBlur = 10;
  ctx.fillText('EXIT', cx, po.y - 8);
  ctx.restore();
}

function drawParticles() {
  ctx.save(); ctx.translate(-G.cameraX, 0);
  for (const p of particles) {
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle   = p.color;
    ctx.shadowColor = p.color; ctx.shadowBlur = 6;
    ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0, p.size * p.life), 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1; ctx.shadowBlur = 0; ctx.restore();
}

// ═══════════════════════════════════════════
//  PHYSIQUE & MISE À JOUR
// ═══════════════════════════════════════════
const GR     = 0.52;   // gravité
const JFORCE = -13;    // force de saut
const SPMAX  = 4.5;    // vitesse max

function updatePlayer() {
  if (P.invincible > 0)  P.invincible--;
  if (P.attackCD > 0)    P.attackCD--;
  if (P.attacking > 0)   P.attacking--;
  if (P.dashCD > 0)      P.dashCD--;
  if (P.dashing > 0) { P.dashing--; P.vx = P.facingRight ? 10 : -10; }
  if (P.speedBoost > 0)  P.speedBoost--;
  if (P.doubleLaser > 0) P.doubleLaser--;
  if (G.comboTimer > 0)  { G.comboTimer--; if (G.comboTimer === 0) G.comboCount = 0; }

  const spd = (P.speedBoost > 0 ? SPMAX * 1.9 : SPMAX) + (G.level * 0.06);

  if (!P.dashing) {
    if (isDown('ArrowLeft',  mb.left))  { P.vx = -spd; P.facingRight = false; }
    else if (isDown('ArrowRight', mb.right)) { P.vx =  spd; P.facingRight = true;  }
    else P.vx *= 0.75;
  }

  // Saut (double saut possible)
  if ((consumeJust('Space') || consumeJust('ArrowUp') || mb.jump) && !mb._jumpHeld) {
    if (P.onGround) {
      P.vy = JFORCE; P.onGround = false; P.jumpCount = 1;
      spawnParts(P.x + P.w / 2, P.y + P.h, '#00f5ff', 5, 2);
    } else if (P.jumpCount < 2 && P.energy >= 15) {
      P.vy = JFORCE * 0.88; P.jumpCount++; P.energy -= 15;
      spawnParts(P.x + P.w / 2, P.y + P.h, LD.theme.accent, 8, 3.5);
    }
    mb._jumpHeld = true;
  }
  if (!mb.jump && !keys['Space'] && !keys['ArrowUp']) mb._jumpHeld = false;

  // Attaque laser
  if ((consumeJust('KeyZ') || mb.atk) && !mb._atkHeld && P.attackCD === 0) {
    P.attacking = 18; P.attackCD = 25;
    P.energy = Math.max(0, P.energy - 8);
    firePlayerLaser();
    mb._atkHeld = true;
  }
  if (!mb.atk && !keys['KeyZ']) mb._atkHeld = false;

  // Dash
  if ((consumeJust('KeyX') || mb.dash) && P.dashCD === 0 && !P.dashing) {
    P.dashing = 8; P.dashCD = 45;
    P.energy = Math.max(0, P.energy - 20);
    spawnParts(P.x + P.w / 2, P.y + P.h / 2, LD.theme.accent, 12, 5);
  }

  // Régénération d'énergie
  P.energy = Math.min(P.maxEnergy, P.energy + 0.25);

  // Gravité & mouvement
  if (!P.dashing) P.vy += GR;
  P.x += P.vx; P.y += P.vy;
  P.onGround = false;

  // Collisions avec les plateformes
  for (const pl of LD.platforms) {
    if (P.x + P.w > pl.x && P.x < pl.x + pl.w &&
        P.y + P.h > pl.y && P.y + P.h < pl.y + pl.h + Math.abs(P.vy) + 2 && P.vy >= 0) {
      P.y = pl.y - P.h; P.vy = 0; P.onGround = true; P.jumpCount = 0;
      if (pl.spiked && P.invincible === 0) hurtPlayer(2);
    }
    if (P.x + P.w > pl.x && P.x < pl.x + pl.w && P.y < pl.y + pl.h && P.y > pl.y && P.vy < 0) {
      P.y = pl.y + pl.h; P.vy = 1;
    }
  }

  if (P.x < 0) P.x = 0;
  if (P.y > canvas.height + 80) hurtPlayer(1);
  if (P.x > LD.width - P.w) P.x = LD.width - P.w;

  // Caméra
  const tCam = P.x - canvas.width * 0.33;
  G.cameraX += (tCam - G.cameraX) * 0.12;
  G.cameraX = Math.max(0, Math.min(LD.width - canvas.width, G.cameraX));
}

function firePlayerLaser() {
  const dir = P.facingRight ? 1 : -1;
  const sx  = P.x + (P.facingRight ? P.w + 4 : 0);
  const sy  = P.y + P.h / 2 - 3;
  projectiles.push({ type: 'laser', x: sx, y: sy, vx: dir * 14, vy: 0, w: 50, color: '#00f5ff', owner: 'player', life: 40 });
  if (P.doubleLaser > 0) {
    projectiles.push({ type: 'laser', x: sx, y: sy - 8, vx: dir * 14, vy: -0.5, w: 50, color: '#ff88ff', owner: 'player', life: 40 });
    projectiles.push({ type: 'laser', x: sx, y: sy + 8, vx: dir * 14, vy:  0.5, w: 50, color: '#ff88ff', owner: 'player', life: 40 });
  }
  spawnParts(sx, sy, P.doubleLaser > 0 ? '#ff88ff' : '#00f5ff', 6, 3);
}

function hurtPlayer(dmg = 1) {
  if (P.invincible > 0) return;
  if (P.shield > 0) {
    P.shield = Math.max(0, P.shield - 40);
    spawnParts(P.x + P.w / 2, P.y + P.h / 2, '#4488ff', 8, 4);
    shakeScreen(3); return;
  }
  P.lives -= dmg; P.invincible = 100; P.vy = -9;
  spawnParts(P.x + P.w / 2, P.y + P.h / 2, '#ff4466', 14, 5);
  shakeScreen(6); updateHUD();
  if (P.lives <= 0) triggerGameOver();
}

function shakeScreen(amt) { shakeTimer = 15; shakeAmt = amt; }

function triggerGameOver() {
  G.state = 'gameover';
  document.getElementById('go-score').textContent = G.score;
  document.getElementById('go-level').textContent = G.level;
  document.getElementById('scr-gameover').style.display = 'flex';
  document.getElementById('game-wrap').style.display    = 'none';
}

function triggerWin() {
  G.state = 'win';
  document.getElementById('win-score').textContent = G.score;
  document.getElementById('scr-win').style.display   = 'flex';
  document.getElementById('game-wrap').style.display = 'none';
}

function triggerLevelComplete() {
  G.state = 'levelcomplete';
  const coins      = LD.coins.filter(c => c.collected).length;
  const totalCoins = LD.coins.length;
  const time       = Math.floor(G.levelTime / 60);
  let stars = 1;
  if (coins / totalCoins > 0.6)              stars = 2;
  if (coins / totalCoins > 0.9 && time < 120) stars = 3;
  G.completed[G.level] = Math.max(G.completed[G.level] || 0, stars);
  G.stars[G.level]     = stars;

  document.getElementById('lc-score').textContent       = G.score;
  document.getElementById('lc-coins').textContent       = `${coins}/${totalCoins}`;
  document.getElementById('lc-time').textContent        = time + 's';
  document.getElementById('lc-enemies').textContent     = `${G.enemyKills}/${G.totalEnemies}`;
  document.getElementById('lc-stars-display').textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
  document.getElementById('btn-next-level').textContent = G.level >= 10 ? '🏆 FIN' : 'NIVEAU SUIVANT ▶';
  document.getElementById('scr-lvlcomplete').style.display = 'flex';
  document.getElementById('game-wrap').style.display       = 'none';
}

function updateEnemies() {
  for (const e of LD.enemies) {
    if (!e.alive) continue;
    if (e.hitFlash > 0) e.hitFlash--;
    if (e.shootCD  > 0) e.shootCD--;
    if (e.teleCD   > 0) e.teleCD--;
    if (e.webCD    > 0) e.webCD--;
    e.anim += 0.04;

    if (!e.teleports || e.teleCD === 0) e.x += e.vx;

    const g = e.ground;
    if (e.x < g.x || e.x + e.w > g.x + g.w) e.vx *= -1;

    // ZIBO tire
    if (e.shoots && e.shootCD === 0 && Math.abs(P.x - e.x) < 300) {
      const dir = P.x > e.x ? 1 : -1;
      projectiles.push({ type: 'bullet', x: e.x + e.w / 2, y: e.y + e.h / 2, vx: dir * 5, vy: -0.5, r: 5, color: '#ff4466', owner: 'enemy', life: 80 });
      e.shootCD = 90 - G.level * 4;
    }

    // QUANTARA se téléporte
    if (e.teleports && e.teleCD === 0 && Math.abs(P.x - e.x) < 400) {
      spawnParts(e.x + e.w / 2, e.y + e.h / 2, '#aa00ff', 10, 4);
      e.x = P.x + (Math.random() < 0.5 ? -150 : 150);
      e.x = Math.max(g.x, Math.min(g.x + g.w - e.w, e.x));
      e.y = g.y - e.h;
      e.teleCD = 120 - G.level * 5;
      spawnParts(e.x + e.w / 2, e.y + e.h / 2, '#ff88ff', 10, 4);
    }

    // NEBULON tire en arc
    if (e.webs && e.webCD === 0 && Math.abs(P.x - e.x) < 350) {
      const dx = P.x - e.x, dy = P.y - e.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      projectiles.push({ type: 'bullet', x: e.x + e.w / 2, y: e.y + e.h / 2, vx: (dx / len) * 4, vy: (dy / len) * 4, r: 7, color: '#0088ff', owner: 'enemy', life: 100 });
      e.webCD = 100;
    }

    // Collision joueur ↔ ennemi
    if (rectsOverlap(P, e)) {
      if (P.vy > 1 && P.y + P.h < e.y + e.h * 0.55 && P.dashing === 0) {
        damageEnemy(e, 1); P.vy = -10; addCombo();
      } else if (P.invincible === 0 && P.dashing === 0) {
        hurtPlayer(1);
      } else if (P.dashing > 0) {
        damageEnemy(e, 2);
      }
    }
  }
}

function damageEnemy(e, dmg) {
  e.hp -= dmg; e.hitFlash = 8;
  spawnParts(e.x + e.w / 2, e.y + e.h / 2, '#ff4466', 6, 3);
  if (e.hp <= 0) {
    e.alive = false; G.enemyKills++;
    addScore(e.xp * (G.comboCount || 1));
    spawnBurst(e.x + e.w / 2, e.y + e.h / 2, ['#ffd700','#ff4466','#00f5ff'], 20);
  }
}

function addCombo() {
  G.comboCount = (G.comboCount || 1) + 1;
  G.comboTimer = 180;
  if (G.comboCount > 2) showPopup('pop-combo', `COMBO ×${G.comboCount}!`);
}

function addScore(v) {
  G.score += v;
  document.getElementById('score-hud').textContent = G.score;
}

function updateBoss() {
  const b = LD.boss;
  if (!b || !b.alive) return;
  if (b.hitFlash > 0) b.hitFlash--;
  b.anim += 0.025; b.attackTimer++;
  const phase2 = b.hp <= b.maxHp / 2;

  b.x += b.vx * (phase2 ? 1.5 : 1);
  if (b.x < LD.width - 600 || b.x + b.w > LD.width - 30) b.vx *= -1;

  b.vy += GR; b.y += b.vy; b.onGround = false;
  for (const pl of LD.platforms) {
    if (b.x + b.w > pl.x && b.x < pl.x + pl.w &&
        b.y + b.h > pl.y && b.y + b.h < pl.y + pl.h + 4 && b.vy >= 0) {
      b.y = pl.y - b.h; b.vy = 0; b.onGround = true;
    }
  }

  if (b.onGround && b.attackTimer % 100 < 4) {
    b.vy = -12; spawnParts(b.x + b.w / 2, b.y + b.h, '#ff00aa', 8, 3);
  }

  if (b.projectileCD <= 0 && Math.abs(P.x - b.x) < 600) {
    const count = phase2 ? 3 : 1;
    for (let i = 0; i < count; i++) {
      const dx = P.x - b.x, dy = P.y - b.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const spread = count > 1 ? (i - 1) * 0.4 : 0;
      projectiles.push({ type: 'bullet', x: b.x + b.w / 2, y: b.y + b.h / 2, vx: (dx / len) * 6 + spread, vy: (dy / len) * 6, r: 8, color: b.color, owner: 'boss', life: 120 });
    }
    b.projectileCD = phase2 ? 50 : 80;
  }
  b.projectileCD--;

  if (rectsOverlap(P, b)) {
    if (P.vy > 1 && P.y + P.h < b.y + b.h * 0.45) {
      b.hp--; b.hitFlash = 15; P.vy = -12;
      spawnParts(b.x + b.w / 2, b.y, '#ff00aa', 12, 5); shakeScreen(4);
      checkBossDeath(b);
    } else if (P.invincible === 0 && P.dashing === 0) {
      hurtPlayer(1);
    } else if (P.dashing > 0) {
      b.hp--; b.hitFlash = 15;
      spawnParts(b.x + b.w / 2, b.y + b.h / 2, '#ff00aa', 8, 4);
      checkBossDeath(b);
    }
  }

  // Laser du joueur → boss
  for (const pr of projectiles) {
    if (pr.owner !== 'player' || pr._hitBoss) continue;
    if (pr.x + pr.w / 2 > b.x && pr.x - pr.w / 2 < b.x + b.w && pr.y > b.y && pr.y < b.y + b.h) {
      pr._hitBoss = true; pr.life = 0;
      b.hp--; b.hitFlash = 15;
      spawnParts(b.x + b.w / 2, b.y + b.h / 2, '#00f5ff', 8, 4); shakeScreen(3);
      checkBossDeath(b);
    }
  }
}

function checkBossDeath(b) {
  if (b.hp <= 0) {
    b.alive = false; addScore(1500);
    spawnBurst(b.x + b.w / 2, b.y + b.h / 2, ['#ffd700','#ff00aa','#00f5ff','#ffffff'], 40);
    shakeScreen(14);
    if (G.level === 10) setTimeout(triggerWin, 2500);
    else                setTimeout(triggerLevelComplete, 2000);
  }
}

function updateProjectiles() {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const pr = projectiles[i];
    pr.x += pr.vx; pr.y += pr.vy; pr.life--;
    if (pr.owner !== 'player') pr.vy += 0.05;
    if (pr.life <= 0) { projectiles.splice(i, 1); continue; }

    if (pr.owner !== 'player') {
      const hitBox = { x: pr.x - (pr.r || 5), y: pr.y - (pr.r || 5), w: (pr.r || 5) * 2, h: (pr.r || 5) * 2 };
      if (rectsOverlap(P, hitBox) && P.invincible === 0) {
        hurtPlayer(1); projectiles.splice(i, 1); continue;
      }
    }

    if (pr.owner === 'player') {
      for (const e of LD.enemies) {
        if (!e.alive) continue;
        const lr = { x: pr.x - pr.w / 2, y: pr.y - 4, w: pr.w, h: 8 };
        if (rectsOverlap(lr, e)) { damageEnemy(e, 1); projectiles.splice(i, 1); addCombo(); break; }
      }
    }

    for (const pl of LD.platforms) {
      if (pr.x > pl.x && pr.x < pl.x + pl.w && pr.y > pl.y && pr.y < pl.y + pl.h) {
        projectiles.splice(i, 1); break;
      }
    }
  }
}

function updateCoins() {
  for (const c of LD.coins) {
    if (c.collected) continue;
    if (rectsOverlap(P, { x: c.x - 10, y: c.y - 10, w: 20, h: 20 })) {
      c.collected = true;
      addScore(10 + G.level * 2);
      G.coinCount++;
      spawnParts(c.x, c.y, LD.theme.coin, 6, 2.5);
    }
  }
}

function updatePowerups() {
  for (const pu of LD.powerups) {
    if (pu.collected) continue;
    if (rectsOverlap(P, { x: pu.x, y: pu.y, w: 24, h: 24 })) {
      pu.collected = true;
      applyPowerup(pu);
      spawnBurst(pu.x + 12, pu.y + 12, [pu.color, '#ffffff'], 16);
      showPowerupNotif(pu);
    }
  }
}

function applyPowerup(pu) {
  if      (pu.type === 'health') { P.lives       = Math.min(P.maxLives, P.lives + 1); addScore(200); }
  else if (pu.type === 'energy') { P.energy      = P.maxEnergy;                        addScore(150); }
  else if (pu.type === 'shield') { P.shield      = P.maxShield;                        addScore(200); }
  else if (pu.type === 'speed')  { P.speedBoost  = 300;                                addScore(150); }
  else if (pu.type === 'double') { P.doubleLaser = 300;                                addScore(200); }
  updateHUD();
}

function updateMovingPlatforms() {
  for (const pl of LD.platforms) {
    if (!pl.moving) continue;
    if (pl.vertical) {
      pl.y += pl.mSpeed * pl.mDir;
      if (pl.y > pl.mx + pl.mRange || pl.y < pl.mx - pl.mRange) pl.mDir *= -1;
    } else {
      pl.x += pl.mSpeed * pl.mDir;
      if (pl.x > pl.mx + pl.mRange || pl.x < pl.mx - pl.mRange) pl.mDir *= -1;
    }
    // Le joueur suit la plateforme
    if (P.onGround && P.y + P.h >= pl.y && P.y + P.h <= pl.y + pl.h + 4 && P.x + P.w > pl.x && P.x < pl.x + pl.w) {
      if (pl.vertical) P.y += pl.mSpeed * pl.mDir;
      else             P.x += pl.mSpeed * pl.mDir;
    }
  }
}

function updatePortal() {
  if (rectsOverlap(P, LD.portal)) {
    if (!LD.boss || !LD.boss.alive) triggerLevelComplete();
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    p.vy += p.gravity || 0.06;
    p.vx *= 0.97; p.life -= p.decay;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

// ═══════════════════════════════════════════
//  BOUCLE PRINCIPALE
// ═══════════════════════════════════════════
function gameLoop() {
  requestAnimationFrame(gameLoop);
  if (G.state !== 'playing') return;

  G.frameCount++;
  G.levelTime++;

  // Tremblement d'écran
  let sx = 0, sy = 0;
  if (shakeTimer > 0) {
    sx = (Math.random() - .5) * shakeAmt;
    sy = (Math.random() - .5) * shakeAmt;
    shakeTimer--;
  }

  ctx.save();
  if (sx || sy) ctx.translate(sx, sy);

  // ── Rendu ──
  drawBG();
  for (const pl of LD.platforms)  drawPlatform(pl);
  drawPortal();
  for (const c of LD.coins)       drawCoin(c);
  for (const pu of LD.powerups)   drawPowerup(pu);
  for (const pr of projectiles)   drawProjectile(pr);
  for (const e of LD.enemies)     drawEnemy(e);
  if (LD.boss) drawBoss(LD.boss);
  drawParticles();
  drawPlayer();

  ctx.restore();

  if (G.frameCount % 60 === 0) updateHUD();

  // ── Physique ──
  updatePlayer();
  updateEnemies();
  updateBoss();
  updateProjectiles();
  updateCoins();
  updatePowerups();
  updatePortal();
  updateMovingPlatforms();
  updateParticles();
}

// ═══════════════════════════════════════════
//  DÉMARRAGE
// ═══════════════════════════════════════════
gameLoop();
updateHUD();

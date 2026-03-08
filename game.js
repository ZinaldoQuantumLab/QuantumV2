'use strict';
// ═══════════════════════════════════════════
//  TRADUCTIONS FR / EN
// ═══════════════════════════════════════════
let LANG = 'fr';
const T = {
  fr: {
    titleMain:'QUANTUM RUSH', subMain:'par ZinaldoQuantumLab — v3.0',
    btnPlay:'▶ JOUER', btnNewgame:'▶ NOUVEAU JEU', btnBack:'← RETOUR',
    btnRetry:'↺ RÉESSAYER', btnMenu:'⌂ MENU', btnResume:'▶ REPRENDRE',
    btnPauseMenu:'⌂ MENU',
    titleLevelsel:'SÉLECTION NIVEAU', subLevelsel:'Choisissez votre secteur',
    titleGameover:'GAME OVER', subGameover:"La matière quantique s'est dissipée",
    titleWin:'🏆 VICTOIRE!', subWin:'Zinaldo a vaincu VORTEX!',
    titleLvlcomplete:'NIVEAU TERMINÉ!',
    lblScore:'Score:', lblCoins:'Pièces:', lblTime:'Temps:', lblEnemies:'Ennemis:',
    btnNextLevel:'NIVEAU SUIVANT ▶', btnFin:'🏆 FIN',
    descZinaldo:'Héros quantique<br>Double saut · Laser',
    descZibo:'Robot corrompu<br>Tire des missiles',
    descQuantara:'Sorcière ennemie<br>Se téléporte',
    descNebulon:'Araignée cosmique<br>Toiles quantiques',
    descVortex:'Seigneur des Ombres<br>Boss Final — Niv.10',
    hintKeys:'← → DÉPLACER · ESPACE SAUTER · Z LASER · X DASH · P PAUSE',
    pauseTitle:'⏸ PAUSE',
    popBossTitle:'⚠ BOSS!',
    levelWord:'NIVEAU', levelNames:[
      'SECTEUR ALPHA','GRILLE NÉBULEUSE','FORÊT QUANTIQUE','DÉSERT PLASMA','DIMENSION GLACE',
      'NOYAU DE LAVE','SECTEUR DU VIDE','MATRICE CRISTAL','ROYAUME DES OMBRES','CŒUR DU VORTEX'
    ],
    bossApproches:' APPROCHE!', winScore:'Score Final: ',
  },
  en: {
    titleMain:'QUANTUM RUSH', subMain:'by ZinaldoQuantumLab — v3.0',
    btnPlay:'▶ PLAY', btnNewgame:'▶ NEW GAME', btnBack:'← BACK',
    btnRetry:'↺ RETRY', btnMenu:'⌂ MENU', btnResume:'▶ RESUME',
    btnPauseMenu:'⌂ MENU',
    titleLevelsel:'LEVEL SELECT', subLevelsel:'Choose your sector',
    titleGameover:'GAME OVER', subGameover:'The quantum matter has dissipated',
    titleWin:'🏆 VICTORY!', subWin:'Zinaldo defeated VORTEX!',
    titleLvlcomplete:'LEVEL COMPLETE!',
    lblScore:'Score:', lblCoins:'Coins:', lblTime:'Time:', lblEnemies:'Enemies:',
    btnNextLevel:'NEXT LEVEL ▶', btnFin:'🏆 END',
    descZinaldo:'Quantum hero<br>Double jump · Laser',
    descZibo:'Corrupted robot<br>Shoots missiles',
    descQuantara:'Enemy witch<br>Teleports',
    descNebulon:'Cosmic spider<br>Quantum webs',
    descVortex:'Shadow Lord<br>Final Boss — Lv.10',
    hintKeys:'← → MOVE · SPACE JUMP · Z LASER · X DASH · P PAUSE',
    pauseTitle:'⏸ PAUSED',
    popBossTitle:'⚠ BOSS!',
    levelWord:'LEVEL', levelNames:[
      'SECTOR ALPHA','NEBULA GRID','QUANTUM FOREST','PLASMA DESERT','ICE DIMENSION',
      'LAVA CORE','VOID SECTOR','CRYSTAL MATRIX','SHADOW REALM','VORTEX CORE'
    ],
    bossApproches:' IS COMING!', winScore:'Final Score: ',
  }
};

function applyLang() {
  const t = T[LANG];
  document.getElementById('title-main').textContent         = t.titleMain;
  document.getElementById('sub-main').textContent           = t.subMain;
  document.getElementById('btn-play').textContent           = t.btnPlay;
  document.getElementById('btn-newgame').textContent        = t.btnNewgame;
  document.getElementById('btn-back').textContent           = t.btnBack;
  document.getElementById('btn-retry').textContent          = t.btnRetry;
  document.getElementById('btn-gomenu').textContent         = t.btnMenu;
  document.getElementById('btn-winmenu').textContent        = '🏆 ' + (LANG==='fr'?'MENU':'MENU');
  document.getElementById('btn-lcmenu').textContent         = t.btnMenu;
  document.getElementById('btn-resume').textContent         = t.btnResume;
  document.getElementById('btn-pause-menu').textContent     = t.btnPauseMenu;
  document.getElementById('title-levelsel').textContent     = t.titleLevelsel;
  document.getElementById('sub-levelsel').textContent       = t.subLevelsel;
  document.getElementById('title-gameover').textContent     = t.titleGameover;
  document.getElementById('sub-gameover').textContent       = t.subGameover;
  document.getElementById('title-win').textContent          = t.titleWin;
  document.getElementById('sub-win').textContent            = t.subWin;
  document.getElementById('title-lvlcomplete').textContent  = t.titleLvlcomplete;
  document.getElementById('lbl-score').textContent          = t.lblScore;
  document.getElementById('lbl-coins').textContent          = t.lblCoins;
  document.getElementById('lbl-time').textContent           = t.lblTime;
  document.getElementById('lbl-enemies').textContent        = t.lblEnemies;
  document.getElementById('desc-zinaldo').innerHTML         = t.descZinaldo;
  document.getElementById('desc-zibo').innerHTML            = t.descZibo;
  document.getElementById('desc-quantara').innerHTML        = t.descQuantara;
  document.getElementById('desc-nebulon').innerHTML         = t.descNebulon;
  document.getElementById('desc-vortex').innerHTML          = t.descVortex;
  document.getElementById('controls-hint').innerHTML        = t.hintKeys;
  document.getElementById('pause-title').textContent        = t.pauseTitle;
  document.getElementById('pop-boss-title').textContent     = t.popBossTitle;
  document.getElementById('lang-toggle').textContent        = LANG==='fr' ? '🌐 EN' : '🌐 FR';
  if (document.getElementById('btn-next-level'))
    document.getElementById('btn-next-level').textContent   = (G&&G.level>=10) ? t.btnFin : t.btnNextLevel;
}

function toggleLang() {
  LANG = LANG === 'fr' ? 'en' : 'fr';
  applyLang();
}

// ═══════════════════════════════════════════
//  CANVAS
// ═══════════════════════════════════════════
const canvas = document.getElementById('gc');
const ctx    = canvas.getContext('2d');
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
const mb = { left:false, right:false, jump:false, atk:false, dash:false, pause:false };
const justPressed = {};
window.addEventListener('keydown', e => {
  if (!keys[e.code]) justPressed[e.code] = true;
  keys[e.code] = true;
  if (['Space','ArrowLeft','ArrowRight','ArrowUp','KeyZ','KeyX','KeyP'].includes(e.code)) e.preventDefault();
  if (e.code === 'KeyP' || e.code === 'Escape') togglePause();
});
window.addEventListener('keyup', e => { keys[e.code] = false; });
function consumeJust(code) { const v = justPressed[code]; justPressed[code] = false; return v; }
function isDown(code, mob)  { return keys[code] || mob; }

// ═══════════════════════════════════════════
//  DONNÉES NIVEAUX — DIFFICILE (tous)
// ═══════════════════════════════════════════
const LEVEL_DEFS = [
  { name:'SECTOR ALPHA',   theme:'cyber',   bg:['#020812','#050f20'], enemies:10,  walkers:4, width:4200, boss:null,        music:'⚡' },
  { name:'NEBULA GRID',    theme:'nebula',  bg:['#030818','#0a0530'], enemies:13,  walkers:5, width:4800, boss:null,        music:'🔮' },
  { name:'QUANTUM FOREST', theme:'forest',  bg:['#021808','#051510'], enemies:16,  walkers:6, width:4800, boss:'ZIBO MK2',  music:'🌲' },
  { name:'PLASMA DESERT',  theme:'desert',  bg:['#180a00','#0a0500'], enemies:18,  walkers:7, width:5400, boss:null,        music:'🔥' },
  { name:'ICE DIMENSION',  theme:'ice',     bg:['#010d18','#001828'], enemies:20,  walkers:8, width:5400, boss:'QUANTARA',  music:'❄️' },
  { name:'LAVA CORE',      theme:'lava',    bg:['#1a0400','#0a0200'], enemies:22,  walkers:9, width:6000, boss:null,        music:'🌋' },
  { name:'VOID SECTOR',    theme:'void',    bg:['#080010','#020008'], enemies:24,  walkers:9, width:6000, boss:'NEBULON',   music:'🕳️' },
  { name:'CRYSTAL MATRIX', theme:'crystal', bg:['#001a1a','#001020'], enemies:26, walkers:10, width:6400, boss:null,        music:'💎' },
  { name:'SHADOW REALM',   theme:'shadow',  bg:['#080008','#050005'], enemies:28, walkers:11, width:6800, boss:'VORTEX JR', music:'👁️' },
  { name:'VORTEX CORE',    theme:'vortex',  bg:['#0d0020','#050010'], enemies:30, walkers:12, width:7200, boss:'VORTEX',    music:'💀' },
];

const THEMES = {
  cyber:   { plat1:'#0a1a30', plat2:'#00f5ff', ground:'#061525', coin:'#ffd700', accent:'#00f5ff' },
  nebula:  { plat1:'#1a0a30', plat2:'#aa00ff', ground:'#0f0520', coin:'#ff88ff', accent:'#aa00ff' },
  forest:  { plat1:'#0a2010', plat2:'#00ff88', ground:'#051508', coin:'#88ff44', accent:'#00cc66' },
  desert:  { plat1:'#2a1a00', plat2:'#ff8800', ground:'#180a00', coin:'#ffcc00', accent:'#ff6600' },
  ice:     { plat1:'#001a2a', plat2:'#88ddff', ground:'#000d18', coin:'#aaeeff', accent:'#44bbff' },
  lava:    { plat1:'#2a0800', plat2:'#ff4400', ground:'#1a0200', coin:'#ffaa00', accent:'#ff2200' },
  void:    { plat1:'#0a001a', plat2:'#7700ff', ground:'#040008', coin:'#cc88ff', accent:'#5500cc' },
  crystal: { plat1:'#001818', plat2:'#00ffdd', ground:'#000f10', coin:'#88ffee', accent:'#00ddcc' },
  shadow:  { plat1:'#0d000d', plat2:'#ff00ff', ground:'#060006', coin:'#ff88ff', accent:'#cc00cc' },
  vortex:  { plat1:'#100015', plat2:'#ff00aa', ground:'#070005', coin:'#ff66cc', accent:'#ff00aa' },
};

const POWERUP_TYPES = [
  { type:'health', icon:'❤️',  color:'#ff4466', label:'VIE +1'       },
  { type:'energy', icon:'⚡',  color:'#00f5ff', label:'ÉNERGIE MAX'  },
  { type:'shield', icon:'🛡',  color:'#4488ff', label:'BOUCLIER'     },
  { type:'speed',  icon:'💨',  color:'#00ff88', label:'VITESSE x2'   },
  { type:'double', icon:'✦✦', color:'#ffd700', label:'DOUBLE LASER' },
];

// ═══════════════════════════════════════════
//  PERSONNAGES JOUABLES
// ═══════════════════════════════════════════
const PLAYABLE_CHARS = [
  {
    id:'zinaldo', name:'ZINALDO', emoji:'🧬', type:'hero',
    badge:'⭐',
    desc:'Le héros quantique originel. Équilibré, laser puissant, double saut.',
    stats:{ speed:3, power:3, jump:4, defense:3 },
    bonuses:{ energyRegen:1.0, laserDmg:1, speedMult:1.0, startLives:3, maxEnergy:100 },
  },
  {
    id:'zibo', name:'ZIBO MK1', emoji:'🤖', type:'villain',
    badge:'💥',
    desc:'Prototype robot. Plus rapide et résistant, mais laser moins précis.',
    stats:{ speed:5, power:2, jump:2, defense:5 },
    bonuses:{ energyRegen:0.8, laserDmg:1, speedMult:1.35, startLives:4, maxEnergy:80 },
  },
  {
    id:'quantara', name:'QUANTARA', emoji:'🔮', type:'villain',
    badge:'✨',
    desc:'La sorcière rebelle. Énergie illimitée, téléportation, mais fragile.',
    stats:{ speed:4, power:5, jump:3, defense:1 },
    bonuses:{ energyRegen:1.8, laserDmg:2, speedMult:1.1, startLives:2, maxEnergy:150 },
  },
  {
    id:'nebulon', name:'NEBULON', emoji:'🕷️', type:'villain',
    badge:'🕸️',
    desc:'L\'araignée quantique. Sauts incroyables, mais attaque lente.',
    stats:{ speed:2, power:2, jump:5, defense:2 },
    bonuses:{ energyRegen:1.2, laserDmg:1, speedMult:0.85, startLives:3, maxEnergy:120, tripleJump:true },
  },
];

let selectedCharId = 'zinaldo';

function openCharSelect() {
  buildCharSelect();
  showScreen('scr-charsel');
}

function buildCharSelect(){
  const row = document.getElementById('char-select-row');
  row.innerHTML = '';
  PLAYABLE_CHARS.forEach(ch => {
    const card = document.createElement('div');
    card.className = `char-select-card type-${ch.type}${ch.id===selectedCharId?' selected':''}`;
    card.innerHTML = `
      <div class="char-select-badge">${ch.badge}</div>
      <span class="char-emoji">${ch.emoji}</span>
      <div class="char-name" style="color:${ch.type==='hero'?'var(--c1)':'var(--c2)'}">${ch.name}</div>
      <div class="char-stats">
        SPD ${'█'.repeat(ch.stats.speed)}${'░'.repeat(5-ch.stats.speed)}<br>
        PWR ${'█'.repeat(ch.stats.power)}${'░'.repeat(5-ch.stats.power)}<br>
        JMP ${'█'.repeat(ch.stats.jump)}${'░'.repeat(5-ch.stats.jump)}<br>
        DEF ${'█'.repeat(ch.stats.defense)}${'░'.repeat(5-ch.stats.defense)}
      </div>`;
    card.onclick = () => {
      selectedCharId = ch.id;
      buildCharSelect();
      document.getElementById('char-sel-desc').textContent = ch.desc;
    };
    row.appendChild(card);
  });
  const ch = PLAYABLE_CHARS.find(c=>c.id===selectedCharId);
  if(ch) document.getElementById('char-sel-desc').textContent = ch.desc;
}

function confirmCharSelect() {
  applyCharBonuses();
  openLevelSelect();
}

function applyCharBonuses(){
  const ch = PLAYABLE_CHARS.find(c=>c.id===selectedCharId);
  if(!ch) return;
  // Store bonuses on G for use in resetPlayer / initLevel
  G.charBonus = ch.bonuses;
  G.charEmoji = ch.emoji;
  G.charName  = ch.name;
  // Patch P with bonuses
  P.maxEnergy   = ch.bonuses.maxEnergy;
  P.maxLives    = 5;
  P.lives       = Math.min(5, ch.bonuses.startLives);
  P._speedMult  = ch.bonuses.speedMult;
  P._energyRegen= ch.bonuses.energyRegen;
  P._laserDmg   = ch.bonuses.laserDmg;
  P._tripleJump = ch.bonuses.tripleJump || false;
}

// ═══════════════════════════════════════════
//  ÉTAT GLOBAL
// ═══════════════════════════════════════════
let G = {
  state:'menu', level:1, score:0, totalScore:0,
  lives:3, unlocked:1, completed:[], stars:{},
  frameCount:0, cameraX:0, levelTime:0,
  comboCount:0, comboTimer:0,
  coinCount:0, enemyKills:0, totalCoins:0, totalEnemies:0,
  paused:false,
};
let LD=null, particles=[], projectiles=[], powerups=[], shakeTimer=0, shakeAmt=0;

// ── Joueur ──
const P = {
  x:80, y:200, w:32, h:40,
  vx:0, vy:0, onGround:false,
  lives:3, maxLives:5, energy:100, maxEnergy:100,
  shield:0, maxShield:100, invincible:0,
  attacking:0, attackCD:0, dashing:0, dashCD:0,
  jumpCount:0, facingRight:true, anim:0,
  speedBoost:0, doubleLaser:0, lastDx:0,
  // animations cartoon
  squishX:1, squishY:1, tiltAngle:0,
};

// ═══════════════════════════════════════════
//  PAUSE
// ═══════════════════════════════════════════
function togglePause() {
  if (G.state !== 'playing' && !G.paused) return;
  G.paused = !G.paused;
  const ov = document.getElementById('pause-overlay');
  if (G.paused) {
    ov.classList.add('show'); G.state = 'paused';
    stopMusic();
  } else {
    ov.classList.remove('show'); G.state = 'playing';
    startMusic(G.level);
  }
}
function pauseToMenu() {
  G.paused = false;
  document.getElementById('pause-overlay').classList.remove('show');
  showScreen('scr-start');
}

// ═══════════════════════════════════════════
//  UI HELPERS
// ═══════════════════════════════════════════
function showScreen(id) {
  ['scr-start','scr-lvlsel','scr-gameover','scr-win','scr-lvlcomplete','scr-charsel'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = (s===id ? 'flex' : 'none');
  });
  G.state='menu'; G.paused=false;
  document.getElementById('pause-overlay').classList.remove('show');
  stopMusic();
  document.getElementById('game-wrap').style.display     = 'none';
  document.getElementById('mobile-ctrls').style.display  = 'none';
  document.getElementById('controls-hint').style.display = 'none';
  document.getElementById('pause-btn').classList.remove('visible');
  document.getElementById('lang-toggle').classList.add('visible');
  applyLang();
}

function openLevelSelect() { buildLevelGrid(); showScreen('scr-lvlsel'); }

function buildLevelGrid() {
  const grid = document.getElementById('level-grid');
  const names = T[LANG].levelNames;
  grid.innerHTML = '';
  LEVEL_DEFS.forEach((def, i) => {
    const n  = i+1, st = G.completed[n]||0;
    const cls= n<=G.unlocked ? (st>0?'completed':'unlocked') : 'locked';
    const div= document.createElement('div');
    div.className = `lvl-btn ${cls}`;
    div.innerHTML = `<span class="lvl-icon">${def.music}</span><span class="lvl-num">${n}</span><span class="lvl-name">${names[i]}</span>`+(st?`<span style="font-size:9px;color:#ffdd00">${'★'.repeat(st)}</span>`:'');
    if (n<=G.unlocked) div.onclick = () => startFromLevel(n);
    grid.appendChild(div);
  });
}

function startFromLevel(n) {
  ['scr-start','scr-lvlsel','scr-gameover','scr-win','scr-lvlcomplete','scr-charsel'].forEach(s => {
    const el = document.getElementById(s); if (el) el.style.display='none';
  });
  document.getElementById('game-wrap').style.display     = 'block';
  document.getElementById('mobile-ctrls').style.display  = 'flex';
  document.getElementById('controls-hint').style.display = 'block';
  document.getElementById('pause-btn').classList.add('visible');
  document.getElementById('lang-toggle').classList.remove('visible');
  G.level=n; G.score=0; G.totalScore=0; G.paused=false;
  resetPlayer(); initLevel(); G.state='playing';
  // Démarrer la musique
  startMusic(n);
  const ml=document.getElementById('music-label');
  if(ml){ml.textContent='♫ '+T[LANG].levelNames[n-1];ml.classList.add('show');setTimeout(()=>ml.classList.remove('show'),3000);}
  const t = T[LANG];
  showPopup('pop-level', `${t.levelWord} ${n}`, T[LANG].levelNames[n-1]);
  if (LEVEL_DEFS[n-1].boss)
    setTimeout(()=>showPopup('pop-boss',t.popBossTitle,LEVEL_DEFS[n-1].boss+t.bossApproches),3000);
}

function restartCurrentLevel() {
  document.getElementById('scr-gameover').style.display='none';
  startFromLevel(G.level);
}
function goNextLevel() {
  document.getElementById('scr-lvlcomplete').style.display='none';
  if (G.level>=10){showScreen('scr-win');return;}
  G.level++; if (G.level>G.unlocked) G.unlocked=G.level;
  resetPlayer(true); initLevel(); G.state='playing';
  startMusic(G.level);
  const ml=document.getElementById('music-label');
  if(ml){ml.textContent='♫ '+T[LANG].levelNames[G.level-1];ml.classList.add('show');setTimeout(()=>ml.classList.remove('show'),3000);}
  document.getElementById('game-wrap').style.display    ='block';
  document.getElementById('mobile-ctrls').style.display ='flex';
  const t=T[LANG];
  showPopup('pop-level',`${t.levelWord} ${G.level}`,T[LANG].levelNames[G.level-1]);
  if (LEVEL_DEFS[G.level-1].boss)
    setTimeout(()=>showPopup('pop-boss',t.popBossTitle,LEVEL_DEFS[G.level-1].boss+t.bossApproches),3000);
}

function showPopup(id,main,sub='') {
  const el=document.getElementById(id); if(!el)return;
  const h=el.querySelector('h2'), p=el.querySelector('p');
  if(h)h.textContent=main; if(p)p.textContent=sub;
  el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),2500);
}
function showPowerupNotif(pu) {
  const el=document.getElementById('powerup-notif');
  document.getElementById('pu-icon').textContent=pu.icon;
  document.getElementById('pu-text').textContent=pu.label;
  el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),2500);
}
function updateHUD() {
  document.getElementById('score-hud').textContent=G.score;
  document.getElementById('level-hud').textContent=G.level;
  document.getElementById('energy-fill').style.width=(P.energy/P.maxEnergy*100)+'%';
  const shPill=document.getElementById('shield-pill');
  if(P.shield>0){shPill.style.display='flex';document.getElementById('shield-fill').style.width=(P.shield/P.maxShield*100)+'%';}
  else shPill.style.display='none';
  const hp=document.getElementById('hp-hearts');
  hp.innerHTML='';
  for(let i=0;i<P.maxLives;i++){
    const s=document.createElement('span');s.className='heart';
    s.textContent=i<P.lives?'♥':'♡';s.style.color=i<P.lives?'#ff4466':'#ffffff22';
    hp.appendChild(s);
  }
  const combo=document.getElementById('combo-hud');
  if(G.comboCount>1){combo.style.display='flex';document.getElementById('combo-num').textContent=G.comboCount;}
  else combo.style.display='none';
}

// ── Score flottant ──
function spawnFloatScore(x,y,val) {
  const el=document.createElement('div'); el.className='float-score';
  el.textContent='+'+val;
  const cx=x-G.cameraX, cy=y;
  el.style.left=cx+'px'; el.style.top=(cy+52)+'px';
  document.getElementById('app').appendChild(el);
  setTimeout(()=>el.remove(),800);
}

// ═══════════════════════════════════════════
//  GÉNÉRATION NIVEAU — MODE DIFFICILE
// ═══════════════════════════════════════════
function initLevel() {
  const def=LEVEL_DEFS[G.level-1];
  const H=canvas.height, W=def.width, theme=THEMES[def.theme];
  particles=[]; projectiles=[]; powerups=[];
  G.frameCount=0; G.cameraX=0; G.levelTime=0;
  G.coinCount=0; G.enemyKills=0; G.comboCount=0; G.comboTimer=0;
  const platforms=[], coins=[], enemies=[], powerupSpots=[];

  // Sol
  platforms.push({x:0,y:H-40,w:W,h:40,type:'ground',moving:false});

  // Plateformes — difficile: plus espacées, plus de piques
  const pCount=12+G.level*3;
  let lx=200;
  for(let i=0;i<pCount;i++){
    const x=lx+100+Math.random()*200;
    const y=H-120-Math.random()*(H*0.48);
    const w=60+Math.random()*110;
    const isMoving=Math.random()<0.2+G.level*0.03;
    const isSpiked=G.level>=3 && Math.random()<0.18;
    platforms.push({
      x,y,w,h:16,type:'platform',
      moving:isMoving,spiked:isSpiked,
      mx:x,mRange:55+Math.random()*90,
      mSpeed:(0.7+Math.random()*1.1)*(1+G.level*0.12),
      mDir:Math.random()<.5?1:-1,
      vertical:Math.random()<0.22,
    });
    const cCount=2+Math.floor(Math.random()*3);
    for(let c=0;c<cCount;c++) coins.push({x:x+16+c*22,y:y-26,collected:false,anim:Math.random()*6.28});
    if(Math.random()<0.14+G.level*0.01) powerupSpots.push({x:x+w/2-12,y:y-50});
    lx=x+w;
  }

  // Power-ups (moins en mode difficile)
  powerupSpots.slice(0,1+Math.floor(G.level/3)).forEach(s=>{
    const pu=POWERUP_TYPES[Math.floor(Math.random()*POWERUP_TYPES.length)];
    powerups.push({...pu,...s,collected:false,anim:Math.random()*6.28});
  });

  // Ennemis sur plateformes
  const enemyTypes=['minion','zibo','quantara','nebulon'];
  for(let i=0;i<def.enemies;i++){
    const ep=platforms[1+Math.floor(Math.random()*(platforms.length-2))];
    const etype=G.level>=7?enemyTypes[Math.floor(Math.random()*4)]:
                G.level>=4?enemyTypes[Math.floor(Math.random()*3)]:
                G.level>=2?enemyTypes[Math.floor(Math.random()*2)]:'minion';
    enemies.push(makeEnemy(etype,ep,H,false));
  }

  // Ennemis marcheurs AU SOL — nouvelle feature
  for(let i=0;i<def.walkers;i++){
    const walkerX=300+Math.random()*(W-600);
    const groundPlat=platforms[0];
    const wtype=G.level>=6?enemyTypes[Math.floor(Math.random()*3)]:
                G.level>=3?enemyTypes[Math.floor(Math.random()*2)]:'minion';
    enemies.push(makeWalker(wtype,walkerX,groundPlat,H));
  }

  let boss=null;
  if(def.boss) boss=makeBoss(def.boss,W,H);
  const portal={x:W-120,y:H-120,w:48,h:80,active:true,anim:0};
  LD={platforms,coins,enemies,boss,portal,powerups,width:W,theme,def};
  G.totalCoins=coins.length; G.totalEnemies=enemies.length;
  updateHUD();
}

// ── Difficulté : vitesse × 1.8, HP +1 par niveau, tir accéléré ──
function makeEnemy(type,plat,H,isWalker=false) {
  const bases={
    minion:  {w:30,h:34,hp:1,spd:1.8,xp:100},
    zibo:    {w:34,h:40,hp:3,spd:2.0,xp:150,shoots:true},
    quantara:{w:30,h:38,hp:3,spd:2.2,xp:200,teleports:true},
    nebulon: {w:38,h:34,hp:4,spd:1.5,xp:250,webs:true},
  };
  const b=bases[type];
  const hpBonus=Math.floor(G.level/2);
  return {
    type,x:plat.x+40,y:plat.y-b.h,
    w:b.w,h:b.h,
    vx:b.spd*(Math.random()<.5?1:-1)*(1+G.level*0.12),
    hp:b.hp+hpBonus,maxHp:b.hp+hpBonus,
    xp:b.xp,alive:true,
    ground:plat,hitFlash:0,anim:Math.random()*6.28,
    shootCD:0,teleCD:0,webCD:0,
    vy:0,onGround:true,isWalker:false,
    shoots:b.shoots||false,teleports:b.teleports||false,webs:b.webs||false,
    // cartoon
    squishX:1,squishY:1,eyeAnim:0,mouthOpen:0,
  };
}

function makeWalker(type,wx,groundPlat,H) {
  const bases={
    minion:  {w:30,h:34,hp:1,spd:1.4,xp:80},
    zibo:    {w:34,h:40,hp:2,spd:1.6,xp:120,shoots:true},
    quantara:{w:30,h:38,hp:2,spd:1.9,xp:160,teleports:false},
    nebulon: {w:38,h:34,hp:3,spd:1.2,xp:200,webs:true},
  };
  const b=bases[type];
  const hpBonus=Math.floor(G.level/2);
  return {
    type,x:wx,y:groundPlat.y-b.h,
    w:b.w,h:b.h,
    vx:b.spd*(Math.random()<.5?1:-1)*(1+G.level*0.1),
    hp:b.hp+hpBonus,maxHp:b.hp+hpBonus,
    xp:b.xp,alive:true,
    ground:groundPlat,hitFlash:0,anim:Math.random()*6.28,
    shootCD:0,teleCD:0,webCD:0,
    vy:0,onGround:true,isWalker:true,
    // Marcheur suit le joueur
    chases:true,
    shoots:b.shoots||false,teleports:false,webs:b.webs||false,
    squishX:1,squishY:1,eyeAnim:0,mouthOpen:0,
  };
}

function makeBoss(name,W,H) {
  const bases={
    'ZIBO MK2': {w:70,h:84,hp:25,color:'#ff4466',emoji:'🤖'},
    'QUANTARA': {w:60,h:88,hp:32,color:'#aa00ff',emoji:'🔮'},
    'NEBULON':  {w:88,h:70,hp:40,color:'#0088ff',emoji:'🕷️'},
    'VORTEX JR':{w:74,h:94,hp:44,color:'#ff00aa',emoji:'👁️'},
    'VORTEX':   {w:96,h:112,hp:60,color:'#ff00cc',emoji:'💀'},
  };
  const b=bases[name]||bases['VORTEX'];
  return {
    name,x:W-280,y:H-40-b.h,
    w:b.w,h:b.h,vx:-3,vy:0,
    hp:b.hp,maxHp:b.hp,
    color:b.color,emoji:b.emoji,
    alive:true,phase:1,hitFlash:0,
    attackTimer:0,anim:0,
    onGround:false,jumpCD:0,projectileCD:0,
    squishX:1,squishY:1,rageAnim:0,
  };
}

function resetPlayer(keepPowerups=false) {
  P.x=80;P.y=200;P.vx=0;P.vy=0;P.onGround=false;P.invincible=0;
  P.attacking=0;P.attackCD=0;P.dashing=0;P.dashCD=0;
  P.jumpCount=0;P.facingRight=true;P.squishX=1;P.squishY=1;P.tiltAngle=0;
  if(!keepPowerups){P.energy=P.maxEnergy;P.shield=0;P.speedBoost=0;P.doubleLaser=0;}
}

// ═══════════════════════════════════════════
//  PARTICULES
// ═══════════════════════════════════════════
function spawnParts(x,y,color,n=8,spd=4,gravity=0.08) {
  for(let i=0;i<n;i++){
    const a=Math.random()*Math.PI*2;
    particles.push({x,y,vx:Math.cos(a)*spd*(0.5+Math.random()),vy:Math.sin(a)*spd*(0.5+Math.random())-1,
      life:1,decay:0.025+Math.random()*0.025,color,size:3+Math.random()*5,gravity});
  }
}
function spawnBurst(x,y,colors,n=20){colors.forEach(c=>spawnParts(x,y,c,n/colors.length,6,0.1));}

// ── Étoiles de cartoons ──
function spawnStars(x,y,color='#ffdd00',n=5) {
  for(let i=0;i<n;i++){
    const a=(i/n)*Math.PI*2;
    particles.push({x,y,vx:Math.cos(a)*5,vy:Math.sin(a)*5-2,
      life:1,decay:0.04,color,size:5,gravity:0.03,star:true});
  }
}

// ═══════════════════════════════════════════
//  RENDU CARTOON 3D
// ═══════════════════════════════════════════

/* ── Helpers cartoon ── */
function cartoonOutline(cx,cy,rx,ry,color='#000',thickness=3){
  ctx.strokeStyle=color;ctx.lineWidth=thickness;
  ctx.beginPath();ctx.ellipse(cx,cy,rx+thickness/2,ry+thickness/2,0,0,Math.PI*2);ctx.stroke();
}
function cartoonEye(x,y,r,pupilAngle=0,scared=false,angry=false){
  // Blanc
  ctx.fillStyle='#fff';ctx.strokeStyle='#000';ctx.lineWidth=2;
  ctx.beginPath();ctx.ellipse(x,y,r,r*1.1,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  // Pupille
  const px=x+Math.cos(pupilAngle)*r*0.3, py=y+Math.sin(pupilAngle)*r*0.3;
  ctx.fillStyle='#111';ctx.beginPath();ctx.arc(px,py,r*0.55,0,Math.PI*2);ctx.fill();
  // Brillance
  ctx.fillStyle='#ffffffcc';ctx.beginPath();ctx.arc(px-r*0.18,py-r*0.18,r*0.2,0,Math.PI*2);ctx.fill();
  // Sourcil si scared/angry
  if(angry){
    ctx.strokeStyle='#000';ctx.lineWidth=2.5;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(x-r*0.9,y-r*1.2);ctx.lineTo(x+r*0.5,y-r*0.6);ctx.stroke();
  }
  if(scared){
    ctx.strokeStyle='#000';ctx.lineWidth=2.5;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(x-r*0.7,y-r*0.9);ctx.lineTo(x+r*0.7,y-r*1.2);ctx.stroke();
  }
}
function cartoonMouth(cx,cy,w,open=0,happy=false){
  ctx.strokeStyle='#000';ctx.lineWidth=2.5;ctx.lineCap='round';
  if(open>0){
    ctx.fillStyle='#220000';
    ctx.beginPath();ctx.ellipse(cx,cy,w/2,open,0,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.fillStyle='#fff';
    ctx.beginPath();ctx.rect(cx-w*0.25,cy-open*0.3,w*0.5,open*0.4);ctx.fill();
  } else if(happy){
    ctx.beginPath();ctx.arc(cx,cy-2,w/2,0.1,Math.PI-0.1);ctx.stroke();
  } else {
    ctx.beginPath();ctx.moveTo(cx-w/2,cy);ctx.lineTo(cx+w/2,cy);ctx.stroke();
  }
}
function drop3dShadow(x,y,w,h,color='#00000044'){
  ctx.fillStyle=color;ctx.beginPath();
  ctx.ellipse(x+w/2,y+h+4,w*0.45,5,0,0,Math.PI*2);ctx.fill();
}

/* ── DESSIN FOND ── */
// ═══════════════════════════════════════════
//  FONDS ILLUSTRÉS PAR NIVEAU
// ═══════════════════════════════════════════
const BG_PAINTERS = {

  cyber(W,H,cx,t){
    // Ciel nuit numérique — gratte-ciels néon
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#010a1a');sky.addColorStop(0.6,'#020f28');sky.addColorStop(1,'#031530');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    // Lune holographique
    const mx=W*0.78,my=H*0.14;
    const mg=ctx.createRadialGradient(mx,my,0,mx,my,55);
    mg.addColorStop(0,'#aaeeffcc');mg.addColorStop(0.4,'#00f5ff44');mg.addColorStop(1,'transparent');
    ctx.fillStyle=mg;ctx.beginPath();ctx.arc(mx,my,55,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#00f5ff55';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.arc(mx,my,52,0,Math.PI*2);ctx.stroke();
    // Anneaux lune
    for(let r=0;r<3;r++){
      ctx.strokeStyle='#00f5ff'+(r===0?'44':'22');ctx.lineWidth=1;
      ctx.beginPath();ctx.ellipse(mx,my,60+r*14,18+r*5,0,0,Math.PI*2);ctx.stroke();
    }
    // Étoiles
    for(let i=0;i<60;i++){
      const sx=(i*317+cx*0.02)%(W+100)-50,sy=(i*197)%H*0.55;
      const br=0.4+Math.sin(G.frameCount*0.02+i)*0.3;
      ctx.globalAlpha=br;ctx.fillStyle='#fff';
      ctx.beginPath();ctx.arc(sx,sy,i%5===0?1.5:0.8,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
    // Gratte-ciels parallaxe
    const buildings=[
      {x:0.05,w:0.06,h:0.55,c:'#0a1830'},{x:0.09,w:0.04,h:0.45,c:'#061225'},
      {x:0.14,w:0.08,h:0.65,c:'#0c1f40'},{x:0.21,w:0.05,h:0.5,c:'#081528'},
      {x:0.28,w:0.07,h:0.7,c:'#0a1a35'},{x:0.38,w:0.06,h:0.58,c:'#061020'},
      {x:0.48,w:0.09,h:0.75,c:'#0e2245'},{x:0.58,w:0.04,h:0.42,c:'#081530'},
      {x:0.65,w:0.07,h:0.62,c:'#0a1c38'},{x:0.75,w:0.05,h:0.48,c:'#060e20'},
      {x:0.82,w:0.08,h:0.68,c:'#0c1e3c'},{x:0.91,w:0.06,h:0.55,c:'#081428'},
    ];
    buildings.forEach(b=>{
      const bx=(b.x*2400-cx*0.3+2400)%W - 50;
      const bh=H*b.h, by=H-bh;
      ctx.fillStyle=b.c;ctx.fillRect(bx,by,W*b.w,bh);
      // Fenêtres néon
      ctx.fillStyle='#00f5ff';
      for(let wy=by+10;wy<H-20;wy+=18){
        for(let wx=bx+6;wx<bx+W*b.w-8;wx+=12){
          if(Math.sin(wx*7+wy*3+G.frameCount*0.01)>0.3){
            ctx.globalAlpha=0.4+Math.sin(G.frameCount*0.03+wx)*.25;
            ctx.fillRect(wx,wy,5,7);
          }
        }
      }
      ctx.globalAlpha=1;
      // Antenne
      ctx.strokeStyle='#00f5ff55';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(bx+W*b.w/2,by);ctx.lineTo(bx+W*b.w/2,by-20);ctx.stroke();
      ctx.fillStyle='#ff4466';ctx.beginPath();ctx.arc(bx+W*b.w/2,by-22,3,0,Math.PI*2);ctx.fill();
    });
    // Grille holographique sol
    ctx.strokeStyle='#00f5ff10';ctx.lineWidth=1;
    const gs=45,ox=(-cx*0.15+W)%gs;
    for(let x=ox;x<W;x+=gs){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=gs){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
  },

  nebula(W,H,cx,t){
    // Espace nébuleux violet-rose
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#08021a');sky.addColorStop(0.5,'#12033a');sky.addColorStop(1,'#080118');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    // Nuages nébuleux
    const nebulas=[
      {x:0.15,y:0.2,rx:160,ry:80,c:'#7700ff'},
      {x:0.5,y:0.1,rx:200,ry:90,c:'#ff0099'},
      {x:0.8,y:0.25,rx:130,ry:60,c:'#5500cc'},
      {x:0.35,y:0.4,rx:180,ry:70,c:'#aa00ff'},
    ];
    nebulas.forEach((n,i)=>{
      const nx=(n.x*2000-cx*0.05+3000)%W;
      const g2=ctx.createRadialGradient(nx,H*n.y,0,nx,H*n.y,n.rx);
      g2.addColorStop(0,n.c+'55');g2.addColorStop(0.5,n.c+'22');g2.addColorStop(1,'transparent');
      ctx.globalAlpha=0.6+Math.sin(G.frameCount*0.003+i)*0.2;
      ctx.fillStyle=g2;ctx.beginPath();ctx.ellipse(nx,H*n.y,n.rx,n.ry,0,0,Math.PI*2);ctx.fill();
    });
    ctx.globalAlpha=1;
    // Étoiles colorées
    for(let i=0;i<80;i++){
      const sx=(i*293+cx*0.018)%(W+100)-50,sy=(i*173)%H*0.7;
      const colors=['#ffffff','#ff88ff','#aa88ff','#88aaff'];
      ctx.fillStyle=colors[i%4];
      ctx.globalAlpha=0.3+Math.sin(G.frameCount*0.025+i*0.7)*0.4;
      ctx.beginPath();ctx.arc(sx,sy,i%6===0?2:1,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
    // Planètes lointaines
    [[W*0.2,H*0.15,30,'#aa44ff'],[W*0.7,H*0.25,20,'#ff44aa']].forEach(([px,py,pr,pc])=>{
      const ppx=(px-cx*0.03+W*3)%W;
      const pg=ctx.createRadialGradient(ppx-pr*0.3,py-pr*0.3,0,ppx,py,pr);
      pg.addColorStop(0,pc+'ee');pg.addColorStop(0.7,pc+'88');pg.addColorStop(1,pc+'33');
      ctx.fillStyle=pg;ctx.beginPath();ctx.arc(ppx,py,pr,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=pc+'44';ctx.lineWidth=3;
      ctx.beginPath();ctx.ellipse(ppx,py,pr*1.7,pr*0.35,-0.3,0,Math.PI*2);ctx.stroke();
    });
  },

  forest(W,H,cx,t){
    // Forêt quantique verte avec lune
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#010e05');sky.addColorStop(0.5,'#021a08');sky.addColorStop(1,'#011205');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    // Lune verte
    const mx=W*0.2,my=H*0.12;
    const mg=ctx.createRadialGradient(mx,my,0,mx,my,40);
    mg.addColorStop(0,'#aaffcc');mg.addColorStop(0.5,'#44ff88aa');mg.addColorStop(1,'transparent');
    ctx.fillStyle=mg;ctx.beginPath();ctx.arc(mx,my,40,0,Math.PI*2);ctx.fill();
    // Étoiles
    for(let i=0;i<50;i++){
      const sx=(i*311+cx*0.015)%(W+80)-40,sy=(i*179)%H*0.45;
      ctx.fillStyle='#88ffaa';ctx.globalAlpha=0.2+Math.sin(G.frameCount*0.02+i)*0.3;
      ctx.beginPath();ctx.arc(sx,sy,0.8,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
    // Lueurs quantiques flottantes
    for(let i=0;i<8;i++){
      const fx=((i*350+G.frameCount*0.4+cx*0.06)%(W+200)+200)%W;
      const fy=H*0.3+Math.sin(G.frameCount*0.015+i*1.2)*H*0.15;
      const gr=ctx.createRadialGradient(fx,fy,0,fx,fy,25);
      gr.addColorStop(0,'#00ff8877');gr.addColorStop(1,'transparent');
      ctx.fillStyle=gr;ctx.beginPath();ctx.arc(fx,fy,25,0,Math.PI*2);ctx.fill();
    }
    // Arbres background (loin)
    for(let i=0;i<18;i++){
      const tx=((i*155-cx*0.12+3000)%W);
      const th=H*(0.3+i%4*0.06), ty=H-th*0.9;
      // Tronc
      ctx.fillStyle='#031a06';
      ctx.fillRect(tx-5,ty+th*0.6,10,th*0.4);
      // Feuillage en couches
      for(let l=0;l<3;l++){
        const lw=45-l*10, lh=50-l*8;
        ctx.fillStyle=l===0?'#023a08':'#034d0a';
        ctx.beginPath();ctx.moveTo(tx,ty-l*25);ctx.lineTo(tx-lw,ty+lh-l*25);ctx.lineTo(tx+lw,ty+lh-l*25);ctx.closePath();ctx.fill();
        // Bords lumineux
        ctx.strokeStyle='#00ff4422';ctx.lineWidth=1;ctx.stroke();
      }
    }
    // Arbres foreground (proche)
    for(let i=0;i<10;i++){
      const tx=((i*280-cx*0.35+4000)%W);
      const th=H*0.52, ty=H-th*0.85;
      ctx.fillStyle='#011003';ctx.fillRect(tx-8,ty+th*0.55,16,th*0.45);
      for(let l=0;l<4;l++){
        const lw=60-l*12;
        ctx.fillStyle=l===0?'#012505':'#013808';
        ctx.beginPath();ctx.moveTo(tx,ty-l*30);ctx.lineTo(tx-lw,ty+55-l*30);ctx.lineTo(tx+lw,ty+55-l*30);ctx.closePath();ctx.fill();
        ctx.strokeStyle='#00ff6633';ctx.lineWidth=1.5;ctx.stroke();
      }
    }
    // Particules lumières
    for(let i=0;i<15;i++){
      const px=((i*190+G.frameCount*0.3)%W),py=H*0.4+Math.sin(G.frameCount*0.02+i)*40;
      ctx.fillStyle='#00ff88';ctx.globalAlpha=Math.sin(G.frameCount*0.04+i)*0.4+0.1;
      ctx.beginPath();ctx.arc(px,py,1.5,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
  },

  desert(W,H,cx,t){
    // Désert plasma — coucher de soleil
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#1a0500');sky.addColorStop(0.4,'#3a0a00');sky.addColorStop(0.7,'#1a0800');sky.addColorStop(1,'#0a0300');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    // Soleil rouge
    const sx=W*0.6,sy=H*0.28;
    const sg=ctx.createRadialGradient(sx,sy,0,sx,sy,70);
    sg.addColorStop(0,'#ffcc44ff');sg.addColorStop(0.3,'#ff6600cc');sg.addColorStop(0.7,'#ff220044');sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg;ctx.beginPath();ctx.arc(sx,sy,70,0,Math.PI*2);ctx.fill();
    // Rayons soleil
    ctx.strokeStyle='#ff440022';ctx.lineWidth=2;
    for(let r=0;r<12;r++){
      const a=r*(Math.PI/6)+G.frameCount*0.002;
      ctx.beginPath();ctx.moveTo(sx+Math.cos(a)*75,sy+Math.sin(a)*75);
      ctx.lineTo(sx+Math.cos(a)*130,sy+Math.sin(a)*130);ctx.stroke();
    }
    // Dunes background
    const duneColors=['#1a0800','#220a00','#2a0e00'];
    [0.45,0.38,0.32].forEach((yf,li)=>{
      ctx.fillStyle=duneColors[li];
      ctx.beginPath();ctx.moveTo(-50,H);
      let dx=(-cx*(0.08+li*0.06)+4000)%(W+400)-200;
      for(let i=0;i<8;i++){
        const dh=H*(0.18+li*0.04);
        ctx.quadraticCurveTo(dx+100,H*yf-dh,dx+200,H*yf);
        ctx.quadraticCurveTo(dx+300,H*yf+dh*0.3,dx+400,H*yf);
        dx+=400;
      }
      ctx.lineTo(W+50,H);ctx.closePath();ctx.fill();
      // Reflet orange sur dunes
      ctx.strokeStyle='#ff4400'+(li===0?'33':'11');ctx.lineWidth=1;ctx.stroke();
    });
    // Cactus
    for(let i=0;i<7;i++){
      const cx2=((i*380-cx*0.22+3000)%W);
      const ch=H*0.2, cy2=H-ch;
      ctx.fillStyle='#1a0800';
      ctx.fillRect(cx2-6,cy2,12,ch);
      ctx.fillRect(cx2-18,cy2+ch*0.3,12,ch*0.35);
      ctx.fillRect(cx2+6,cy2+ch*0.5,12,ch*0.25);
      // Aiguilles plasma
      ctx.strokeStyle='#ff4400';ctx.lineWidth=1.5;
      for(let sp=0;sp<4;sp++){
        ctx.beginPath();ctx.moveTo(cx2+(sp%2===0?-6:6),cy2+sp*ch*0.22);
        ctx.lineTo(cx2+(sp%2===0?-14:14),cy2+sp*ch*0.22-5);ctx.stroke();
      }
    }
    // Étoiles
    for(let i=0;i<35;i++){
      const stx=(i*279+cx*0.01)%(W+60)-30,sty=(i*193)%H*0.35;
      ctx.fillStyle='#ff8844';ctx.globalAlpha=0.15+Math.sin(G.frameCount*0.02+i)*0.2;
      ctx.beginPath();ctx.arc(stx,sty,0.8,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
  },

  ice(W,H,cx,t){
    // Dimension glacée — aurore boréale
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#000d18');sky.addColorStop(0.5,'#001a28');sky.addColorStop(1,'#001030');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    // Aurore boréale
    for(let a=0;a<5;a++){
      const ax=W*(0.1+a*0.18);
      const aph=G.frameCount*0.008+a*0.8;
      const ag=ctx.createLinearGradient(ax,0,ax+120,H*0.5);
      const colors=['#00ffaa','#00aaff','#aa00ff','#00ffdd','#44aaff'];
      ag.addColorStop(0,'transparent');
      ag.addColorStop(0.3,colors[a%5]+'44');
      ag.addColorStop(0.6,colors[a%5]+'22');
      ag.addColorStop(1,'transparent');
      ctx.globalAlpha=0.5+Math.sin(aph)*0.3;
      ctx.fillStyle=ag;
      ctx.beginPath();
      const aw=60+Math.sin(aph*0.7)*30;
      ctx.ellipse(ax+Math.sin(aph)*40,H*0.2,aw,H*0.4,Math.sin(aph)*0.3,0,Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha=1;
    // Étoiles
    for(let i=0;i<70;i++){
      const stx=(i*307+cx*0.012)%(W+80)-40,sty=(i*191)%H*0.6;
      ctx.fillStyle='#aaeeff';ctx.globalAlpha=0.2+Math.sin(G.frameCount*0.015+i)*0.35;
      ctx.beginPath();ctx.arc(stx,sty,i%7===0?1.5:0.8,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
    // Montagnes de glace
    [[0.5,0.85,'#002244'],[0.35,0.78,'#001a38'],[0.2,0.72,'#001030']].forEach(([yf,yb,c],li)=>{
      ctx.fillStyle=c;
      ctx.beginPath();ctx.moveTo(-50,H);
      let mx2=(-cx*(0.1+li*0.07)+5000)%(W+600)-300;
      for(let i=0;i<7;i++){
        const mh=H*(0.2+Math.sin(i+li)*0.1);
        ctx.lineTo(mx2+150,H*yf-mh);ctx.lineTo(mx2+250,H*yf);mx2+=350;
      }
      ctx.lineTo(W+50,H);ctx.closePath();ctx.fill();
      // Reflet bleu-blanc
      ctx.strokeStyle='#88ddff22';ctx.lineWidth=1.5;ctx.stroke();
    });
    // Cristaux de glace au sol
    for(let i=0;i<12;i++){
      const crx=((i*280-cx*0.3+3000)%W);
      const crh=H*0.08, cry=H-crh-35;
      ctx.fillStyle='#001a33aa';ctx.strokeStyle='#44bbff55';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(crx,cry);ctx.lineTo(crx-8,cry+crh);ctx.lineTo(crx+8,cry+crh);ctx.closePath();
      ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(crx+15,cry+crh*0.3);ctx.lineTo(crx+8,cry+crh);ctx.lineTo(crx+22,cry+crh);ctx.closePath();
      ctx.fill();ctx.stroke();
    }
  },

  lava(W,H,cx,t){
    // Noyau de lave — enfer volcanique
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#0a0000');sky.addColorStop(0.4,'#1a0200');sky.addColorStop(0.8,'#2a0500');sky.addColorStop(1,'#1a0200');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    // Volcans background
    [[0.15,0.75],[0.45,0.82],[0.75,0.7],[0.92,0.78]].forEach(([xf,yf],i)=>{
      const vx=((xf*2000-cx*0.08+3000)%W);
      const vy=H*yf, vw=W*0.12, vh=H*(0.4+i%2*0.1);
      ctx.fillStyle='#1a0200';
      ctx.beginPath();ctx.moveTo(vx-vw,vy);ctx.lineTo(vx,vy-vh);ctx.lineTo(vx+vw,vy);ctx.closePath();ctx.fill();
      // Lave en éruption
      const lava_h=Math.sin(G.frameCount*0.03+i)*8+12;
      const lg=ctx.createRadialGradient(vx,vy-vh,0,vx,vy-vh,lava_h*3);
      lg.addColorStop(0,'#ffaa00cc');lg.addColorStop(0.5,'#ff220044');lg.addColorStop(1,'transparent');
      ctx.fillStyle=lg;ctx.beginPath();ctx.arc(vx,vy-vh,lava_h*3,0,Math.PI*2);ctx.fill();
    });
    // Cendres flottantes
    for(let i=0;i<25;i++){
      const ax=((i*220+G.frameCount*(0.5+i*0.05)+cx*0.1)%(W+100));
      const ay=H*0.1+((i*180+G.frameCount*0.2)%H*0.7);
      ctx.fillStyle='#ff440044';ctx.globalAlpha=Math.sin(G.frameCount*0.03+i)*0.3+0.1;
      ctx.beginPath();ctx.arc(ax,ay,1.5+i%3,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
    // Rivières de lave
    for(let river=0;river<3;river++){
      const ry=H*(0.5+river*0.12);
      const rg=ctx.createLinearGradient(0,ry-8,0,ry+8);
      rg.addColorStop(0,'#ff220000');rg.addColorStop(0.5,'#ff440066');rg.addColorStop(1,'#ff220000');
      ctx.fillStyle=rg;
      ctx.beginPath();ctx.moveTo(0,ry);
      for(let lx=0;lx<=W;lx+=40){
        ctx.lineTo(lx,ry+Math.sin((lx+G.frameCount*2+river*100)*0.05)*6);
      }
      ctx.lineTo(W,ry+20);ctx.lineTo(0,ry+20);ctx.closePath();ctx.fill();
    }
    // Lueur de lave au sol
    const lavGlow=ctx.createLinearGradient(0,H-60,0,H);
    lavGlow.addColorStop(0,'transparent');lavGlow.addColorStop(1,'#ff220033');
    ctx.fillStyle=lavGlow;ctx.fillRect(0,H-60,W,60);
  },

  void(W,H,cx,t){
    // Vide cosmique — trous noirs
    ctx.fillStyle='#030008';ctx.fillRect(0,0,W,H);
    // Trou noir principal
    const bx=W*0.65,by=H*0.3;
    const bg2=ctx.createRadialGradient(bx,by,0,bx,by,100);
    bg2.addColorStop(0,'#000000');bg2.addColorStop(0.4,'#220033aa');bg2.addColorStop(0.7,'#5500cc55');bg2.addColorStop(1,'transparent');
    ctx.fillStyle=bg2;ctx.beginPath();ctx.arc(bx,by,100,0,Math.PI*2);ctx.fill();
    // Anneau d'accrétion
    for(let r=0;r<4;r++){
      const ar=55+r*20;
      ctx.strokeStyle=r===0?'#cc88ff77':r===1?'#aa44ff55':r===2?'#7700ff33':'#5500cc22';
      ctx.lineWidth=r===0?4:r===1?3:2;
      ctx.save();ctx.translate(bx,by);ctx.rotate(G.frameCount*0.008*(r%2===0?1:-1));
      ctx.beginPath();ctx.ellipse(0,0,ar,ar*0.35,0,0,Math.PI*2);ctx.stroke();
      ctx.restore();
    }
    // Distorsion autour du trou
    ctx.strokeStyle='#7700ff22';ctx.lineWidth=1;
    for(let i=0;i<8;i++){
      const a=i*(Math.PI/4)+G.frameCount*0.005;
      const dx=Math.cos(a)*120, dy=Math.sin(a)*120;
      ctx.beginPath();ctx.moveTo(bx,by);
      ctx.quadraticCurveTo(bx+dx*0.5+Math.sin(G.frameCount*0.01)*20,by+dy*0.5,bx+dx,by+dy);ctx.stroke();
    }
    // Étoiles bleues
    for(let i=0;i<80;i++){
      const stx=(i*317+cx*0.014)%(W+80)-40,sty=(i*199)%H;
      const colors=['#ffffff','#bb88ff','#8844ff','#cc99ff'];
      ctx.fillStyle=colors[i%4];ctx.globalAlpha=0.15+Math.sin(G.frameCount*0.018+i)*0.35;
      ctx.beginPath();ctx.arc(stx,sty,i%5===0?1.8:0.9,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
    // Portails dimensionnels
    [[0.2,0.25,40,'#7700ff'],[0.82,0.45,30,'#aa00ff']].forEach(([xf,yf,pr,pc])=>{
      const px=((xf*2000-cx*0.05+4000)%W);
      const pg=ctx.createRadialGradient(px,H*yf,0,px,H*yf,pr);
      pg.addColorStop(0,'#00000000');pg.addColorStop(0.3,pc+'88');pg.addColorStop(0.7,pc+'33');pg.addColorStop(1,'transparent');
      ctx.fillStyle=pg;ctx.beginPath();ctx.arc(px,H*yf,pr,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle=pc+'66';ctx.lineWidth=2;
      ctx.save();ctx.translate(px,H*yf);ctx.rotate(G.frameCount*0.015);
      ctx.beginPath();ctx.ellipse(0,0,pr,pr*0.4,0,0,Math.PI*2);ctx.stroke();ctx.restore();
    });
  },

  crystal(W,H,cx,t){
    // Matrice cristal — caverne turquoise
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#000f10');sky.addColorStop(0.5,'#001a1a');sky.addColorStop(1,'#000c0c');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    // Cristaux géants background
    for(let i=0;i<10;i++){
      const crx=((i*310-cx*0.1+3000)%W);
      const crh=H*(0.3+i%4*0.1);
      const cry=H-crh-30;
      const cg=ctx.createLinearGradient(crx,cry,crx+30,cry+crh);
      cg.addColorStop(0,'#00ffdd33');cg.addColorStop(0.5,'#00aacc22');cg.addColorStop(1,'#005566aa');
      ctx.fillStyle=cg;ctx.strokeStyle='#00ffdd44';ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(crx,cry);ctx.lineTo(crx-18,cry+crh);ctx.lineTo(crx+18,cry+crh);ctx.closePath();
      ctx.fill();ctx.stroke();
      // Second cristal décalé
      ctx.beginPath();ctx.moveTo(crx+12,cry+crh*0.2);ctx.lineTo(crx-5,cry+crh);ctx.lineTo(crx+28,cry+crh);ctx.closePath();
      ctx.fill();ctx.stroke();
    }
    // Reflets lumineux
    for(let i=0;i<15;i++){
      const lx=((i*250+G.frameCount*0.8+cx*0.08)%(W+150))-75;
      const ly=H*(0.1+i%5*0.12);
      const lg=ctx.createRadialGradient(lx,ly,0,lx,ly,20);
      lg.addColorStop(0,'#00ffddaa');lg.addColorStop(1,'transparent');
      ctx.globalAlpha=Math.sin(G.frameCount*0.025+i)*0.4+0.2;
      ctx.fillStyle=lg;ctx.beginPath();ctx.arc(lx,ly,20,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
    // Stalactites
    for(let i=0;i<8;i++){
      const sx=((i*370-cx*0.15+3000)%W);
      const sh=H*(0.15+i%3*0.07);
      const sg=ctx.createLinearGradient(sx,0,sx,sh);
      sg.addColorStop(0,'#001a1a');sg.addColorStop(1,'#00ffdd22');
      ctx.fillStyle=sg;ctx.strokeStyle='#00ffdd33';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(sx-12,0);ctx.lineTo(sx,sh);ctx.lineTo(sx+12,0);ctx.closePath();
      ctx.fill();ctx.stroke();
    }
    // Étoiles turquoise
    for(let i=0;i<50;i++){
      const stx=(i*283+cx*0.011)%(W+60)-30,sty=(i*173)%H*0.55;
      ctx.fillStyle='#00ffdd';ctx.globalAlpha=0.1+Math.sin(G.frameCount*0.02+i)*0.25;
      ctx.beginPath();ctx.arc(stx,sty,0.8,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
  },

  shadow(W,H,cx,t){
    // Royaume des ombres — cauchemar violet
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#030005');sky.addColorStop(0.5,'#08000d');sky.addColorStop(1,'#050005');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    // Yeux dans l'obscurité
    for(let i=0;i<14;i++){
      const ex=((i*340-cx*0.07+4000)%W);
      const ey=H*(0.1+i%5*0.12);
      const blink=Math.sin(G.frameCount*0.015+i*1.5);
      if(blink>-0.7){
        const eyH=6*(blink+1)/2;
        ctx.fillStyle='#ff00ff';ctx.shadowColor='#ff00ff';ctx.shadowBlur=10;
        ctx.beginPath();ctx.ellipse(ex,ey,5,eyH,0,0,Math.PI*2);ctx.fill();
        ctx.beginPath();ctx.ellipse(ex+20,ey,5,eyH,0,0,Math.PI*2);ctx.fill();
        ctx.shadowBlur=0;
      }
    }
    ctx.globalAlpha=1;
    // Ombres fantômatiques
    for(let i=0;i<6;i++){
      const ghx=((i*450-cx*0.12+G.frameCount*(0.3+i*0.05)+5000)%W);
      const ghy=H*(0.15+i%3*0.18);
      const gg=ctx.createRadialGradient(ghx,ghy,0,ghx,ghy,40);
      gg.addColorStop(0,'#ff00ff33');gg.addColorStop(0.5,'#88008822');gg.addColorStop(1,'transparent');
      ctx.globalAlpha=0.3+Math.sin(G.frameCount*0.01+i)*0.2;
      ctx.fillStyle=gg;ctx.beginPath();ctx.ellipse(ghx,ghy,30,50,0,0,Math.PI*2);ctx.fill();
      // Visage fantôme
      ctx.globalAlpha=0.4+Math.sin(G.frameCount*0.01+i)*0.2;
      ctx.fillStyle='#ff88ff';ctx.font='14px serif';ctx.textAlign='center';
      ctx.fillText('👻',ghx,ghy);
    }
    ctx.globalAlpha=1;
    // Ruines de château
    [[0.1,0.65],[0.4,0.72],[0.72,0.6]].forEach(([xf,yf],li)=>{
      const rx=((xf*2000-cx*0.09+3000)%W);
      const rh=H*(0.25+li*0.05), ry=H*yf;
      ctx.fillStyle='#0a0008';
      ctx.fillRect(rx,ry,W*0.08,rh);
      // Créneaux
      for(let cr=0;cr<4;cr++){
        if(cr%2===0)ctx.fillRect(rx+cr*(W*0.02),ry-15,W*0.018,15);
      }
      // Fenêtres brillantes
      ctx.fillStyle='#ff00ff44';
      ctx.fillRect(rx+8,ry+20,10,14);ctx.fillRect(rx+28,ry+20,10,14);
    });
    // Éclairs violet
    if(G.frameCount%80<3){
      ctx.strokeStyle='#ff00ffaa';ctx.lineWidth=2;
      const lx1=Math.random()*W,lx2=lx1+(Math.random()-0.5)*100;
      ctx.beginPath();ctx.moveTo(lx1,0);ctx.lineTo(lx1+(Math.random()-0.5)*30,H*0.3);
      ctx.lineTo(lx2,H*0.6);ctx.stroke();
    }
  },

  vortex(W,H,cx,t){
    // Cœur du vortex — dimension finale
    ctx.fillStyle='#050010';ctx.fillRect(0,0,W,H);
    // Vortex spirale centrale
    const vx=W*0.5,vy=H*0.3;
    for(let r=20;r<200;r+=15){
      const angle=G.frameCount*0.02+r*0.08;
      const gr=ctx.createRadialGradient(vx,vy,0,vx,vy,r);
      const c=r<80?'#ff00aa':r<140?'#7700ff':'#330066';
      gr.addColorStop(0,'transparent');gr.addColorStop(0.7,c+(r<80?'44':r<140?'22':'11'));gr.addColorStop(1,'transparent');
      ctx.globalAlpha=0.6+Math.sin(angle)*0.3;
      ctx.fillStyle=gr;ctx.beginPath();ctx.arc(vx+Math.cos(angle)*r*0.1,vy+Math.sin(angle)*r*0.1,r*0.4,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
    // Anneaux rotatifs
    for(let ring=0;ring<5;ring++){
      const rr=60+ring*40;
      ctx.save();ctx.translate(vx,vy);ctx.rotate(G.frameCount*0.01*(ring%2===0?1:-0.7)+ring);
      ctx.strokeStyle=ring%2===0?'#ff00aa44':'#7700ff33';ctx.lineWidth=2+ring*0.5;
      ctx.beginPath();ctx.ellipse(0,0,rr,rr*(0.3+ring*0.08),0,0,Math.PI*2);ctx.stroke();
      ctx.restore();
    }
    // Étoiles distordues
    for(let i=0;i<90;i++){
      const stx=(i*277+cx*0.013+Math.sin(G.frameCount*0.008+i)*20)%(W+80)-40;
      const sty=(i*193)%H;
      const dist=Math.sin(G.frameCount*0.012+i*0.8)*0.5+0.3;
      ctx.fillStyle=i%3===0?'#ff44aa':i%3===1?'#aa44ff':'#ffffff';
      ctx.globalAlpha=dist;ctx.beginPath();ctx.arc(stx,sty,i%6===0?2:0.8,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
    // Portails déchirés
    for(let p=0;p<4;p++){
      const px=((p*550-cx*0.06+4000)%W);
      const py=H*(0.15+p%2*0.2);
      ctx.strokeStyle='#ff00aa66';ctx.lineWidth=3;
      ctx.save();ctx.translate(px,py);ctx.rotate(G.frameCount*0.02+p);
      ctx.beginPath();ctx.ellipse(0,0,35,50,0,0,Math.PI*2);ctx.stroke();
      ctx.strokeStyle='#7700ff44';ctx.lineWidth=2;
      ctx.beginPath();ctx.ellipse(0,0,50,35,0,0,Math.PI*2);ctx.stroke();
      ctx.restore();
      const pg=ctx.createRadialGradient(px,py,0,px,py,35);
      pg.addColorStop(0,'#ff00aa22');pg.addColorStop(1,'transparent');
      ctx.fillStyle=pg;ctx.beginPath();ctx.arc(px,py,35,0,Math.PI*2);ctx.fill();
    }
    // Pluie de données
    for(let c=0;c<20;c++){
      const cdx=((c*180+G.frameCount*(1+c*0.3))%(W+50))-25;
      const cdy=(G.frameCount*(0.8+c*0.15)%H);
      ctx.fillStyle='#ff00aa44';ctx.font='10px monospace';
      ctx.fillText(Math.random()>0.5?'1':'0',cdx,cdy);
    }
  }
};

function drawBG(){
  const W=canvas.width,H=canvas.height;
  const theme=LD.def.theme;
  const painter=BG_PAINTERS[theme]||BG_PAINTERS.cyber;
  // Décale le contexte selon parallaxe — le fond est dessiné en espace-écran
  const cx=G.cameraX;
  painter(W,H,cx,G.frameCount);
  ctx.globalAlpha=1;ctx.shadowBlur=0;
}

function drawPlatform(pl){
  ctx.save();ctx.translate(-G.cameraX,0);
  const t=LD.theme;
  if(pl.type==='ground'){
    // Sol cartoon avec outline et relief 3D
    ctx.fillStyle=t.ground;
    ctx.fillRect(pl.x,pl.y,pl.w,pl.h);
    // Bande supérieure colorée
    ctx.fillStyle=t.accent+'cc';ctx.fillRect(pl.x,pl.y,pl.w,5);
    // Outline noir en bas
    ctx.strokeStyle='#000';ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(pl.x,pl.y);ctx.lineTo(pl.x+pl.w,pl.y);ctx.stroke();
    // Lignes de décor
    ctx.strokeStyle=t.accent+'25';ctx.lineWidth=1;
    for(let gx=pl.x;gx<pl.x+pl.w;gx+=55){ctx.beginPath();ctx.moveTo(gx,pl.y);ctx.lineTo(gx,pl.y+pl.h);ctx.stroke();}
  } else {
    const ec=pl.moving?t.accent:t.plat2;
    // Corps avec arrondi
    ctx.shadowColor=ec;ctx.shadowBlur=pl.moving?12:5;
    ctx.fillStyle=t.plat1+'ee';
    ctx.beginPath();ctx.roundRect(pl.x,pl.y,pl.w,pl.h,4);ctx.fill();
    // Outline cartoon
    ctx.strokeStyle='#000';ctx.lineWidth=2.5;ctx.stroke();
    // Bande lumière dessus
    ctx.fillStyle=ec+'99';ctx.beginPath();ctx.roundRect(pl.x+2,pl.y+1,pl.w-4,4,2);ctx.fill();
    // Ombre portée 3D
    ctx.fillStyle='#00000066';ctx.beginPath();ctx.roundRect(pl.x+3,pl.y+pl.h,pl.w-3,5,2);ctx.fill();
    if(pl.spiked){
      ctx.fillStyle='#ff3300';ctx.shadowColor='#ff3300';ctx.shadowBlur=8;
      for(let sx=pl.x+8;sx<pl.x+pl.w-8;sx+=18){
        ctx.beginPath();ctx.moveTo(sx,pl.y);ctx.lineTo(sx+9,pl.y-12);ctx.lineTo(sx+18,pl.y);
        ctx.fill();ctx.strokeStyle='#000';ctx.lineWidth=1.5;ctx.stroke();
      }
    }
  }
  ctx.shadowBlur=0;ctx.restore();
}

function drawCoin(c){
  if(c.collected)return;
  c.anim+=0.07;
  ctx.save();ctx.translate(-G.cameraX,0);
  const sc=1+Math.sin(c.anim)*0.15;
  // Ombre
  ctx.fillStyle='#00000033';ctx.beginPath();ctx.ellipse(c.x,c.y+9,7,3,0,0,Math.PI*2);ctx.fill();
  // Corps
  ctx.shadowColor=LD.theme.coin;ctx.shadowBlur=8;
  ctx.fillStyle=LD.theme.coin;
  ctx.beginPath();ctx.arc(c.x,c.y,8*sc,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#000';ctx.lineWidth=2;ctx.stroke();
  // Reflet
  ctx.fillStyle='#ffffff66';ctx.beginPath();ctx.ellipse(c.x-2,c.y-2,3*sc,2*sc,Math.PI/4,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#00000099';ctx.font=`bold ${10*sc}px monospace`;
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('Q',c.x,c.y);
  ctx.restore();
}

function drawPowerup(pu){
  if(pu.collected)return;
  pu.anim+=0.05;
  ctx.save();ctx.translate(-G.cameraX,0);
  const bob=Math.sin(pu.anim)*6;
  ctx.shadowColor=pu.color;ctx.shadowBlur=16;
  // Ombre
  ctx.fillStyle='#00000044';ctx.beginPath();ctx.ellipse(pu.x+12,pu.y+30+bob,12,4,0,0,Math.PI*2);ctx.fill();
  // Boîte
  ctx.fillStyle=pu.color+'33';ctx.strokeStyle=pu.color;ctx.lineWidth=3;
  ctx.beginPath();ctx.roundRect(pu.x,pu.y+bob,28,28,6);ctx.fill();ctx.stroke();
  // Outline noir
  ctx.strokeStyle='#000';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(pu.x-1,pu.y+bob-1,30,30,7);ctx.stroke();
  ctx.font='18px serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(pu.icon,pu.x+14,pu.y+14+bob);
  ctx.restore();
}

function drawProjectile(pr){
  ctx.save();ctx.translate(-G.cameraX,0);
  ctx.shadowColor=pr.color;ctx.shadowBlur=12;
  ctx.fillStyle=pr.color;
  if(pr.type==='laser'){
    ctx.beginPath();ctx.roundRect(pr.x-pr.w/2,pr.y-4,pr.w,8,4);ctx.fill();
    ctx.strokeStyle='#000';ctx.lineWidth=1.5;ctx.stroke();
    const g=ctx.createLinearGradient(pr.x-pr.w/2,0,pr.x+pr.w/2,0);
    g.addColorStop(0,'transparent');g.addColorStop(0.5,pr.color+'cc');g.addColorStop(1,'transparent');
    ctx.fillStyle=g;ctx.fillRect(pr.x-pr.w/2,pr.y-4,pr.w,8);
  } else {
    ctx.beginPath();ctx.arc(pr.x,pr.y,pr.r||6,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#000';ctx.lineWidth=2;ctx.stroke();
    ctx.fillStyle='#ffffff55';ctx.beginPath();ctx.arc(pr.x-2,pr.y-2,2,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
}

/* ═══════════════════════════════════════════
   DESSIN ENNEMIS CARTOON 3D
   ═══════════════════════════════════════════ */
function drawEnemy(e){
  if(!e.alive)return;
  ctx.save();ctx.translate(-G.cameraX,0);
  if(e.hitFlash>0)ctx.globalAlpha=0.35;
  e.anim+=0.06;
  const cx=e.x+e.w/2, cy=e.y+e.h/2;
  const sq=e.squishX||1, sy=e.squishY||1;
  const facing=e.vx>0;
  const ang=e.isWalker?Math.sin(e.anim)*0.12:0;

  ctx.save();ctx.translate(cx,cy);ctx.rotate(ang);ctx.scale(sq,sy);ctx.translate(-cx,-cy);

  if(e.type==='minion'){
    // === MINION : blob violet cartoon ===
    const bob=Math.sin(e.anim)*5;
    const r=e.w/2-1;
    // Ombre
    drop3dShadow(e.x,e.y+e.h-10,e.w,8,'#00000055');
    // Corps blob 3D
    ctx.shadowColor='#9900ff';ctx.shadowBlur=10;
    const bg3d=ctx.createRadialGradient(cx-r*0.3,cy+bob-r*0.3,0,cx,cy+bob,r*1.1);
    bg3d.addColorStop(0,'#cc44ff');bg3d.addColorStop(0.6,'#7700cc');bg3d.addColorStop(1,'#440088');
    ctx.fillStyle=bg3d;
    ctx.beginPath();
    ctx.ellipse(cx,cy+bob,r,r*0.9,0,0,Math.PI*2);ctx.fill();
    cartoonOutline(cx,cy+bob,r,r*0.9,'#330055',3);
    // Cornes mignonnes
    ctx.fillStyle='#ff88ff';ctx.strokeStyle='#000';ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(cx-r*0.5,cy+bob-r*0.7);ctx.lineTo(cx-r*0.35,cy+bob-r*1.3);ctx.lineTo(cx-r*0.15,cy+bob-r*0.6);ctx.closePath();ctx.fill();ctx.stroke();
    ctx.beginPath();ctx.moveTo(cx+r*0.15,cy+bob-r*0.7);ctx.lineTo(cx+r*0.35,cy+bob-r*1.3);ctx.lineTo(cx+r*0.5,cy+bob-r*0.6);ctx.closePath();ctx.fill();ctx.stroke();
    // Yeux expressifs
    const eyDir=facing?0.2:-0.2;
    cartoonEye(cx-(facing?r*0.35:-r*0.1),cy+bob-r*0.15,r*0.28,Math.atan2(P.y-(cy+bob),P.x-cx));
    cartoonEye(cx+(facing?r*0.1:r*0.35),cy+bob-r*0.15,r*0.28,Math.atan2(P.y-(cy+bob),P.x-cx),false,e.anim%6<1);
    // Bouche
    cartoonMouth(cx,cy+bob+r*0.35,r*0.7,e.anim%4<1?r*0.25:0);
    // Pieds ronds
    ctx.fillStyle='#440088';ctx.strokeStyle='#000';ctx.lineWidth=2;
    ctx.beginPath();ctx.ellipse(cx-r*0.35,e.y+e.h-2+Math.sin(e.anim*2)*3,r*0.28,r*0.22,0,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.beginPath();ctx.ellipse(cx+r*0.35,e.y+e.h-2-Math.sin(e.anim*2)*3,r*0.28,r*0.22,0,0,Math.PI*2);ctx.fill();ctx.stroke();

  } else if(e.type==='zibo'){
    // === ZIBO : robot cartoon 3D ===
    const la=Math.sin(e.anim*2)*6;
    // Ombre
    drop3dShadow(e.x,e.y+e.h-5,e.w,8,'#00000055');
    // Corps (torse)
    const torsoG=ctx.createLinearGradient(e.x+4,e.y+14,e.x+e.w-4,e.y+e.h);
    torsoG.addColorStop(0,'#ff6688');torsoG.addColorStop(1,'#880022');
    ctx.fillStyle=torsoG;ctx.strokeStyle='#000';ctx.lineWidth=3;
    ctx.beginPath();ctx.roundRect(e.x+4,e.y+14,e.w-8,e.h-14,4);ctx.fill();ctx.stroke();
    // Ombre 3D sur torse
    ctx.fillStyle='#00000033';ctx.beginPath();ctx.roundRect(e.x+e.w*0.5,e.y+14,e.w*0.4,e.h-14,{upperLeft:0,upperRight:4,lowerLeft:0,lowerRight:4});ctx.fill();
    // Tête
    const headG=ctx.createLinearGradient(e.x+5,e.y,e.x+e.w-5,e.y+16);
    headG.addColorStop(0,'#ff4466');headG.addColorStop(1,'#cc0033');
    ctx.fillStyle=headG;ctx.strokeStyle='#000';ctx.lineWidth=3;
    ctx.beginPath();ctx.roundRect(e.x+5,e.y,e.w-10,16,4);ctx.fill();ctx.stroke();
    // Antenne
    ctx.strokeStyle='#ff88aa';ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(cx,e.y);ctx.lineTo(cx+(facing?3:-3),e.y-12);ctx.stroke();
    ctx.fillStyle='#ffff44';ctx.strokeStyle='#000';ctx.lineWidth=2;
    ctx.beginPath();ctx.arc(cx+(facing?3:-3),e.y-14,4,0,Math.PI*2);ctx.fill();ctx.stroke();
    // Yeux rectangulaires
    const eyeX1=facing?e.x+7:e.x+e.w-16, eyeX2=facing?e.x+e.w-16:e.x+7;
    [[eyeX1,4,true],[eyeX2,4,false]].forEach(([ex,ew,blink])=>{
      ctx.fillStyle=blink&&e.anim%5<0.5?'#ff0000':'#ffff00';
      ctx.strokeStyle='#000';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.roundRect(ex,e.y+3,6,5,1);ctx.fill();ctx.stroke();
      ctx.fillStyle='#ffffff88';ctx.beginPath();ctx.arc(ex+1,e.y+4,1,0,Math.PI*2);ctx.fill();
    });
    // Bras
    ctx.fillStyle='#cc0033';ctx.strokeStyle='#000';ctx.lineWidth=2;
    ctx.beginPath();ctx.roundRect(e.x,e.y+16,5,14,2);ctx.fill();ctx.stroke();
    ctx.beginPath();ctx.roundRect(e.x+e.w-5,e.y+16,5,14,2);ctx.fill();ctx.stroke();
    // Jambes animées
    ctx.fillStyle='#990022';ctx.strokeStyle='#000';ctx.lineWidth=2;
    ctx.beginPath();ctx.roundRect(e.x+5,e.y+e.h-10+la*0.4,8,10,2);ctx.fill();ctx.stroke();
    ctx.beginPath();ctx.roundRect(e.x+e.w-13,e.y+e.h-10-la*0.4,8,10,2);ctx.fill();ctx.stroke();
    // Détails chest
    ctx.fillStyle='#00ffff44';ctx.strokeStyle='#00ffff';ctx.lineWidth=1;
    ctx.beginPath();ctx.arc(cx,e.y+22,4,0,Math.PI*2);ctx.fill();ctx.stroke();

  } else if(e.type==='quantara'){
    // === QUANTARA : sorcière cartoon ===
    const fl=Math.sin(e.anim*1.3)*7;
    drop3dShadow(e.x,e.y+e.h+fl-8,e.w,8,'#55005588');
    // Robe flottante
    const robeG=ctx.createLinearGradient(e.x,e.y+14+fl,e.x,e.y+e.h+fl);
    robeG.addColorStop(0,'#8800cc');robeG.addColorStop(1,'#440066');
    ctx.fillStyle=robeG;ctx.strokeStyle='#000';ctx.lineWidth=2.5;
    ctx.beginPath();
    ctx.moveTo(e.x,e.y+e.h+fl);ctx.lineTo(cx-e.w*0.15,e.y+14+fl);ctx.lineTo(cx+e.w*0.15,e.y+14+fl);
    ctx.lineTo(e.x+e.w,e.y+e.h+fl);ctx.closePath();ctx.fill();ctx.stroke();
    // Étoiles sur robe
    for(let s=0;s<3;s++){
      const sx=e.x+e.w*0.2+s*e.w*0.25, sy=e.y+e.h*0.6+fl+Math.sin(e.anim+s)*3;
      ctx.fillStyle='#ffdd00';ctx.font='8px serif';ctx.textAlign='center';ctx.fillText('✦',sx,sy);
    }
    // Corps supérieur
    const bodyG=ctx.createRadialGradient(cx-4,cy-4+fl,0,cx,cy+fl,e.w*0.55);
    bodyG.addColorStop(0,'#cc88ff');bodyG.addColorStop(0.5,'#8844cc');bodyG.addColorStop(1,'#440088');
    ctx.fillStyle=bodyG;ctx.strokeStyle='#000';ctx.lineWidth=2.5;
    ctx.beginPath();ctx.ellipse(cx,cy+fl,e.w*0.42,e.h*0.35,0,0,Math.PI*2);ctx.fill();ctx.stroke();
    // Tête ronde
    const headG2=ctx.createRadialGradient(cx-4,e.y+5+fl,0,cx,e.y+11+fl,12);
    headG2.addColorStop(0,'#ffccee');headG2.addColorStop(1,'#eea0cc');
    ctx.fillStyle=headG2;ctx.strokeStyle='#000';ctx.lineWidth=2.5;
    ctx.beginPath();ctx.arc(cx,e.y+11+fl,12,0,Math.PI*2);ctx.fill();ctx.stroke();
    // Chapeau pointu
    ctx.fillStyle='#330055';ctx.strokeStyle='#000';ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(cx-15,e.y+15+fl);ctx.lineTo(cx+(facing?4:-4),e.y-14+fl);ctx.lineTo(cx+15,e.y+15+fl);ctx.closePath();ctx.fill();ctx.stroke();
    ctx.fillStyle='#7700cc';ctx.beginPath();ctx.ellipse(cx,e.y+16+fl,15,4,0,0,Math.PI*2);ctx.fill();ctx.stroke();
    // Yeux avec étoiles
    cartoonEye(cx-5,e.y+9+fl,4,Math.atan2(P.y-(e.y+9+fl),P.x-cx),false,false);
    cartoonEye(cx+5,e.y+9+fl,4,Math.atan2(P.y-(e.y+9+fl),P.x-cx),false,false);
    // Étoiles sur yeux
    ctx.fillStyle='#ffdd00';ctx.font='5px serif';ctx.textAlign='center';
    ctx.fillText('✦',cx-5,e.y+7+fl);ctx.fillText('✦',cx+5,e.y+7+fl);
    // Baguette
    const wx=facing?e.x+e.w-2:e.x+2, wy=e.y+e.h*0.3+fl;
    ctx.strokeStyle='#8866ff';ctx.lineWidth=3;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(wx,wy);ctx.lineTo(wx+(facing?12:-12),wy-12);ctx.stroke();
    ctx.strokeStyle='#000';ctx.lineWidth=1;ctx.stroke();
    ctx.fillStyle='#ffdd00';ctx.shadowColor='#ffdd00';ctx.shadowBlur=8;
    ctx.beginPath();ctx.arc(wx+(facing?12:-12),wy-14,4,0,Math.PI*2);ctx.fill();

  } else if(e.type==='nebulon'){
    // === NEBULON : araignée cartoon ===
    const bob=Math.sin(e.anim*0.8)*3;
    drop3dShadow(e.x,e.y+e.h-5+bob,e.w,6,'#00004488');
    // Corps principal
    const bodyG=ctx.createRadialGradient(cx-e.w*0.15,cy-e.h*0.1+bob,0,cx,cy+bob,e.w*0.48);
    bodyG.addColorStop(0,'#44aaff');bodyG.addColorStop(0.6,'#0055cc');bodyG.addColorStop(1,'#002288');
    ctx.fillStyle=bodyG;ctx.strokeStyle='#000';ctx.lineWidth=3;
    ctx.beginPath();ctx.ellipse(cx,cy+bob,e.w*0.44,e.h*0.38,0,0,Math.PI*2);ctx.fill();ctx.stroke();
    // Motif dos
    ctx.fillStyle='#0033aa55';ctx.beginPath();ctx.ellipse(cx,cy+bob,e.w*0.3,e.h*0.2,0,0,Math.PI*2);ctx.fill();
    // 4 pattes cartoon animées
    for(let i=0;i<4;i++){
      const side=i<2?-1:1;
      const legIdx=i%2;
      const la=Math.sin(e.anim+legIdx*Math.PI)*8;
      const lx1=cx+side*e.w*0.4, ly1=cy+bob-e.h*0.05;
      const lx2=cx+side*(e.w*0.7+legIdx*10), ly2=cy+bob+la+12;
      const lx3=cx+side*(e.w*0.9+legIdx*6), ly3=e.y+e.h+bob+la*0.5;
      ctx.strokeStyle='#0055cc';ctx.lineWidth=4;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(lx1,ly1);ctx.quadraticCurveTo(lx2,ly2,lx3,ly3);ctx.stroke();
      ctx.strokeStyle='#000';ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(lx1,ly1);ctx.quadraticCurveTo(lx2,ly2,lx3,ly3);ctx.stroke();
    }
    // Yeux multiples
    cartoonEye(cx-e.w*0.22,cy+bob-e.h*0.12,4.5,Math.atan2(P.y-cy,P.x-cx),true,false);
    cartoonEye(cx,cy+bob-e.h*0.18,5,Math.atan2(P.y-cy,P.x-cx),false,false);
    cartoonEye(cx+e.w*0.22,cy+bob-e.h*0.12,4.5,Math.atan2(P.y-cy,P.x-cx),true,false);
    cartoonMouth(cx,cy+bob+e.h*0.12,e.w*0.5,e.anim%3<0.5?4:0);
  }

  // Barre de vie cartoon
  if(e.maxHp>1){
    const bw=e.w+8, bx=e.x-4, by=e.y-16;
    ctx.fillStyle='#00000066';ctx.beginPath();ctx.roundRect(bx,by,bw,8,4);ctx.fill();
    ctx.strokeStyle='#000';ctx.lineWidth=1.5;ctx.stroke();
    const hpColor=e.hp/e.maxHp>0.5?'#44ff44':'#ff4444';
    ctx.fillStyle=hpColor;ctx.beginPath();ctx.roundRect(bx+1,by+1,Math.max(0,(bw-2)*(e.hp/e.maxHp)),6,3);ctx.fill();
  }
  ctx.restore();ctx.globalAlpha=1;ctx.shadowBlur=0;ctx.restore();
}

/* ═══════════════════════════════════════════
   BOSS CARTOON 3D
   ═══════════════════════════════════════════ */
function drawBoss(b){
  if(!b||!b.alive)return;
  ctx.save();ctx.translate(-G.cameraX,0);
  if(b.hitFlash>0)ctx.globalAlpha=0.25;
  b.anim+=0.03;
  const cx=b.x+b.w/2, cy=b.y+b.h/2;
  const pulse=1+Math.sin(b.anim*2)*0.07;
  const phase2=b.hp<=b.maxHp/2;
  const sq=b.squishX||1, sy2=b.squishY||1;

  ctx.save();ctx.translate(cx,cy);ctx.scale(sq,sy2);ctx.translate(-cx,-cy);

  // Aura externe
  const ag=ctx.createRadialGradient(cx,cy,0,cx,cy,90*pulse);
  ag.addColorStop(0,b.color+'33');ag.addColorStop(1,'transparent');
  ctx.fillStyle=ag;ctx.beginPath();ctx.arc(cx,cy,90*pulse,0,Math.PI*2);ctx.fill();

  if(phase2){
    // Anneaux de rage
    ctx.shadowColor=b.color;ctx.shadowBlur=15;
    for(let r=0;r<3;r++){
      ctx.save();ctx.translate(cx,cy);ctx.rotate(b.anim*2.5+r*(Math.PI*2/3));
      ctx.strokeStyle=b.color+'88';ctx.lineWidth=3;
      ctx.beginPath();ctx.ellipse(0,0,45+r*18,45+r*18,0,0,Math.PI*2);ctx.stroke();
      ctx.restore();
    }
  }

  // Ombre 3D boss
  drop3dShadow(b.x,b.y+b.h-10,b.w,16,'#000000aa');

  // Corps principal boss cartoon
  const bBodyG=ctx.createRadialGradient(cx-b.w*0.25,cy-b.h*0.2,0,cx,cy,b.w*0.6*pulse);
  bBodyG.addColorStop(0,b.color+'cc');bBodyG.addColorStop(0.5,b.color+'77');bBodyG.addColorStop(1,'#110022');
  ctx.fillStyle=bBodyG;ctx.strokeStyle='#000';ctx.lineWidth=4;
  ctx.beginPath();ctx.ellipse(cx,cy+8,b.w*0.45*pulse,b.h*0.42*pulse,0,0,Math.PI*2);ctx.fill();ctx.stroke();

  // Cornes cartoon (grandes et exagérées)
  const hornScale=phase2?1.5:1;
  ctx.fillStyle=phase2?'#ffdd00':b.color;ctx.strokeStyle='#000';ctx.lineWidth=3;
  ctx.beginPath();ctx.moveTo(cx-b.w*0.28,b.y+b.h*0.28);
  ctx.lineTo(cx-b.w*0.48,b.y-15*hornScale);ctx.lineTo(cx-b.w*0.12,b.y+b.h*0.2);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx+b.w*0.28,b.y+b.h*0.28);
  ctx.lineTo(cx+b.w*0.48,b.y-15*hornScale);ctx.lineTo(cx+b.w*0.12,b.y+b.h*0.2);ctx.closePath();ctx.fill();ctx.stroke();

  // Tête boss
  const headG=ctx.createRadialGradient(cx-8,b.y+b.h*0.15,0,cx,b.y+b.h*0.22,b.w*0.35*pulse);
  headG.addColorStop(0,'#330044');headG.addColorStop(1,'#110022');
  ctx.fillStyle=headG;ctx.strokeStyle='#000';ctx.lineWidth=3;
  ctx.beginPath();ctx.arc(cx,b.y+b.h*0.22,b.w*0.32*pulse,0,Math.PI*2);ctx.fill();ctx.stroke();

  // Yeux boss expressifs et énormes
  const eyeY=b.y+b.h*0.18;
  const eyeR=phase2?11:8;
  ctx.shadowColor=phase2?'#ffffff':'#ff00ff';ctx.shadowBlur=18;
  cartoonEye(cx-b.w*0.17,eyeY,eyeR,Math.atan2(P.y-eyeY,P.x-cx),false,phase2);
  cartoonEye(cx+b.w*0.17,eyeY,eyeR,Math.atan2(P.y-eyeY,P.x-cx),false,phase2);
  // Cercles de rage en phase 2
  if(phase2){
    ctx.strokeStyle='#ffdd00';ctx.lineWidth=2;
    [cx-b.w*0.17,cx+b.w*0.17].forEach(ex=>{
      ctx.beginPath();ctx.arc(ex,eyeY,eyeR*1.5,0,Math.PI*2);ctx.stroke();
    });
  }
  // Bouche boss
  ctx.shadowBlur=0;
  cartoonMouth(cx,b.y+b.h*0.32,b.w*0.5,phase2?8:4,!phase2);

  // Bras tentaculaires
  for(let arm=0;arm<2;arm++){
    const side=arm===0?-1:1;
    const aa=b.anim*1.5+arm*Math.PI;
    const ax1=cx+side*b.w*0.4, ay1=cy;
    const ax2=cx+side*(b.w*0.7+Math.cos(aa)*20), ay2=cy+20+Math.sin(aa)*15;
    ctx.strokeStyle=b.color;ctx.lineWidth=6;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(ax1,ay1);ctx.quadraticCurveTo(ax2,ay2,ax2+side*20,ay2+5);ctx.stroke();
    ctx.strokeStyle='#000';ctx.lineWidth=2;ctx.stroke();
    ctx.fillStyle=b.color;ctx.strokeStyle='#000';ctx.lineWidth=2;
    ctx.beginPath();ctx.arc(ax2+side*20,ay2+5,7,0,Math.PI*2);ctx.fill();ctx.stroke();
  }

  // Barre de vie boss cartoon
  const bw=220,bx=cx-bw/2,by=b.y-45;
  ctx.fillStyle='#000000aa';ctx.beginPath();ctx.roundRect(bx-2,by-2,bw+4,18,6);ctx.fill();
  ctx.strokeStyle='#000';ctx.lineWidth=2;ctx.stroke();
  const hg=ctx.createLinearGradient(bx,0,bx+bw,0);
  hg.addColorStop(0,b.color);hg.addColorStop(1,phase2?'#ffdd00':'#ff4466');
  ctx.fillStyle=hg;ctx.beginPath();ctx.roundRect(bx,by,bw*(b.hp/b.maxHp),14,4);ctx.fill();
  ctx.strokeStyle='#000';ctx.lineWidth=1.5;ctx.strokeRect(bx-1,by-1,bw+2,16);
  if(phase2){ctx.fillStyle='#ffdd0044';ctx.beginPath();ctx.roundRect(bx,by,bw*0.5,14,4);ctx.fill();}
  ctx.fillStyle='#fff';ctx.font='bold 11px Fredoka One,cursive';ctx.textAlign='center';
  ctx.textBaseline='middle';ctx.shadowColor='#000';ctx.shadowBlur=4;
  ctx.fillText(`${b.emoji} ${b.name} ${b.emoji}${phase2?' 💢':''}`,cx,by-10);

  ctx.restore();ctx.globalAlpha=1;ctx.shadowBlur=0;ctx.restore();
}

/* ═══════════════════════════════════════════
   JOUEUR CARTOON 3D — ZINALDO
   ═══════════════════════════════════════════ */
function drawPlayer(){
  const p=P;
  if(p.invincible>0&&Math.floor(G.frameCount/3)%2===0)return;
  ctx.save();ctx.translate(-G.cameraX,0);
  p.anim+=0.1;
  const cx=p.x+p.w/2, bob=p.onGround?Math.sin(p.anim)*1.5:0;
  const sq=p.squishX||1, sy=p.squishY||1;
  const dir=p.facingRight;
  const tilt=p.tiltAngle||0;
  const running=Math.abs(p.vx)>1&&p.onGround;
  const walkCycle=running?Math.sin(p.anim*3)*0.15:0;

  ctx.save();ctx.translate(cx,p.y+p.h/2+bob);
  ctx.rotate(tilt+walkCycle);ctx.scale(dir?sq:-sq,sy);ctx.translate(-p.w/2,-p.h/2-bob);

  // Ombre sol
  ctx.restore();ctx.save();ctx.translate(cx,p.y+p.h/2+bob);ctx.scale(dir?sq:-sq,sy);ctx.translate(-p.w/2,-p.h/2-bob);

  // Ombre 3D
  ctx.fillStyle='#00f5ff15';ctx.beginPath();ctx.ellipse(p.w/2,p.h+4,p.w*0.4,5,0,0,Math.PI*2);ctx.fill();

  // Effet dash
  if(p.dashing>0){
    ctx.globalAlpha=0.25;ctx.fillStyle=LD.theme.accent;
    ctx.beginPath();ctx.roundRect(-18,4,14,p.h-8,4);ctx.fill();ctx.globalAlpha=1;
  }
  // Bouclier
  if(p.shield>0){
    ctx.strokeStyle='#4488ff';ctx.shadowColor='#4488ff';ctx.shadowBlur=12;ctx.lineWidth=3;
    ctx.globalAlpha=0.5+Math.sin(G.frameCount*0.12)*0.2;
    ctx.beginPath();ctx.ellipse(p.w/2,p.h/2,28,30,0,0,Math.PI*2);ctx.stroke();
    ctx.globalAlpha=1;
  }
  if(p.speedBoost>0){ctx.shadowColor='#00ff88';ctx.shadowBlur=12;}

  // Jambes cartoon animées
  const lAnim=running?Math.sin(p.anim*3)*8:bob;
  const lAnim2=running?-Math.sin(p.anim*3)*8:bob;
  ctx.fillStyle='#004455';ctx.strokeStyle='#000';ctx.lineWidth=2;
  ctx.beginPath();ctx.roundRect(p.w*0.12,p.h-14+lAnim*0.5,p.w*0.3,14,3);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.roundRect(p.w*0.55,p.h-14+lAnim2*0.5,p.w*0.3,14,3);ctx.fill();ctx.stroke();
  // Pieds
  ctx.fillStyle='#00f5ff';ctx.strokeStyle='#000';ctx.lineWidth=2;
  ctx.beginPath();ctx.roundRect(p.w*0.06,p.h-3+lAnim*0.4,p.w*0.4,5,3);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.roundRect(p.w*0.5,p.h-3+lAnim2*0.4,p.w*0.4,5,3);ctx.fill();ctx.stroke();

  // Corps torse 3D
  const torsoG=ctx.createLinearGradient(p.w*0.1,p.h*0.35,p.w*0.9,p.h*0.9);
  torsoG.addColorStop(0,'#22ccdd');torsoG.addColorStop(0.5,'#009aaa');torsoG.addColorStop(1,'#004455');
  ctx.fillStyle=torsoG;ctx.strokeStyle='#000';ctx.lineWidth=3;
  ctx.beginPath();ctx.roundRect(p.w*0.1,p.h*0.35,p.w*0.8,p.h*0.52,4);ctx.fill();ctx.stroke();
  // Ombre 3D torse
  ctx.fillStyle='#00000033';ctx.beginPath();ctx.roundRect(p.w*0.55,p.h*0.35,p.w*0.33,p.h*0.52,{upperLeft:0,upperRight:4,lowerLeft:0,lowerRight:4});ctx.fill();
  // Étoile sur torse
  ctx.fillStyle=p.doubleLaser>0?'#ff88ff':'#ffd700';ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=6;
  ctx.font='10px serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText('✦',p.w/2,p.h*0.62);

  // Bras cartoon
  const armSwing=running?Math.sin(p.anim*3)*12:Math.sin(p.anim)*4;
  // Bras gauche
  ctx.fillStyle='#009aaa';ctx.strokeStyle='#000';ctx.lineWidth=2;
  ctx.beginPath();ctx.roundRect(-4,p.h*0.37+armSwing,6,12,2);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.roundRect(-6,p.h*0.37+armSwing+10,8,6,2);ctx.fill();ctx.stroke();
  // Bras droit (avec laser si attaque)
  const armR=p.attacking>0;
  ctx.fillStyle=armR?'#00f5ff':'#009aaa';ctx.shadowColor=armR?'#00f5ff':'transparent';ctx.shadowBlur=armR?8:0;
  ctx.strokeStyle='#000';ctx.lineWidth=2;
  ctx.beginPath();ctx.roundRect(p.w,p.h*0.37-armSwing,6,12,2);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.roundRect(p.w-2,p.h*0.37-armSwing+10,8,6,2);ctx.fill();ctx.stroke();
  ctx.shadowBlur=0;

  // Tête grosse et ronde (cartoon caricature)
  const headR=p.w*0.55;
  const hx=p.w/2, hy=p.h*0.22;
  // Casque
  const helmG=ctx.createRadialGradient(hx-headR*0.3,hy-headR*0.4,0,hx,hy,headR*1.05);
  helmG.addColorStop(0,'#44eeff');helmG.addColorStop(0.5,'#00aabb');helmG.addColorStop(1,'#003d50');
  ctx.fillStyle=helmG;ctx.strokeStyle='#000';ctx.lineWidth=3;
  ctx.beginPath();ctx.arc(hx,hy,headR,0,Math.PI*2);ctx.fill();ctx.stroke();
  // Visière
  ctx.fillStyle='#00f5ff55';ctx.strokeStyle='#00f5ff';ctx.lineWidth=2;
  ctx.beginPath();ctx.ellipse(hx,hy,headR*0.65,headR*0.35,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  // Yeux visière
  ctx.fillStyle='#00f5ffcc';
  ctx.beginPath();ctx.ellipse(hx-(dir?1:-1)*headR*0.2,hy-2,headR*0.18,headR*0.12,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#ffffffcc';ctx.beginPath();ctx.arc(hx-(dir?1:-1)*headR*0.2+2,hy-4,3,0,Math.PI*2);ctx.fill();
  // Reflet casque
  ctx.fillStyle='#ffffffaa';ctx.beginPath();ctx.ellipse(hx-headR*0.3,hy-headR*0.35,headR*0.25,headR*0.12,Math.PI/4,0,Math.PI*2);ctx.fill();
  // Noyau d'énergie sur casque
  const coreColor=p.doubleLaser>0?'#ff88ff':'#ffd700';
  ctx.fillStyle=coreColor;ctx.shadowColor=coreColor;ctx.shadowBlur=10;
  ctx.strokeStyle='#000';ctx.lineWidth=2;
  ctx.beginPath();ctx.arc(hx,hy-headR*0.02,headR*0.14,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.shadowBlur=0;

  // Effet attaque laser
  if(p.attacking>0){
    ctx.globalAlpha=0.4;
    const r=ctx.createRadialGradient(p.w,p.h*0.5,0,p.w,p.h*0.5,60);
    r.addColorStop(0,'#00f5ff');r.addColorStop(1,'transparent');
    ctx.fillStyle=r;ctx.beginPath();ctx.arc(p.w,p.h*0.5,60,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=1;
  }

  ctx.restore();
  ctx.shadowBlur=0;ctx.restore();
}

function drawPortal(){
  const po=LD.portal;
  ctx.save();ctx.translate(-G.cameraX,0);
  const cx=po.x+po.w/2, cy=po.y+po.h/2;
  po.anim=(po.anim||0)+0.035;
  // Ombre
  ctx.fillStyle='#00000055';ctx.beginPath();ctx.ellipse(cx,po.y+po.h+5,20,6,0,0,Math.PI*2);ctx.fill();
  // Anneaux rotatifs cartoon
  for(let r=0;r<4;r++){
    ctx.save();ctx.translate(cx,cy);ctx.rotate(po.anim*(r%2===0?1:-1)+r*(Math.PI/2));
    ctx.strokeStyle=r%2===0?'#00f5ffcc':'#ff0099cc';
    ctx.lineWidth=3+r*0.5;ctx.shadowColor=ctx.strokeStyle;ctx.shadowBlur=10;
    ctx.beginPath();ctx.ellipse(0,0,18+r*9,28+r*9,0,0,Math.PI*2);ctx.stroke();
    // Outline noir
    ctx.strokeStyle='#00000044';ctx.lineWidth=1;ctx.stroke();
    ctx.restore();
  }
  // Centre brillant
  const g=ctx.createRadialGradient(cx,cy,0,cx,cy,20);
  g.addColorStop(0,'#ffffffcc');g.addColorStop(0.5,'#00f5ff66');g.addColorStop(1,'transparent');
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,20,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#fff';ctx.font='bold 10px Fredoka One,cursive';ctx.textAlign='center';
  ctx.shadowColor='#00f5ff';ctx.shadowBlur=12;
  ctx.fillText(LANG==='fr'?'EXIT':'EXIT',cx,po.y-8);
  ctx.restore();
}

function drawParticles(){
  ctx.save();ctx.translate(-G.cameraX,0);
  for(const p of particles){
    ctx.globalAlpha=Math.max(0,p.life);
    ctx.fillStyle=p.color;
    if(p.star){
      ctx.font=`${Math.max(4,p.size*p.life*2.5)}px serif`;
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText('✦',p.x,p.y);
    } else {
      ctx.shadowColor=p.color;ctx.shadowBlur=6;
      ctx.beginPath();ctx.arc(p.x,p.y,Math.max(0,p.size*p.life),0,Math.PI*2);ctx.fill();
    }
  }
  ctx.globalAlpha=1;ctx.shadowBlur=0;ctx.restore();
}

// ═══════════════════════════════════════════
//  PHYSIQUE & MISE À JOUR
// ═══════════════════════════════════════════
const GR=0.54, JFORCE=-13.5, SPMAX=4.6;

function updatePlayer(){
  if(P.invincible>0)P.invincible--;
  if(P.attackCD>0)P.attackCD--;
  if(P.attacking>0)P.attacking--;
  if(P.dashCD>0)P.dashCD--;
  if(P.dashing>0){P.dashing--;P.vx=P.facingRight?11:-11;}
  if(P.speedBoost>0)P.speedBoost--;
  if(P.doubleLaser>0)P.doubleLaser--;
  if(G.comboTimer>0){G.comboTimer--;if(G.comboTimer===0)G.comboCount=0;}

  // Squish cartoon au saut/atterrissage
  const wasOnGround=P.onGround;
  P.squishX+=(1-P.squishX)*0.2;P.squishY+=(1-P.squishY)*0.2;

  const charSpeedMult = P._speedMult || 1.0;
  const charEnergyRegen = P._energyRegen || 1.0;
  const spd=(P.speedBoost>0?SPMAX*1.85:SPMAX*charSpeedMult)+(G.level*0.06);
  if(!P.dashing){
    if(isDown('ArrowLeft',mb.left)){P.vx=-spd;P.facingRight=false;}
    else if(isDown('ArrowRight',mb.right)){P.vx=spd;P.facingRight=true;}
    else P.vx*=0.75;
  }
  // Tilt cartoon selon vitesse
  P.tiltAngle=(P.vx/SPMAX)*0.08;

  if((consumeJust('Space')||consumeJust('ArrowUp')||mb.jump)&&!mb._jumpHeld){
    if(P.onGround){
      P.vy=JFORCE;P.onGround=false;P.jumpCount=1;
      P.squishX=1.3;P.squishY=0.7;
      playHitSound('jump');
      spawnParts(P.x+P.w/2,P.y+P.h,'#00f5ff',6,2.5);
      spawnStars(P.x+P.w/2,P.y+P.h,'#00f5ff',3);
    } else if(P.jumpCount<2&&P.energy>=15){
      P.vy=JFORCE*0.88;P.jumpCount++;P.energy-=15;
      P.squishX=1.2;P.squishY=0.8;
      playHitSound('jump');
      spawnParts(P.x+P.w/2,P.y+P.h,LD.theme.accent,8,3.5);
    } else if(P._tripleJump&&P.jumpCount<3&&P.energy>=20){
      P.vy=JFORCE*0.75;P.jumpCount++;P.energy-=20;
      P.squishX=1.15;P.squishY=0.85;
      playHitSound('jump');
      spawnParts(P.x+P.w/2,P.y+P.h,'#0088ff',10,4);
    }
    mb._jumpHeld=true;
  }
  if(!mb.jump&&!keys['Space']&&!keys['ArrowUp'])mb._jumpHeld=false;

  if((consumeJust('KeyZ')||mb.atk)&&!mb._atkHeld&&P.attackCD===0){
    P.attacking=18;P.attackCD=22;P.energy=Math.max(0,P.energy-8);firePlayerLaser();mb._atkHeld=true;
  }
  if(!mb.atk&&!keys['KeyZ'])mb._atkHeld=false;

  if((consumeJust('KeyX')||mb.dash)&&P.dashCD===0&&!P.dashing){
    P.dashing=8;P.dashCD=42;P.energy=Math.max(0,P.energy-20);
    P.squishX=1.5;P.squishY=0.6;
    spawnParts(P.x+P.w/2,P.y+P.h/2,LD.theme.accent,14,6);
  }

  // Pause mobile
  if(mb.pause&&!mb._pauseHeld){togglePause();mb._pauseHeld=true;}
  if(!mb.pause)mb._pauseHeld=false;

  P.energy=Math.min(P.maxEnergy,P.energy+(0.28*charEnergyRegen));
  if(!P.dashing)P.vy+=GR;
  P.x+=P.vx;P.y+=P.vy;P.onGround=false;

  for(const pl of LD.platforms){
    if(P.x+P.w>pl.x&&P.x<pl.x+pl.w&&P.y+P.h>pl.y&&P.y+P.h<pl.y+pl.h+Math.abs(P.vy)+2&&P.vy>=0){
      P.y=pl.y-P.h;P.vy=0;P.onGround=true;P.jumpCount=0;
      if(!wasOnGround){P.squishX=1.4;P.squishY=0.6;spawnParts(P.x+P.w/2,P.y+P.h,LD.theme.accent,4,1.5);}
      if(pl.spiked&&P.invincible===0)hurtPlayer(2);
    }
    if(P.x+P.w>pl.x&&P.x<pl.x+pl.w&&P.y<pl.y+pl.h&&P.y>pl.y&&P.vy<0){P.y=pl.y+pl.h;P.vy=1;}
  }
  if(P.x<0)P.x=0;
  if(P.y>canvas.height+80)hurtPlayer(1);
  if(P.x>LD.width-P.w)P.x=LD.width-P.w;
  const tCam=P.x-canvas.width*0.33;
  G.cameraX+=(tCam-G.cameraX)*0.12;
  G.cameraX=Math.max(0,Math.min(LD.width-canvas.width,G.cameraX));
}

function firePlayerLaser(){
  const dir=P.facingRight?1:-1;
  const sx=P.x+(P.facingRight?P.w+4:0), sy=P.y+P.h/2-3;
  playHitSound('laser');
  projectiles.push({type:'laser',x:sx,y:sy,vx:dir*15,vy:0,w:54,color:'#00f5ff',owner:'player',life:42});
  if(P.doubleLaser>0){
    projectiles.push({type:'laser',x:sx,y:sy-9,vx:dir*15,vy:-0.5,w:54,color:'#ff88ff',owner:'player',life:42});
    projectiles.push({type:'laser',x:sx,y:sy+9,vx:dir*15,vy:0.5,w:54,color:'#ff88ff',owner:'player',life:42});
  }
  spawnParts(sx,sy,P.doubleLaser>0?'#ff88ff':'#00f5ff',6,3);
}

function hurtPlayer(dmg=1){
  if(P.invincible>0)return;
  if(P.shield>0){P.shield=Math.max(0,P.shield-40);spawnParts(P.x+P.w/2,P.y+P.h/2,'#4488ff',8,4);shakeScreen(3);playHitSound('player');return;}
  P.lives-=dmg;P.invincible=100;P.vy=-9;
  P.squishX=0.6;P.squishY=1.4;
  spawnParts(P.x+P.w/2,P.y+P.h/2,'#ff4466',16,5.5);
  spawnStars(P.x+P.w/2,P.y+P.h/2,'#ff4466',4);
  playHitSound('player');
  shakeScreen(7);updateHUD();
  if(P.lives<=0)triggerGameOver();
}
function shakeScreen(amt){shakeTimer=15;shakeAmt=amt;}

function triggerGameOver(){
  G.state='gameover';
  stopMusic();
  playGameOverJingle();
  document.getElementById('go-score').textContent=G.score;
  document.getElementById('go-level').textContent=G.level;
  // Afficher le personnage choisi
  const charEmoji = G.charEmoji || '🧬';
  const charName  = G.charName  || 'ZINALDO';
  document.getElementById('go-char-display').textContent = charEmoji;
  document.getElementById('go-msg').textContent = charName + (LANG==='fr'?' EST TOMBÉ...':" HAS FALLEN...");
  document.getElementById('scr-gameover').style.display='flex';
  document.getElementById('game-wrap').style.display='none';
  document.getElementById('pause-btn').classList.remove('visible');
  document.getElementById('lang-toggle').classList.add('visible');
  applyLang();
  // Dessiner fond Game Over
  drawGameOverBG();
}
function drawGameOverBG(){
  const goCanvas = document.getElementById('go-bg-canvas');
  if(!goCanvas) return;
  const W = window.innerWidth, H = window.innerHeight;
  goCanvas.width = W; goCanvas.height = H;
  const gc = goCanvas.getContext('2d');
  let frame = 0;
  // Debris particles for game over
  const debris = [];
  for(let i=0;i<60;i++){
    debris.push({
      x:Math.random()*W, y:Math.random()*H*0.8,
      vx:(Math.random()-0.5)*1.5, vy:0.5+Math.random()*2,
      size:2+Math.random()*6,
      color:['#ff0099','#cc0066','#ff4466','#660033','#ff2255'][Math.floor(Math.random()*5)],
      rotation:Math.random()*Math.PI*2,
      rotSpeed:(Math.random()-0.5)*0.1,
      opacity:0.4+Math.random()*0.6
    });
  }
  // Crack lines
  const cracks = [];
  for(let i=0;i<8;i++){
    const sx = W*0.5 + (Math.random()-0.5)*W*0.3;
    const sy = H*0.5 + (Math.random()-0.5)*H*0.3;
    const pts = [{x:sx, y:sy}];
    let cx2=sx,cy2=sy;
    for(let j=0;j<6;j++){
      cx2+=(Math.random()-0.5)*150; cy2+=(Math.random()-0.5)*100;
      pts.push({x:cx2,y:cy2});
    }
    cracks.push(pts);
  }

  let goAnimId = null;
  const goAnim = () => {
    if(document.getElementById('scr-gameover').style.display==='none'){cancelAnimationFrame(goAnimId);return;}
    frame++;
    // Background — cracked dark world
    const theme = LD ? LD.def.theme : 'cyber';
    // Fond sombre cracké selon le thème du niveau
    const bgColors = {
      cyber:['#050010','#0d0025'], nebula:['#050010','#100030'],
      forest:['#010805','#031002'], desert:['#0a0500','#120800'],
      ice:['#000810','#001020'], lava:['#0a0000','#150200'],
      void:['#050008','#0a0010'], crystal:['#001010','#001818'],
      shadow:['#050005','#0a000a'], vortex:['#0a0015','#050010'],
    };
    const [c1,c2] = bgColors[theme] || ['#050010','#100025'];
    const bgGrad = gc.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*0.7);
    bgGrad.addColorStop(0,c2); bgGrad.addColorStop(1,c1);
    gc.fillStyle = bgGrad; gc.fillRect(0,0,W,H);

    // Vignette rouge sang
    const vgn = gc.createRadialGradient(W/2,H/2,H*0.2,W/2,H/2,Math.max(W,H)*0.8);
    vgn.addColorStop(0,'transparent');
    vgn.addColorStop(0.7,'#ff000008');
    vgn.addColorStop(1,'#ff000055');
    gc.fillStyle=vgn; gc.fillRect(0,0,W,H);

    // Pulsation rouge
    const pulse = 0.12+Math.sin(frame*0.04)*0.08;
    const redGlow = gc.createRadialGradient(W/2,H*0.4,0,W/2,H*0.4,H*0.4);
    redGlow.addColorStop(0,'rgba(200,0,50,'+pulse+')');
    redGlow.addColorStop(1,'transparent');
    gc.fillStyle=redGlow; gc.fillRect(0,0,W,H);

    // Lignes de fissures
    gc.strokeStyle='#ff004488'; gc.lineWidth=1.5;
    cracks.forEach(pts=>{
      gc.beginPath(); gc.moveTo(pts[0].x,pts[0].y);
      pts.slice(1).forEach(p=>gc.lineTo(p.x,p.y));
      gc.globalAlpha=0.3+Math.sin(frame*0.05)*0.15;
      gc.stroke();
    });
    gc.globalAlpha=1;

    // Debris tombants
    debris.forEach(p=>{
      p.y += p.vy; p.x += p.vx; p.rotation += p.rotSpeed;
      if(p.y > H+20) { p.y=-10; p.x=Math.random()*W; }
      gc.save();
      gc.translate(p.x,p.y); gc.rotate(p.rotation);
      gc.globalAlpha = p.opacity * Math.max(0,Math.sin(frame*0.02+p.x)*0.4+0.6);
      gc.fillStyle = p.color;
      gc.shadowColor = p.color; gc.shadowBlur=8;
      gc.fillRect(-p.size/2,-p.size/2,p.size,p.size);
      gc.restore();
    });
    gc.globalAlpha=1; gc.shadowBlur=0;

    // Éclairs électriques de mort
    if(frame%18<3){
      gc.strokeStyle='#ff0066bb'; gc.lineWidth=2;
      for(let i=0;i<4;i++){
        gc.beginPath();
        let lx=Math.random()*W, ly=0;
        gc.moveTo(lx,ly);
        for(let s=0;s<8;s++){
          lx+=(Math.random()-0.5)*80; ly+=H/8+Math.random()*20;
          gc.lineTo(lx,ly);
        }
        gc.globalAlpha=0.4; gc.stroke();
      }
      gc.globalAlpha=1;
    }

    // Grille corrompue en fond
    gc.strokeStyle='#ff004415'; gc.lineWidth=1;
    const gs=60, offX=(frame*0.3)%gs;
    for(let x=offX;x<W;x+=gs){ gc.beginPath();gc.moveTo(x,0);gc.lineTo(x,H);gc.stroke(); }
    for(let y=0;y<H;y+=gs){ gc.beginPath();gc.moveTo(0,y);gc.lineTo(W,y);gc.stroke(); }

    goAnimId = requestAnimationFrame(goAnim);
  };
  goAnim();
}

function triggerWin(){
  G.state='win';
  stopMusic();
  playVictoryJingle();
  document.getElementById('win-score').textContent=G.score;
  document.getElementById('scr-win').style.display='flex';
  document.getElementById('game-wrap').style.display='none';
  document.getElementById('pause-btn').classList.remove('visible');
  document.getElementById('lang-toggle').classList.add('visible');
  applyLang();
}
function triggerLevelComplete(){
  G.state='levelcomplete';
  const coins=LD.coins.filter(c=>c.collected).length;
  const totalCoins=LD.coins.length, time=Math.floor(G.levelTime/60);
  let stars=1;
  if(coins/totalCoins>0.6)stars=2;
  if(coins/totalCoins>0.9&&time<120)stars=3;
  G.completed[G.level]=Math.max(G.completed[G.level]||0,stars);
  G.stars[G.level]=stars;
  document.getElementById('lc-score').textContent=G.score;
  document.getElementById('lc-coins').textContent=`${coins}/${totalCoins}`;
  document.getElementById('lc-time').textContent=time+'s';
  document.getElementById('lc-enemies').textContent=`${G.enemyKills}/${G.totalEnemies}`;
  document.getElementById('lc-stars-display').textContent='⭐'.repeat(stars)+'☆'.repeat(3-stars);
  document.getElementById('btn-next-level').textContent=G.level>=10?T[LANG].btnFin:T[LANG].btnNextLevel;
  document.getElementById('scr-lvlcomplete').style.display='flex';
  document.getElementById('game-wrap').style.display='none';
  document.getElementById('pause-btn').classList.remove('visible');
  document.getElementById('lang-toggle').classList.add('visible');
  applyLang();
}

// ═══════════════════════════════════════════
//  UPDATE ENNEMIS — avec marcheurs au sol
// ═══════════════════════════════════════════
function updateEnemies(){
  for(const e of LD.enemies){
    if(!e.alive)continue;
    if(e.hitFlash>0)e.hitFlash--;
    if(e.shootCD>0)e.shootCD--;
    if(e.teleCD>0)e.teleCD--;
    if(e.webCD>0)e.webCD--;
    e.anim+=0.06;
    // Squish cartoon
    e.squishX+=(1-e.squishX)*0.15;e.squishY+=(1-e.squishY)*0.15;

    if(e.isWalker){
      // ── MARCHEUR AU SOL : avance vers le joueur ──
      const dx=P.x-e.x;
      const spd=Math.abs(e.vx);
      if(Math.abs(dx)>10) e.vx=dx>0?spd:-spd;
      // Gravité
      e.vy+=GR*0.9;
      e.x+=e.vx;e.y+=e.vy;
      // Collision sol
      for(const pl of LD.platforms){
        if(pl.type==='ground'&&e.x+e.w>pl.x&&e.x<pl.x+pl.w&&
           e.y+e.h>=pl.y&&e.y+e.h<=pl.y+pl.h+Math.abs(e.vy)+2&&e.vy>=0){
          e.y=pl.y-e.h;e.vy=0;e.onGround=true;
        }
      }
      // Clamp dans le niveau
      if(e.x<20)e.vx=Math.abs(e.vx);
      if(e.x>LD.width-e.w-20)e.vx=-Math.abs(e.vx);
    } else {
      // ── ENNEMI PLATEFORME : patrouille ──
      if(!e.teleports||e.teleCD===0)e.x+=e.vx;
      const g=e.ground;
      if(e.x<g.x||e.x+e.w>g.x+g.w)e.vx*=-1;
    }

    // Tirs — mode difficile : cooldown réduit
    const shootInterval=Math.max(25,70-G.level*4);
    if(e.shoots&&e.shootCD===0&&Math.abs(P.x-e.x)<340){
      const d=P.x>e.x?1:-1;
      projectiles.push({type:'bullet',x:e.x+e.w/2,y:e.y+e.h/2,vx:d*6,vy:-0.3,r:6,color:'#ff4466',owner:'enemy',life:80});
      e.shootCD=shootInterval;
      e.squishX=0.7;e.squishY=1.3;
    }

    // QUANTARA téléportation
    if(e.teleports&&e.teleCD===0&&Math.abs(P.x-e.x)<420){
      spawnParts(e.x+e.w/2,e.y+e.h/2,'#aa00ff',12,4);
      e.x=P.x+(Math.random()<0.5?-140:140);
      const g2=e.isWalker?LD.platforms[0]:e.ground;
      e.x=Math.max(g2.x,Math.min(g2.x+g2.w-e.w,e.x));
      e.y=g2.y-e.h;
      e.teleCD=Math.max(50,110-G.level*5);
      spawnParts(e.x+e.w/2,e.y+e.h/2,'#ff88ff',12,4);
      spawnStars(e.x+e.w/2,e.y+e.h/2,'#aa00ff',4);
    }

    // NEBULON toiles
    if(e.webs&&e.webCD===0&&Math.abs(P.x-e.x)<380){
      const dx=P.x-e.x,dy=P.y-e.y,len=Math.sqrt(dx*dx+dy*dy)||1;
      projectiles.push({type:'bullet',x:e.x+e.w/2,y:e.y+e.h/2,vx:(dx/len)*5,vy:(dy/len)*5,r:8,color:'#0088ff',owner:'enemy',life:100});
      e.webCD=85;
      e.squishX=1.3;e.squishY=0.7;
    }

    // Collision joueur ↔ ennemi
    if(rectsOverlap(P,e)){
      if(P.vy>1&&P.y+P.h<e.y+e.h*0.55&&P.dashing===0){
        damageEnemy(e,1);P.vy=-11;P.squishX=1.2;P.squishY=0.8;addCombo();
      } else if(P.invincible===0&&P.dashing===0){
        hurtPlayer(1);
      } else if(P.dashing>0){
        damageEnemy(e,2);
      }
    }
  }
}

function damageEnemy(e,dmg){
  e.hp-=dmg;e.hitFlash=10;
  e.squishX=0.6;e.squishY=1.4;
  spawnParts(e.x+e.w/2,e.y+e.h/2,'#ff4466',6,3);
  spawnStars(e.x+e.w/2,e.y+e.h/2,'#ffdd00',3);
  if(e.hp<=0){
    e.alive=false;G.enemyKills++;
    playHitSound('enemyDie');
    const pts=e.xp*(G.comboCount||1);
    addScore(pts);
    spawnFloatScore(e.x+e.w/2,e.y,pts);
    spawnBurst(e.x+e.w/2,e.y+e.h/2,['#ffd700','#ff4466','#00f5ff'],22);
  } else {
    playHitSound('enemy');
  }
}

function addCombo(){
  G.comboCount=(G.comboCount||1)+1;G.comboTimer=180;
  if(G.comboCount>2)showPopup('pop-combo',`COMBO ×${G.comboCount}!`);
}
function addScore(v){G.score+=v;document.getElementById('score-hud').textContent=G.score;}

function updateBoss(){
  const b=LD.boss;
  if(!b||!b.alive)return;
  if(b.hitFlash>0)b.hitFlash--;
  b.anim+=0.03;b.attackTimer++;
  b.squishX+=(1-b.squishX)*0.12;b.squishY+=(1-b.squishY)*0.12;
  const phase2=b.hp<=b.maxHp/2;

  b.x+=b.vx*(phase2?1.65:1);
  if(b.x<LD.width-640||b.x+b.w>LD.width-30)b.vx*=-1;
  b.vy+=GR;b.y+=b.vy;b.onGround=false;
  for(const pl of LD.platforms){
    if(b.x+b.w>pl.x&&b.x<pl.x+pl.w&&b.y+b.h>pl.y&&b.y+b.h<pl.y+pl.h+4&&b.vy>=0){
      b.y=pl.y-b.h;b.vy=0;b.onGround=true;
    }
  }
  if(b.onGround&&b.attackTimer%90<4){
    b.vy=-13;b.squishX=0.7;b.squishY=1.3;
    spawnParts(b.x+b.w/2,b.y+b.h,'#ff00aa',10,3.5);
  }

  // Projectiles — difficile
  if(b.projectileCD<=0&&Math.abs(P.x-b.x)<650){
    const count=phase2?4:2;
    for(let i=0;i<count;i++){
      const dx=P.x-b.x,dy=P.y-b.y,len=Math.sqrt(dx*dx+dy*dy)||1;
      const spread=count>1?(i-(count-1)/2)*0.45:0;
      projectiles.push({type:'bullet',x:b.x+b.w/2,y:b.y+b.h/2,vx:(dx/len)*7+spread,vy:(dy/len)*7,r:9,color:b.color,owner:'boss',life:130});
    }
    b.projectileCD=phase2?38:60;
    b.squishX=1.2;b.squishY=0.8;
  }
  b.projectileCD--;

  if(rectsOverlap(P,b)){
    if(P.vy>1&&P.y+P.h<b.y+b.h*0.45){
      b.hp--;b.hitFlash=18;P.vy=-13;b.squishX=0.6;b.squishY=1.4;
      spawnParts(b.x+b.w/2,b.y,'#ff00aa',14,5.5);spawnStars(b.x+b.w/2,b.y,'#ffdd00',5);shakeScreen(5);playHitSound('boss');checkBossDeath(b);
    } else if(P.invincible===0&&P.dashing===0){
      hurtPlayer(1);
    } else if(P.dashing>0){
      b.hp--;b.hitFlash=18;b.squishX=0.7;b.squishY=1.3;
      spawnParts(b.x+b.w/2,b.y+b.h/2,'#ff00aa',10,4.5);playHitSound('boss');checkBossDeath(b);
    }
  }
  for(const pr of projectiles){
    if(pr.owner!=='player'||pr._hitBoss)continue;
    if(pr.x+pr.w/2>b.x&&pr.x-pr.w/2<b.x+b.w&&pr.y>b.y&&pr.y<b.y+b.h){
      pr._hitBoss=true;pr.life=0;b.hp--;b.hitFlash=18;b.squishX=0.75;b.squishY=1.25;
      spawnParts(b.x+b.w/2,b.y+b.h/2,'#00f5ff',10,4.5);shakeScreen(4);playHitSound('boss');checkBossDeath(b);
    }
  }
}

function checkBossDeath(b){
  if(b.hp<=0){
    b.alive=false;addScore(2500);
    spawnBurst(b.x+b.w/2,b.y+b.h/2,['#ffd700','#ff00aa','#00f5ff','#ffffff','#ffdd00'],50);
    spawnStars(b.x+b.w/2,b.y+b.h/2,'#ffdd00',10);
    shakeScreen(18);
    if(G.level===10)setTimeout(triggerWin,2500);
    else setTimeout(triggerLevelComplete,2000);
  }
}

function updateProjectiles(){
  for(let i=projectiles.length-1;i>=0;i--){
    const pr=projectiles[i];
    pr.x+=pr.vx;pr.y+=pr.vy;pr.life--;
    if(pr.owner!=='player')pr.vy+=0.06;
    if(pr.life<=0){projectiles.splice(i,1);continue;}
    if(pr.owner!=='player'){
      const hb={x:pr.x-(pr.r||5),y:pr.y-(pr.r||5),w:(pr.r||5)*2,h:(pr.r||5)*2};
      if(rectsOverlap(P,hb)&&P.invincible===0){hurtPlayer(1);projectiles.splice(i,1);continue;}
    }
    if(pr.owner==='player'){
      for(const e of LD.enemies){
        if(!e.alive)continue;
        const lr={x:pr.x-pr.w/2,y:pr.y-4,w:pr.w,h:8};
        if(rectsOverlap(lr,e)){damageEnemy(e,P._laserDmg||1);projectiles.splice(i,1);addCombo();break;}
      }
    }
    for(const pl of LD.platforms){
      if(pr.x>pl.x&&pr.x<pl.x+pl.w&&pr.y>pl.y&&pr.y<pl.y+pl.h){projectiles.splice(i,1);break;}
    }
  }
}

function updateCoins(){
  for(const c of LD.coins){
    if(c.collected)continue;
    if(rectsOverlap(P,{x:c.x-10,y:c.y-10,w:20,h:20})){
      c.collected=true;addScore(10+G.level*2);G.coinCount++;
      spawnParts(c.x,c.y,LD.theme.coin,6,2.5);
      spawnStars(c.x,c.y,LD.theme.coin,2);
      playHitSound('coin');
    }
  }
}
function updatePowerups(){
  for(const pu of LD.powerups){
    if(pu.collected)continue;
    if(rectsOverlap(P,{x:pu.x,y:pu.y,w:28,h:28})){
      pu.collected=true;applyPowerup(pu);
      spawnBurst(pu.x+14,pu.y+14,[pu.color,'#ffffff'],18);
      spawnStars(pu.x+14,pu.y+14,pu.color,5);
      showPowerupNotif(pu);
    }
  }
}
function applyPowerup(pu){
  if(pu.type==='health'){P.lives=Math.min(P.maxLives,P.lives+1);addScore(200);}
  else if(pu.type==='energy'){P.energy=P.maxEnergy;addScore(150);}
  else if(pu.type==='shield'){P.shield=P.maxShield;addScore(200);}
  else if(pu.type==='speed'){P.speedBoost=300;addScore(150);}
  else if(pu.type==='double'){P.doubleLaser=300;addScore(200);}
  updateHUD();
}
function updateMovingPlatforms(){
  for(const pl of LD.platforms){
    if(!pl.moving)continue;
    if(pl.vertical){pl.y+=pl.mSpeed*pl.mDir;if(pl.y>pl.mx+pl.mRange||pl.y<pl.mx-pl.mRange)pl.mDir*=-1;}
    else{pl.x+=pl.mSpeed*pl.mDir;if(pl.x>pl.mx+pl.mRange||pl.x<pl.mx-pl.mRange)pl.mDir*=-1;}
    if(P.onGround&&P.y+P.h>=pl.y&&P.y+P.h<=pl.y+pl.h+4&&P.x+P.w>pl.x&&P.x<pl.x+pl.w){
      if(pl.vertical)P.y+=pl.mSpeed*pl.mDir;else P.x+=pl.mSpeed*pl.mDir;
    }
  }
}
function updatePortal(){if(rectsOverlap(P,LD.portal)){if(!LD.boss||!LD.boss.alive)triggerLevelComplete();}}
function updateParticles(){
  for(let i=particles.length-1;i>=0;i--){
    const p=particles[i];
    p.x+=p.vx;p.y+=p.vy;p.vy+=p.gravity||0.06;p.vx*=0.97;p.life-=p.decay;
    if(p.life<=0)particles.splice(i,1);
  }
}
function rectsOverlap(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;}

// ═══════════════════════════════════════════
//  SYSTÈME MUSIQUE — WEB AUDIO API PROCÉDURALE
//  Chaque niveau a son propre BPM, gamme, timbre
// ═══════════════════════════════════════════
let audioCtx = null;
let musicNodes = { osc:[], gain:null, master:null, bass:null, beat:null };
let musicInterval = null;
let currentMusicLevel = -1;
let musicVolume = 0.35;
let musicMuted = false;
let musicStep = 0;

// Gammes musicales par niveau
const MUSIC_SCALES = {
  cyber:   { notes:[261,293,330,349,392,440,494,523], bpm:138, waveform:'sawtooth',  bassNote:65,  color:'#00f5ff' },
  nebula:  { notes:[233,261,293,311,349,392,415,466], bpm:112, waveform:'sine',      bassNote:58,  color:'#aa00ff' },
  forest:  { notes:[261,294,330,370,415,466,523,587], bpm:120, waveform:'triangle',  bassNote:65,  color:'#00ff88' },
  desert:  { notes:[220,246,277,294,330,370,415,440], bpm:145, waveform:'sawtooth',  bassNote:55,  color:'#ff8800' },
  ice:     { notes:[277,311,349,370,415,466,523,554], bpm:100, waveform:'sine',      bassNote:69,  color:'#88ddff' },
  lava:    { notes:[196,220,247,261,294,330,349,392], bpm:160, waveform:'square',    bassNote:49,  color:'#ff4400' },
  void:    { notes:[185,207,233,247,277,311,349,370], bpm:90,  waveform:'sine',      bassNote:46,  color:'#7700ff' },
  crystal: { notes:[293,330,370,392,440,494,554,587], bpm:125, waveform:'triangle',  bassNote:73,  color:'#00ffdd' },
  shadow:  { notes:[207,233,261,277,311,349,370,415], bpm:108, waveform:'sawtooth',  bassNote:52,  color:'#ff00ff' },
  vortex:  { notes:[220,233,261,277,294,311,349,370], bpm:175, waveform:'square',    bassNote:55,  color:'#ff00aa' },
};

// Séquences mélodiques par niveau (indices dans la gamme)
const MUSIC_SEQS = {
  cyber:   [0,2,4,5,4,2,0,3, 2,4,5,7,5,4,2,0],
  nebula:  [0,3,5,7,5,3,0,3, 4,6,7,5,3,1,0,2],
  forest:  [0,2,3,5,7,5,3,2, 0,3,5,7,6,5,3,0],
  desert:  [0,0,3,4,0,0,3,5, 4,3,0,4,3,0,5,4],
  ice:     [0,4,7,4,0,2,5,2, 0,3,7,3,0,4,6,4],
  lava:    [0,0,0,3,0,0,3,4, 0,5,4,3,0,4,3,0],
  void:    [0,2,1,3,0,4,3,1, 2,0,3,1,4,2,0,3],
  crystal: [0,2,4,7,4,2,0,5, 4,6,7,5,3,2,0,4],
  shadow:  [0,1,3,5,3,1,0,3, 2,4,5,3,0,3,2,0],
  vortex:  [0,3,1,4,0,5,3,0, 2,5,3,6,0,4,2,7],
};

// Patterns de basse
const BASS_SEQS = {
  cyber:  [1,0,0,1, 0,1,1,0, 1,0,0,1, 0,0,1,1],
  nebula: [1,0,0,0, 1,0,1,0, 0,1,0,0, 1,0,0,1],
  forest: [1,0,1,0, 1,0,1,0, 1,0,1,0, 0,1,0,1],
  desert: [1,1,0,1, 1,0,1,1, 1,1,0,1, 0,1,1,0],
  ice:    [1,0,0,0, 0,1,0,0, 1,0,0,0, 0,0,1,0],
  lava:   [1,1,1,0, 1,1,0,1, 1,0,1,1, 1,1,0,1],
  void:   [1,0,0,1, 0,0,1,0, 0,1,0,0, 1,0,1,0],
  crystal:[1,0,1,0, 0,1,0,1, 1,0,0,1, 0,1,1,0],
  shadow: [1,0,1,1, 0,1,0,1, 1,0,1,0, 1,1,0,1],
  vortex: [1,1,0,1, 1,0,1,1, 0,1,1,1, 1,0,1,1],
};

// Patterns de batterie (kick/snare/hihat)
const DRUM_SEQS = {
  cyber:  ['k','h','s','h', 'k','h','s','k', 'k','h','s','h', 'k','k','s','h'],
  nebula: ['k','_','_','h', 's','_','h','_', 'k','_','h','_', 's','_','_','h'],
  forest: ['k','h','s','h', 'k','h','s','h', 'k','h','s','h', 'k','h','s','k'],
  desert: ['k','k','s','k', 'h','k','s','h', 'k','k','s','k', 'h','s','k','h'],
  ice:    ['k','_','_','_', 's','_','h','_', 'k','_','_','h', 's','_','_','_'],
  lava:   ['k','h','k','s', 'k','h','k','s', 'k','h','k','s', 'k','k','s','k'],
  void:   ['k','_','h','_', 's','_','_','k', 'h','_','s','_', 'k','_','h','s'],
  crystal:['k','h','s','h', 'h','k','s','h', 'k','h','h','s', 'k','h','s','h'],
  shadow: ['k','s','k','s', 'h','s','k','h', 'k','s','k','s', 'h','k','s','k'],
  vortex: ['k','k','s','k', 'k','s','k','k', 's','k','k','s', 'k','k','s','k'],
};

function initAudio(){
  if(audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playNote(freq, when, dur, wave='sawtooth', vol=0.12, detune=0){
  if(!audioCtx||musicMuted) return;
  const osc  = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1800;
  osc.type = wave;
  osc.frequency.value = freq;
  osc.detune.value = detune;
  gain.gain.setValueAtTime(0.001, when);
  gain.gain.linearRampToValueAtTime(vol * musicVolume, when + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, when + dur);
  osc.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
  osc.start(when); osc.stop(when + dur + 0.05);
}

function playDrum(type, when){
  if(!audioCtx || musicMuted) return;
  if(type === 'k'){
    // Kick drum
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.setValueAtTime(150, when);
    osc.frequency.exponentialRampToValueAtTime(40, when + 0.12);
    gain.gain.setValueAtTime(musicVolume * 0.6, when);
    gain.gain.exponentialRampToValueAtTime(0.001, when + 0.2);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(when); osc.stop(when + 0.25);
  } else if(type === 's'){
    // Snare
    const buf = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.15, audioCtx.sampleRate);
    const d   = buf.getChannelData(0);
    for(let i=0;i<d.length;i++) d[i] = (Math.random()*2-1) * Math.pow(1-i/d.length, 1.5);
    const src  = audioCtx.createBufferSource();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    filter.type='bandpass'; filter.frequency.value=2200; filter.Q.value=0.8;
    src.buffer=buf;gain.gain.setValueAtTime(musicVolume*0.4,when);
    gain.gain.exponentialRampToValueAtTime(0.001,when+0.15);
    src.connect(filter);filter.connect(gain);gain.connect(audioCtx.destination);
    src.start(when);
  } else if(type === 'h'){
    // Hi-hat
    const buf = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.05, audioCtx.sampleRate);
    const d   = buf.getChannelData(0);
    for(let i=0;i<d.length;i++) d[i] = (Math.random()*2-1) * Math.pow(1-i/d.length, 2);
    const src  = audioCtx.createBufferSource();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    filter.type='highpass'; filter.frequency.value=7000;
    src.buffer=buf; gain.gain.setValueAtTime(musicVolume*0.18, when);
    gain.gain.exponentialRampToValueAtTime(0.001, when+0.05);
    src.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
    src.start(when);
  }
}

let schedulerNext = 0;

function scheduleMusic(){
  if(!audioCtx || musicMuted) return;
  const theme = LD ? LD.def.theme : 'cyber';
  const sc    = MUSIC_SCALES[theme];
  const seq   = MUSIC_SEQS[theme];
  const bass  = BASS_SEQS[theme];
  const drum  = DRUM_SEQS[theme];
  const stepDur = 60 / sc.bpm / 2;  // double croche
  const now   = audioCtx.currentTime;

  while(schedulerNext < now + 0.25){
    const step = musicStep % seq.length;
    const when = schedulerNext;

    // Mélodie principale
    const noteIdx = seq[step];
    const freq    = sc.notes[noteIdx] * (step % 16 < 8 ? 1 : 2);
    const dur     = stepDur * (step % 4 === 0 ? 1.8 : 0.9);
    playNote(freq, when, dur, sc.waveform, 0.1);
    // Harmonie légère (tierce)
    if(step % 2 === 0)
      playNote(freq * 1.25, when, dur * 0.7, sc.waveform, 0.04, 5);

    // Basse
    if(bass[step % bass.length]){
      playNote(sc.bassNote * (step%8<4?1:0.5), when, stepDur*1.5, 'sawtooth', 0.18);
    }

    // Batterie
    playDrum(drum[step % drum.length], when);

    schedulerNext += stepDur;
    musicStep++;
  }
}

let schedulerTimer = null;

function startMusic(level){
  if(musicMuted) return;
  initAudio();
  stopMusic();
  if(audioCtx.state === 'suspended') audioCtx.resume();
  musicStep = 0;
  schedulerNext = audioCtx.currentTime + 0.1;
  currentMusicLevel = level;
  schedulerTimer = setInterval(scheduleMusic, 100);
}

function stopMusic(){
  if(schedulerTimer){ clearInterval(schedulerTimer); schedulerTimer=null; }
}

function toggleMute(){
  musicMuted = !musicMuted;
  const btn = document.getElementById('mute-btn');
  btn.textContent = musicMuted ? '🔇' : '🔊';
  if(musicMuted) stopMusic();
  else if(G.state==='playing') startMusic(G.level);
}

// ── Jingle victoire ──
function playVictoryJingle(){
  initAudio();
  if(audioCtx.state==='suspended') audioCtx.resume();
  const notes=[523,659,784,1047,784,659,523,659,784,1047,1047,1047];
  const durs =[0.15,0.15,0.15,0.3,0.15,0.15,0.3,0.15,0.15,0.6,0.15,0.6];
  let t = audioCtx.currentTime + 0.1;
  notes.forEach((n,i)=>{
    playNote(n,t,durs[i],'triangle',0.2);
    t+=durs[i]+0.02;
  });
}
// ── Jingle game over ──
function playGameOverJingle(){
  initAudio();
  if(audioCtx.state==='suspended') audioCtx.resume();
  [330,311,294,261].forEach((n,i)=>{
    playNote(n, audioCtx.currentTime+0.1+i*0.25, 0.3, 'sawtooth', 0.2);
  });
}

// ── Sons d'impact ──
function playHitSound(type='player'){
  initAudio();
  if(!audioCtx||musicMuted) return;
  if(audioCtx.state==='suspended') audioCtx.resume();
  const now = audioCtx.currentTime;
  if(type==='player'){
    // Son d'impact joueur: bruit + tonalité descendante
    const buf = audioCtx.createBuffer(1, audioCtx.sampleRate*0.12, audioCtx.sampleRate);
    const d = buf.getChannelData(0);
    for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,0.8);
    const src = audioCtx.createBufferSource();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    filter.type='bandpass'; filter.frequency.value=900; filter.Q.value=1.5;
    src.buffer=buf; gain.gain.setValueAtTime(0.55, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now+0.12);
    src.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
    src.start(now);
    // Tonalité de douleur
    const osc=audioCtx.createOscillator();
    const og=audioCtx.createGain();
    osc.type='sawtooth';
    osc.frequency.setValueAtTime(400,now);
    osc.frequency.exponentialRampToValueAtTime(180,now+0.18);
    og.gain.setValueAtTime(0.18,now);
    og.gain.exponentialRampToValueAtTime(0.001,now+0.18);
    osc.connect(og); og.connect(audioCtx.destination);
    osc.start(now); osc.stop(now+0.2);
  } else if(type==='enemy'){
    // Son ennemi touché: bip court et sec
    const osc=audioCtx.createOscillator();
    const gain=audioCtx.createGain();
    osc.type='square';
    osc.frequency.setValueAtTime(520,now);
    osc.frequency.exponentialRampToValueAtTime(280,now+0.07);
    gain.gain.setValueAtTime(0.2,now);
    gain.gain.exponentialRampToValueAtTime(0.001,now+0.07);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(now); osc.stop(now+0.08);
  } else if(type==='enemyDie'){
    // Son ennemi mort: explosion cartoon
    const buf=audioCtx.createBuffer(1,audioCtx.sampleRate*0.18,audioCtx.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,1.2)*0.9;
    const src=audioCtx.createBufferSource();
    const gain=audioCtx.createGain();
    const filter=audioCtx.createBiquadFilter();
    filter.type='lowpass'; filter.frequency.value=1200;
    src.buffer=buf; gain.gain.setValueAtTime(0.5,now);
    gain.gain.exponentialRampToValueAtTime(0.001,now+0.18);
    src.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
    src.start(now);
    // Tonalité montante victoire mini
    const osc=audioCtx.createOscillator();
    const og=audioCtx.createGain();
    osc.type='triangle';
    osc.frequency.setValueAtTime(300,now);
    osc.frequency.exponentialRampToValueAtTime(650,now+0.15);
    og.gain.setValueAtTime(0.15,now);
    og.gain.exponentialRampToValueAtTime(0.001,now+0.15);
    osc.connect(og); og.connect(audioCtx.destination);
    osc.start(now); osc.stop(now+0.18);
  } else if(type==='boss'){
    // Son boss touché: lourd et grave
    const osc=audioCtx.createOscillator();
    const gain=audioCtx.createGain();
    osc.type='sawtooth';
    osc.frequency.setValueAtTime(220,now);
    osc.frequency.exponentialRampToValueAtTime(80,now+0.2);
    gain.gain.setValueAtTime(0.3,now);
    gain.gain.exponentialRampToValueAtTime(0.001,now+0.2);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(now); osc.stop(now+0.22);
  } else if(type==='coin'){
    // Son pièce ramassée: ding aigu
    const osc=audioCtx.createOscillator();
    const gain=audioCtx.createGain();
    osc.type='triangle';
    osc.frequency.setValueAtTime(880,now);
    osc.frequency.exponentialRampToValueAtTime(1200,now+0.08);
    gain.gain.setValueAtTime(0.18,now);
    gain.gain.exponentialRampToValueAtTime(0.001,now+0.12);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(now); osc.stop(now+0.14);
  } else if(type==='laser'){
    // Son laser tiré: zap électrique
    const osc=audioCtx.createOscillator();
    const gain=audioCtx.createGain();
    const filter=audioCtx.createBiquadFilter();
    filter.type='highpass'; filter.frequency.value=2000;
    osc.type='sawtooth';
    osc.frequency.setValueAtTime(1100,now);
    osc.frequency.exponentialRampToValueAtTime(400,now+0.1);
    gain.gain.setValueAtTime(0.12,now);
    gain.gain.exponentialRampToValueAtTime(0.001,now+0.1);
    osc.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
    osc.start(now); osc.stop(now+0.12);
  } else if(type==='jump'){
    // Son saut: swoosh ascendant
    const osc=audioCtx.createOscillator();
    const gain=audioCtx.createGain();
    osc.type='sine';
    osc.frequency.setValueAtTime(280,now);
    osc.frequency.exponentialRampToValueAtTime(520,now+0.12);
    gain.gain.setValueAtTime(0.12,now);
    gain.gain.exponentialRampToValueAtTime(0.001,now+0.12);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(now); osc.stop(now+0.14);
  }
}

// ═══════════════════════════════════════════
//  BOUCLE PRINCIPALE
// ═══════════════════════════════════════════
function gameLoop(){
  requestAnimationFrame(gameLoop);
  if(G.state!=='playing')return;

  G.frameCount++;G.levelTime++;
  let sx=0,sy2=0;
  if(shakeTimer>0){sx=(Math.random()-.5)*shakeAmt;sy2=(Math.random()-.5)*shakeAmt;shakeTimer--;}

  ctx.save();
  if(sx||sy2)ctx.translate(sx,sy2);

  drawBG();
  for(const pl of LD.platforms)drawPlatform(pl);
  drawPortal();
  for(const c of LD.coins)drawCoin(c);
  for(const pu of LD.powerups)drawPowerup(pu);
  for(const pr of projectiles)drawProjectile(pr);
  for(const e of LD.enemies)drawEnemy(e);
  if(LD.boss)drawBoss(LD.boss);
  drawParticles();
  drawPlayer();
  ctx.restore();

  if(G.frameCount%60===0)updateHUD();

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

// ─── DÉMARRAGE ───
applyCharBonuses(); // Applique Zinaldo par défaut
applyLang();
gameLoop();
updateHUD();
// Démarrer audio au premier clic (politique navigateur)
document.addEventListener('pointerdown', ()=>{ if(!audioCtx) initAudio(); }, {once:true});


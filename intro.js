'use strict';
// ═══════════════════════════════════════════════════════════════
//  QUANTUM RUSH — INTRO CINÉMATIQUE PROCÉDURALE
//  intro.js — Animation canvas avant le lancement du jeu
// ═══════════════════════════════════════════════════════════════

(function () {

  /* ── Overlay DOM ── */
  const overlay = document.createElement('div');
  overlay.id = 'intro-overlay';
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0', zIndex: '9999',
    background: '#000', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
  });

  const cvs = document.createElement('canvas');
  overlay.appendChild(cvs);
  document.body.appendChild(overlay);

  const W = cvs.width  = window.innerWidth;
  const H = cvs.height = window.innerHeight;
  const ctx = cvs.getContext('2d');

  window.addEventListener('resize', () => {
    cvs.width  = window.innerWidth;
    cvs.height = window.innerHeight;
  });

  /* ── Polices ── */
  const FONT_TITLE = "'Fredoka One', cursive";
  const FONT_SUB   = "'Nunito', sans-serif";

  /* ── Durées en frames (60fps) ── */
  const PHASES = {
    BLACK:       { start:   0, end:  30  },   // noir pur
    LOGO_IN:     { start:  30, end: 110  },   // logo entre
    LOGO_HOLD:   { start: 110, end: 200  },   // logo tenu
    STUDIO_IN:   { start: 200, end: 270  },   // "ZinaldoQuantumLab"
    CHARS_IN:    { start: 270, end: 380  },   // personnages défilent
    CHARS_HOLD:  { start: 380, end: 460  },
    TITLE_IN:    { start: 460, end: 560  },   // QUANTUM RUSH
    TITLE_HOLD:  { start: 560, end: 680  },
    FLASH:       { start: 680, end: 710  },   // flash blanc
    FADE_OUT:    { start: 710, end: 760  },   // fondu noir
    DONE:        { start: 760, end: 760  },
  };
  const TOTAL_FRAMES = 760;

  /* ── Particules étoiles ── */
  const stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * 3000,
    y: Math.random() * 2000,
    r: 0.4 + Math.random() * 1.8,
    bri: Math.random(),
    speed: 0.2 + Math.random() * 0.6,
  }));

  /* ── Particules flottantes (débris quantiques) ── */
  const debris = Array.from({ length: 60 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    size: 1 + Math.random() * 3,
    color: ['#00f5ff', '#ff0099', '#ffdd00', '#7700ff', '#00ff88'][Math.floor(Math.random() * 5)],
    alpha: 0.2 + Math.random() * 0.6,
    pulse: Math.random() * Math.PI * 2,
  }));

  /* ── Personnages ── */
  const CHARS = [
    { emoji: '🧬', name: 'ZINALDO',  color: '#00f5ff', role: 'HÉROS QUANTIQUE'   },
    { emoji: '🤖', name: 'ZIBO',     color: '#ff4466', role: 'ROBOT CORROMPU'    },
    { emoji: '🔮', name: 'QUANTARA', color: '#aa00ff', role: 'SORCIÈRE ENNEMIE'  },
    { emoji: '🕷️', name: 'NEBULON',  color: '#0088ff', role: 'ARAIGNÉE COSMIQUE' },
    { emoji: '💀', name: 'VORTEX',   color: '#ff00aa', role: 'BOSS FINAL'        },
  ];

  /* ── Lignes de scan ── */
  let scanY = 0;

  /* ── Ease helpers ── */
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const easeIn  = t => t * t * t;
  const easeInOut = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
  const clamp01 = (v, a, b) => Math.max(0, Math.min(1, (v - a) / (b - a)));

  /* ── Dessin fond étoilé ── */
  function drawStars(f) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    // Nébuleuses de fond
    const nebulas = [
      { x: W * 0.2, y: H * 0.3, r: 200, c: '#7700ff22' },
      { x: W * 0.8, y: H * 0.6, r: 180, c: '#ff009922' },
      { x: W * 0.5, y: H * 0.15, r: 150, c: '#00f5ff18' },
    ];
    nebulas.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, n.c);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    });

    // Étoiles
    stars.forEach((s, i) => {
      const sx = (s.x + f * s.speed * 0.5) % W;
      const sy = (s.y + f * s.speed * 0.2) % H;
      const bri = 0.3 + 0.7 * Math.abs(Math.sin(f * 0.02 + s.bri * 10));
      ctx.globalAlpha = bri;
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(sx, sy, s.r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  /* ── Dessin débris flottants ── */
  function drawDebris(f) {
    debris.forEach(d => {
      d.x = (d.x + d.vx + W) % W;
      d.y = (d.y + d.vy + H) % H;
      const a = d.alpha * (0.5 + 0.5 * Math.sin(f * 0.04 + d.pulse));
      ctx.globalAlpha = a;
      ctx.fillStyle = d.color;
      ctx.shadowColor = d.color;
      ctx.shadowBlur = 6;
      ctx.fillRect(d.x - d.size / 2, d.y - d.size / 2, d.size, d.size);
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }

  /* ── Lignes de scan CRT ── */
  function drawScanlines() {
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    for (let y = 0; y < H; y += 3) {
      ctx.fillRect(0, y, W, 1);
    }
    // Ligne de scan animée
    const scanGrad = ctx.createLinearGradient(0, scanY - 10, 0, scanY + 10);
    scanGrad.addColorStop(0, 'transparent');
    scanGrad.addColorStop(0.5, 'rgba(0,245,255,0.08)');
    scanGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanY - 10, W, 20);
    scanY = (scanY + 2) % H;
  }

  /* ── Logo ZINALDO ── */
  function drawLogo(f, progress) {
    const p = easeOut(progress);
    const cx = W / 2;
    const cy = H / 2 - 60;
    const scale = 0.4 + p * 0.6;
    const alpha = p;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // Halo extérieur
    const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, 180);
    halo.addColorStop(0, '#00f5ff15');
    halo.addColorStop(0.5, '#00f5ff08');
    halo.addColorStop(1, 'transparent');
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(0, 0, 180, 0, Math.PI * 2); ctx.fill();

    // Hexagone néon
    ctx.strokeStyle = '#00f5ff';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#00f5ff';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 6 + f * 0.005;
      if (i === 0) ctx.moveTo(Math.cos(a) * 85, Math.sin(a) * 85);
      else ctx.lineTo(Math.cos(a) * 85, Math.sin(a) * 85);
    }
    ctx.closePath(); ctx.stroke();

    // Anneau rotatif intérieur
    ctx.save();
    ctx.rotate(f * 0.02);
    ctx.strokeStyle = '#ff009966';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#ff0099';
    ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.arc(0, 0, 65, 0, Math.PI * 1.5); ctx.stroke();
    ctx.restore();

    // Emoji atome central
    ctx.font = '52px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#00f5ff';
    ctx.shadowBlur = 15;
    ctx.fillText('⚛', 0, 2);

    ctx.restore();
  }

  /* ── Texte studio ── */
  function drawStudio(progress) {
    const p = easeOut(progress);
    ctx.save();
    ctx.globalAlpha = p;
    ctx.font = `${Math.round(12 + p * 2)}px ${FONT_SUB}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '6px';
    ctx.fillStyle = '#ffffff88';
    ctx.shadowColor = '#00f5ff';
    ctx.shadowBlur = 8;
    ctx.fillText('Z I N A L D O  Q U A N T U M  L A B', W / 2, H / 2 + 60);
    // Ligne décorative
    const lw = p * 280;
    ctx.strokeStyle = '#00f5ff44';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - lw, H / 2 + 75);
    ctx.lineTo(W / 2 + lw, H / 2 + 75);
    ctx.stroke();
    ctx.restore();
  }

  /* ── Défilé personnages ── */
  function drawChars(f, progress) {
    const totalW = CHARS.length * 160;
    const offsetX = W / 2 - totalW / 2 + 80;

    CHARS.forEach((ch, i) => {
      const delay = i / CHARS.length;
      const p = easeOut(clamp01(progress, delay, delay + 0.5));
      if (p <= 0) return;

      const x = offsetX + i * 160;
      const y = H / 2 + 40 + (1 - p) * 60;

      ctx.save();
      ctx.globalAlpha = p;
      ctx.translate(x, y);

      // Halo couleur du personnage
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 55);
      g.addColorStop(0, ch.color + '33');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, 55, 0, Math.PI * 2); ctx.fill();

      // Cercle de fond
      ctx.strokeStyle = ch.color + '88';
      ctx.lineWidth = 2;
      ctx.shadowColor = ch.color;
      ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(0, 0, 38, 0, Math.PI * 2); ctx.stroke();

      // Emoji
      ctx.font = '30px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowBlur = 10;
      ctx.fillText(ch.emoji, 0, 0);

      // Nom
      ctx.font = `bold 9px ${FONT_TITLE}`;
      ctx.fillStyle = ch.color;
      ctx.shadowColor = ch.color;
      ctx.shadowBlur = 6;
      ctx.fillText(ch.name, 0, 52);

      // Rôle
      ctx.globalAlpha = p * 0.6;
      ctx.font = `7px ${FONT_SUB}`;
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 0;
      ctx.fillText(ch.role, 0, 64);

      ctx.restore();
    });
  }

  /* ── QUANTUM RUSH titre principal ── */
  function drawMainTitle(f, progress) {
    const p = easeOut(progress);
    if (p <= 0) return;

    ctx.save();
    const cy = H / 2 - 80;
    const scale = 0.7 + p * 0.3;

    ctx.globalAlpha = p;
    ctx.translate(W / 2, cy);
    ctx.scale(scale, scale);

    // Ombre portée
    ctx.font = `bold clamp(48px,10vw,96px) ${FONT_TITLE}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Halo énorme
    const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, 260);
    halo.addColorStop(0, '#00f5ff18');
    halo.addColorStop(1, 'transparent');
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(0, 0, 260, 0, Math.PI * 2); ctx.fill();

    // Texte QUANTUM
    const fs = Math.max(48, Math.min(96, window.innerWidth * 0.1));
    ctx.font = `${fs}px ${FONT_TITLE}`;

    // Effet glitch léger
    const glitch = Math.sin(f * 0.3) > 0.92;
    if (glitch) {
      ctx.fillStyle = '#ff0099cc';
      ctx.fillText('QUANTUM', -2, -2);
    }

    ctx.fillStyle = '#00f5ff';
    ctx.shadowColor = '#00f5ff';
    ctx.shadowBlur = 30;
    ctx.fillText('QUANTUM', 0, -fs * 0.55);

    // Texte RUSH
    ctx.fillStyle = '#ff0099';
    ctx.shadowColor = '#ff0099';
    ctx.shadowBlur = 30;
    ctx.fillText('RUSH', 0, fs * 0.55);

    // Ligne entre les deux mots
    ctx.strokeStyle = '#ffdd0066';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 0;
    const lw2 = p * 220;
    ctx.beginPath();
    ctx.moveTo(-lw2, 0); ctx.lineTo(lw2, 0);
    ctx.stroke();

    ctx.restore();

    // Sous-titre "v5.0"
    ctx.save();
    ctx.globalAlpha = p * 0.7;
    ctx.font = `13px ${FONT_SUB}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff55';
    ctx.letterSpacing = '4px';
    ctx.fillText('V 5 . 0  —  A R C A D E  Q U A N T I Q U E', W / 2, H / 2 - 10);
    ctx.restore();
  }

  /* ── Particules d'explosion au moment du titre ── */
  const burstParticles = [];
  let burstDone = false;
  function spawnBurst() {
    for (let i = 0; i < 80; i++) {
      const a = Math.random() * Math.PI * 2;
      const spd = 3 + Math.random() * 8;
      burstParticles.push({
        x: W / 2, y: H / 2 - 60,
        vx: Math.cos(a) * spd, vy: Math.sin(a) * spd - 2,
        life: 1, decay: 0.015 + Math.random() * 0.02,
        size: 2 + Math.random() * 5,
        color: ['#00f5ff', '#ff0099', '#ffdd00', '#aa00ff', '#ffffff'][Math.floor(Math.random() * 5)],
        gravity: 0.08,
      });
    }
  }
  function drawBurst() {
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const p = burstParticles[i];
      p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.vx *= 0.97;
      p.life -= p.decay;
      if (p.life <= 0) { burstParticles.splice(i, 1); continue; }
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }

  /* ── Bouton SKIP ── */
  const skipBtn = document.createElement('button');
  skipBtn.textContent = 'SKIP ▶';
  Object.assign(skipBtn.style, {
    position: 'absolute', bottom: '24px', right: '24px',
    background: 'rgba(255,255,255,0.06)',
    border: '2px solid rgba(255,255,255,0.2)',
    borderRadius: '20px', padding: '8px 20px',
    color: 'rgba(255,255,255,0.4)', fontSize: '12px',
    fontFamily: FONT_TITLE, cursor: 'pointer',
    letterSpacing: '2px', zIndex: '10000',
    transition: 'all 0.2s',
  });
  skipBtn.onmouseover = () => skipBtn.style.color = '#fff';
  skipBtn.onmouseout  = () => skipBtn.style.color = 'rgba(255,255,255,0.4)';
  skipBtn.onclick = () => finishIntro();
  overlay.appendChild(skipBtn);

  /* ── Compteur "APPUYEZ POUR COMMENCER" ── */
  function drawPressStart(f, alpha) {
    if (alpha <= 0) return;
    const blink = Math.abs(Math.sin(f * 0.06));
    ctx.save();
    ctx.globalAlpha = alpha * blink;
    ctx.font = `14px ${FONT_TITLE}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffdd00';
    ctx.shadowColor = '#ffdd00';
    ctx.shadowBlur = 12;
    ctx.letterSpacing = '4px';
    ctx.fillText('APPUYEZ POUR COMMENCER', W / 2, H - 50);
    ctx.restore();
  }

  /* ── Fin de l'intro ── */
  function finishIntro() {
    overlay.style.transition = 'opacity 0.5s';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.remove();
      // Déclencher le jeu si la fonction existe
      if (typeof applyCharBonuses === 'function') applyCharBonuses();
    }, 500);
  }

  // Clic/touche pour passer après titre affiché
  let titleShown = false;
  cvs.addEventListener('pointerdown', () => { if (titleShown) finishIntro(); });
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); if (titleShown) finishIntro(); }
  });

  /* ── Boucle principale ── */
  let frame = 0;
  let rafId;

  function loop() {
    const W2 = cvs.width  = window.innerWidth;
    const H2 = cvs.height = window.innerHeight;

    // Fond étoilé
    drawStars(frame);
    drawDebris(frame);
    drawScanlines();

    // ── Phase: Noir initial
    if (frame < PHASES.BLACK.end) {
      const t = clamp01(frame, 0, 30);
      ctx.fillStyle = `rgba(0,0,0,${1 - t})`;
      ctx.fillRect(0, 0, W2, H2);
    }

    // ── Phase: Logo
    if (frame >= PHASES.LOGO_IN.start) {
      const p = clamp01(frame, PHASES.LOGO_IN.start, PHASES.LOGO_IN.end);
      drawLogo(frame, p);
    }
    if (frame >= PHASES.LOGO_HOLD.start && frame < PHASES.CHARS_IN.start) {
      drawLogo(frame, 1);
    }

    // ── Phase: Studio
    if (frame >= PHASES.STUDIO_IN.start) {
      const p = clamp01(frame, PHASES.STUDIO_IN.start, PHASES.STUDIO_IN.end);
      drawLogo(frame, 1);
      drawStudio(p);
    }
    if (frame >= PHASES.STUDIO_IN.end && frame < PHASES.TITLE_IN.start) {
      drawLogo(frame, 1);
      drawStudio(1);
    }

    // ── Phase: Personnages
    if (frame >= PHASES.CHARS_IN.start && frame < PHASES.TITLE_IN.start) {
      const p = clamp01(frame, PHASES.CHARS_IN.start, PHASES.CHARS_IN.end);
      drawChars(frame, p);
    }

    // ── Phase: Titre principal (remplace logo + personnages)
    if (frame >= PHASES.TITLE_IN.start) {
      // Burst au début
      if (!burstDone && frame === PHASES.TITLE_IN.start) {
        spawnBurst();
        burstDone = true;
      }
      drawBurst();

      const p = clamp01(frame, PHASES.TITLE_IN.start, PHASES.TITLE_IN.end);
      drawMainTitle(frame, p);

      if (frame >= PHASES.TITLE_HOLD.start) {
        titleShown = true;
        const pressP = clamp01(frame, PHASES.TITLE_HOLD.start, PHASES.TITLE_HOLD.start + 60);
        drawPressStart(frame, pressP);
      }
    }

    // ── Phase: Flash blanc
    if (frame >= PHASES.FLASH.start && frame < PHASES.FADE_OUT.start) {
      const p = clamp01(frame, PHASES.FLASH.start, PHASES.FLASH.end);
      const flashAlpha = Math.sin(p * Math.PI) * 0.85;
      ctx.fillStyle = `rgba(255,255,255,${flashAlpha})`;
      ctx.fillRect(0, 0, W2, H2);
    }

    // ── Phase: Fondu final
    if (frame >= PHASES.FADE_OUT.start) {
      const p = clamp01(frame, PHASES.FADE_OUT.start, PHASES.FADE_OUT.end);
      ctx.fillStyle = `rgba(0,0,0,${easeIn(p)})`;
      ctx.fillRect(0, 0, W2, H2);
    }

    // ── Fin automatique
    if (frame >= TOTAL_FRAMES) {
      finishIntro();
      return;
    }

    frame++;
    rafId = requestAnimationFrame(loop);
  }

  loop();

})();

import React, { useEffect, useRef } from 'react';
import { useThemeStore, type HomeThemeId } from '../../store/themeStore';

interface SkyLantern {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  vy: number;
  sway: number;
  swaySpeed: number;
  swayWidth: number;
  alpha: number;
  flameIntensity: number;
  flickerSpeed: number;
}

interface BokehOrb {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
}

interface GlowingEmber {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  life: number;
}

interface GoldenSparkle {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  alpha: number;
  phase: number;
  speed: number;
}

const THEME_PALETTES: Record<HomeThemeId, {
  lanterns: string[];
  bokeh: string[];
  sparklePrimary: string;
  sparkleGlow: string;
  emberGold: string;
  emberAlt: string;
}> = {
  'royal-ivory': {
    lanterns: [
      'rgba(245, 158, 11, ', // Golden Amber
      'rgba(249, 115, 22, ', // Warm Saffron
      'rgba(217, 119, 6, ',  // Ochre Gold
      'rgba(234, 88, 12, ',  // Deep Orange
      'rgba(251, 191, 36, ', // Bright Gold
    ],
    bokeh: [
      'rgba(245, 158, 11, ',
      'rgba(251, 191, 36, ',
      'rgba(249, 115, 22, ',
      'rgba(217, 119, 6, ',
      'rgba(253, 230, 138, ',
    ],
    sparklePrimary: 'rgba(245, 158, 11, ',
    sparkleGlow: 'rgba(251, 191, 36, 0.7)',
    emberGold: 'rgba(251, 191, 36, ',
    emberAlt: 'rgba(245, 158, 11, ',
  },
  'midnight-navy': {
    lanterns: [
      'rgba(251, 191, 36, ', // Gold
      'rgba(96, 165, 250, ',  // Sky Sapphire
      'rgba(245, 158, 11, ', // Amber
      'rgba(147, 197, 253, ', // Ice Blue
      'rgba(217, 119, 6, ',  // Ochre
    ],
    bokeh: [
      'rgba(59, 130, 246, ',
      'rgba(251, 191, 36, ',
      'rgba(99, 102, 241, ',
      'rgba(245, 158, 11, ',
      'rgba(147, 197, 253, ',
    ],
    sparklePrimary: 'rgba(251, 191, 36, ',
    sparkleGlow: 'rgba(96, 165, 250, 0.8)',
    emberGold: 'rgba(253, 224, 71, ',
    emberAlt: 'rgba(96, 165, 250, ',
  },
  'festive-crimson': {
    lanterns: [
      'rgba(220, 38, 38, ',  // Kumkum Crimson
      'rgba(249, 115, 22, ', // Saffron
      'rgba(234, 88, 12, ',  // Deep Orange
      'rgba(245, 158, 11, ', // Golden Amber
      'rgba(185, 28, 28, ',  // Rich Maroon
    ],
    bokeh: [
      'rgba(220, 38, 38, ',
      'rgba(249, 115, 22, ',
      'rgba(245, 158, 11, ',
      'rgba(234, 88, 12, ',
      'rgba(251, 191, 36, ',
    ],
    sparklePrimary: 'rgba(249, 115, 22, ',
    sparkleGlow: 'rgba(234, 88, 12, 0.8)',
    emberGold: 'rgba(251, 191, 36, ',
    emberAlt: 'rgba(239, 68, 68, ',
  },
  'pearl-studio': {
    lanterns: [
      'rgba(244, 63, 94, ',  // Rose Pink
      'rgba(251, 146, 60, ', // Peach
      'rgba(244, 114, 182, ', // Soft Rose
      'rgba(245, 158, 11, ', // Gold
      'rgba(253, 164, 175, ', // Pastel Rose
    ],
    bokeh: [
      'rgba(244, 63, 94, ',
      'rgba(251, 146, 60, ',
      'rgba(244, 114, 182, ',
      'rgba(253, 230, 138, ',
      'rgba(254, 205, 211, ',
    ],
    sparklePrimary: 'rgba(244, 63, 94, ',
    sparkleGlow: 'rgba(244, 114, 182, 0.7)',
    emberGold: 'rgba(251, 191, 36, ',
    emberAlt: 'rgba(244, 63, 94, ',
  },
};

export const AnimatedBackground: React.FC = () => {
  const currentThemeId = useThemeStore((state) => state.currentThemeId);
  const theme = useThemeStore((state) => state.theme);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<HomeThemeId>(currentThemeId);

  useEffect(() => {
    themeRef.current = currentThemeId;
  }, [currentThemeId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const getColors = () => THEME_PALETTES[themeRef.current] || THEME_PALETTES['royal-ivory'];

    // 1. Floating Sky Lanterns
    const lanternCount = Math.min(width > 768 ? 16 : 8, 20);

    const createLantern = (initialY?: number): SkyLantern => {
      const palette = getColors();
      const scale = Math.random() * 0.6 + 0.65;
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * (height + 100),
        width: 24 * scale,
        height: 32 * scale,
        color: palette.lanterns[Math.floor(Math.random() * palette.lanterns.length)],
        vy: -(Math.random() * 0.45 + 0.35) * scale,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.015 + 0.008,
        swayWidth: Math.random() * 22 + 12,
        alpha: Math.random() * 0.35 + 0.6,
        flameIntensity: Math.random(),
        flickerSpeed: Math.random() * 0.08 + 0.04,
      };
    };

    const lanterns: SkyLantern[] = Array.from({ length: lanternCount }, () => createLantern());

    // 2. Soft Glowing Bokeh Orbs
    const bokehCount = Math.min(width > 768 ? 24 : 12, 30);
    const bokehOrbs: BokehOrb[] = Array.from({ length: bokehCount }, () => {
      const palette = getColors();
      const baseAlpha = Math.random() * 0.14 + 0.06;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 32 + 16,
        color: palette.bokeh[Math.floor(Math.random() * palette.bokeh.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.3 - 0.1,
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      };
    });

    // 3. Floating Diya Sparks & Embers
    let embers: GlowingEmber[] = [];

    const spawnEmber = (x: number, y: number) => {
      const palette = getColors();
      embers.push({
        x,
        y,
        radius: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.4 ? palette.emberGold : palette.emberAlt,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 1.2 - 0.5,
        alpha: Math.random() * 0.5 + 0.5,
        decay: Math.random() * 0.015 + 0.008,
        life: 1,
      });
    };

    // 4. Twinkling 4-Point Golden Sparkle Stars
    const sparkleCount = Math.min(width > 768 ? 14 : 7, 18);
    const sparkles: GoldenSparkle[] = Array.from({ length: sparkleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 7 + 5,
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.01,
      alpha: Math.random() * 0.4 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.025 + 0.015,
    }));

    // Interactive Click to Release a Sky Lantern!
    const handleCanvasClick = (e: MouseEvent) => {
      const palette = getColors();
      const newLantern: SkyLantern = {
        x: e.clientX,
        y: e.clientY,
        width: 32,
        height: 42,
        color: palette.lanterns[Math.floor(Math.random() * palette.lanterns.length)],
        vy: -(Math.random() * 0.8 + 0.6),
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.02,
        swayWidth: 25,
        alpha: 0.95,
        flameIntensity: 1,
        flickerSpeed: 0.08,
      };
      lanterns.push(newLantern);

      for (let i = 0; i < 18; i++) {
        spawnEmber(e.clientX + (Math.random() - 0.5) * 20, e.clientY + (Math.random() - 0.5) * 20);
      }
    };

    window.addEventListener('click', handleCanvasClick);

    // Helper: Draw Single Floating Sky Lantern
    const drawLantern = (lantern: SkyLantern) => {
      const { x, y, width: w, height: h, color, flameIntensity, alpha } = lantern;
      ctx.save();
      ctx.translate(x, y);

      const glowRadius = Math.max(w, h) * 2.2;
      const radialGlow = ctx.createRadialGradient(0, h * 0.2, w * 0.1, 0, h * 0.2, glowRadius);
      radialGlow.addColorStop(0, `rgba(251, 191, 36, ${0.4 * alpha})`);
      radialGlow.addColorStop(0.4, `rgba(245, 158, 11, ${0.18 * alpha})`);
      radialGlow.addColorStop(1, 'rgba(234, 88, 12, 0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(0, h * 0.2, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-w * 0.42, -h * 0.5);
      ctx.lineTo(w * 0.42, -h * 0.5);
      ctx.lineTo(w * 0.5, h * 0.4);
      ctx.lineTo(-w * 0.5, h * 0.4);
      ctx.closePath();

      const paperGrad = ctx.createLinearGradient(0, -h * 0.5, 0, h * 0.45);
      paperGrad.addColorStop(0, `${color}${0.55 * alpha})`);
      paperGrad.addColorStop(0.5, `rgba(249, 115, 22, ${0.75 * alpha})`);
      paperGrad.addColorStop(0.9, `rgba(254, 240, 138, ${0.9 * alpha})`);
      paperGrad.addColorStop(1, `rgba(251, 191, 36, ${0.85 * alpha})`);
      ctx.fillStyle = paperGrad;
      ctx.shadowColor = 'rgba(245, 158, 11, 0.7)';
      ctx.shadowBlur = 14;
      ctx.fill();

      ctx.strokeStyle = `rgba(217, 119, 6, ${0.45 * alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-w * 0.18, -h * 0.48);
      ctx.lineTo(-w * 0.22, h * 0.38);
      ctx.moveTo(w * 0.18, -h * 0.48);
      ctx.lineTo(w * 0.22, h * 0.38);
      ctx.stroke();

      const flameFlicker = Math.sin(tick * lantern.flickerSpeed + lantern.sway) * 0.15;
      const flameSize = w * 0.26 * (1 + flameFlicker * flameIntensity);
      const flameY = h * 0.22;

      const flameGrad = ctx.createRadialGradient(0, flameY, 0, 0, flameY, flameSize * 1.8);
      flameGrad.addColorStop(0, `rgba(255, 255, 255, ${0.98 * alpha})`);
      flameGrad.addColorStop(0.35, `rgba(253, 224, 71, ${0.9 * alpha})`);
      flameGrad.addColorStop(0.7, `rgba(249, 115, 22, ${0.65 * alpha})`);
      flameGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');
      ctx.fillStyle = flameGrad;
      ctx.beginPath();
      ctx.arc(0, flameY, flameSize * 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(0, h * 0.4, w * 0.32, h * 0.08, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 83, 9, ${0.7 * alpha})`;
      ctx.fill();

      ctx.restore();
    };

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      const palette = getColors();

      // 1. Draw Bokeh Orbs
      bokehOrbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        orb.alpha = orb.baseAlpha + Math.sin(tick * orb.pulseSpeed) * 0.04;

        if (orb.y < -orb.radius * 2) {
          orb.y = height + orb.radius * 2;
          orb.x = Math.random() * width;
        }
        if (orb.x < -orb.radius * 2) orb.x = width + orb.radius * 2;
        if (orb.x > width + orb.radius * 2) orb.x = -orb.radius * 2;

        ctx.save();
        const bokehGrad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        bokehGrad.addColorStop(0, `${orb.color}${Math.max(0.02, orb.alpha)})`);
        bokehGrad.addColorStop(0.6, `${orb.color}${Math.max(0.01, orb.alpha * 0.4)})`);
        bokehGrad.addColorStop(1, `${orb.color}0)`);
        ctx.fillStyle = bokehGrad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 2. Interactive Mouse Halo
      if (mouseX > 0 && mouseY > 0) {
        const mouseHalo = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 150);
        mouseHalo.addColorStop(0, 'rgba(251, 191, 36, 0.12)');
        mouseHalo.addColorStop(0.5, 'rgba(249, 115, 22, 0.05)');
        mouseHalo.addColorStop(1, 'rgba(249, 115, 22, 0)');
        ctx.fillStyle = mouseHalo;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 150, 0, Math.PI * 2);
        ctx.fill();

        if (tick % 6 === 0) {
          spawnEmber(mouseX + (Math.random() - 0.5) * 30, mouseY + (Math.random() - 0.5) * 30);
        }
      }

      // 3. Draw Floating Sky Lanterns
      lanterns.forEach((lantern, idx) => {
        lantern.sway += lantern.swaySpeed;
        lantern.y += lantern.vy;
        lantern.x += Math.sin(lantern.sway) * 0.45;

        if (tick % 18 === 0 && Math.random() > 0.4) {
          spawnEmber(lantern.x + (Math.random() - 0.5) * lantern.width * 0.5, lantern.y - lantern.height * 0.5);
        }

        if (lantern.y < -lantern.height * 2) {
          if (lanterns.length > lanternCount) {
            lanterns.splice(idx, 1);
            return;
          }
          lantern.y = height + lantern.height * 1.5;
          lantern.x = Math.random() * width;
        }

        drawLantern(lantern);
      });

      // 4. Draw Floating Embers
      for (let i = embers.length - 1; i >= 0; i--) {
        const emb = embers[i];
        emb.x += emb.vx;
        emb.y += emb.vy;
        emb.life -= emb.decay;

        if (emb.life <= 0 || emb.y < -10) {
          embers.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(emb.x, emb.y, emb.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${emb.color}${Math.max(0, emb.alpha * emb.life)})`;
        ctx.shadowColor = palette.sparkleGlow;
        ctx.shadowBlur = emb.radius * 3;
        ctx.fill();
        ctx.restore();
      }

      // 5. Draw Twinkling Sparkle Stars
      sparkles.forEach((st) => {
        st.phase += st.speed;
        st.rotation += st.rotSpeed;

        const currentAlpha = Math.max(0.05, Math.min(0.8, st.alpha + Math.sin(st.phase) * 0.35));

        ctx.save();
        ctx.translate(st.x, st.y);
        ctx.rotate(st.rotation);
        ctx.fillStyle = `${palette.sparklePrimary}${currentAlpha})`;
        ctx.shadowColor = palette.sparkleGlow;
        ctx.shadowBlur = st.size * 2;

        const s = st.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(s * 0.15, -s * 0.15, s, 0);
        ctx.quadraticCurveTo(s * 0.15, s * 0.15, 0, s);
        ctx.quadraticCurveTo(-s * 0.15, s * 0.15, -s, 0);
        ctx.quadraticCurveTo(-s * 0.15, -s * 0.15, 0, -s);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, s * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.9})`;
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-700">
      {/* 1. Theme-Aware Ambient Sunset / Celestial Gradient Base */}
      {currentThemeId === 'royal-ivory' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#fffdfa] via-[#faf5eb] to-[#f4ece1] transition-opacity duration-700" />
      )}
      {currentThemeId === 'midnight-navy' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#060913] via-[#090e1d] to-[#0f172a] transition-opacity duration-700" />
      )}
      {currentThemeId === 'festive-crimson' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1c0408] via-[#26060c] to-[#380a13] transition-opacity duration-700" />
      )}
      {currentThemeId === 'pearl-studio' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#fbf7f5] to-[#f4ebe6] transition-opacity duration-700" />
      )}

      {/* 2. Ambient Glowing Orbs */}
      <div
        className="absolute -top-32 left-1/4 w-[680px] h-[680px] rounded-full blur-[140px] animate-glow-pulse pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: theme.canvasGlow1 }}
      />
      <div
        className="absolute top-1/3 -right-20 w-[620px] h-[620px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: theme.canvasGlow2 }}
      />
      <div
        className="absolute bottom-10 left-10 w-[580px] h-[580px] rounded-full blur-[120px] pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: theme.canvasGlow3 }}
      />

      {/* 3. Subtle Dot Mandala Mesh */}
      <div
        className="absolute inset-0 [background-size:36px_36px] transition-opacity duration-700"
        style={{
          backgroundImage: `radial-gradient(${theme.dotColor} 1px, transparent 1px)`,
          opacity: currentThemeId === 'midnight-navy' ? 0.1 : currentThemeId === 'festive-crimson' ? 0.08 : 0.05,
        }}
      />

      {/* 4. Canvas for Rising Sky Lanterns, Bokeh Orbs & Diya Embers */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
};

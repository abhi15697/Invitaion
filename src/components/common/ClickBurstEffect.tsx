import React, { useEffect, useState } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotSpeed: number;
  symbol: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const PARTICLE_SYMBOLS = ['✦', '✨', '•', '★', '◆', '✺'];

export const ClickBurstEffect: React.FC = () => {
  const currentThemeId = useThemeStore((state) => state.currentThemeId);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    let particleId = 0;
    let rippleId = 0;

    const handleClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      // Palette based on theme
      const colors = currentThemeId === 'midnight-navy'
        ? ['#fbbf24', '#60a5fa', '#f59e0b', '#93c5fd', '#ffffff']
        : currentThemeId === 'festive-crimson'
        ? ['#f97316', '#dc2626', '#fbbf24', '#ef4444', '#fef08a']
        : currentThemeId === 'pearl-studio'
        ? ['#f43f5e', '#fb923c', '#fb7185', '#f59e0b', '#fda4af']
        : ['#f59e0b', '#ea580c', '#fbbf24', '#dc2626', '#fef08a'];

      const rippleColor = colors[0];

      // 1. Add Ripple Shockwave
      const newRippleId = ++rippleId;
      setRipples((prev) => [
        ...prev.slice(-8),
        {
          id: newRippleId,
          x: clickX,
          y: clickY,
          color: rippleColor,
          size: Math.random() * 20 + 60,
        },
      ]);

      // 2. Add Burst of Golden / Festive Particles
      const particleCount = 10;
      const newParticles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 5 + 3.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const symbol = PARTICLE_SYMBOLS[Math.floor(Math.random() * PARTICLE_SYMBOLS.length)];

        newParticles.push({
          id: ++particleId,
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5, // gentle upwards bias
          size: Math.random() * 12 + 10,
          color,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 20,
          symbol,
        });
      }

      setParticles((prev) => [...prev.slice(-30), ...newParticles]);
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [currentThemeId]);

  // Clean up ripples after animation
  const handleRippleComplete = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  const handleParticleComplete = (id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Shockwave Expanding Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={`ripple-${ripple.id}`}
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            onAnimationComplete={() => handleRippleComplete(ripple.id)}
            className="absolute rounded-full border-2"
            style={{
              left: ripple.x - ripple.size / 2,
              top: ripple.y - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              borderColor: ripple.color,
              boxShadow: `0 0 20px ${ripple.color}60`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Exploding Micro-Sparkle Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={`particle-${p.id}`}
            initial={{
              x: p.x,
              y: p.y,
              opacity: 1,
              scale: 0.6,
              rotate: p.rotation,
            }}
            animate={{
              x: p.x + p.vx * 16,
              y: p.y + p.vy * 16 + 20, // gravity fall
              opacity: 0,
              scale: [0.6, 1.3, 0],
              rotate: p.rotation + p.rotSpeed * 15,
            }}
            transition={{
              duration: 0.75,
              ease: [0.25, 1, 0.5, 1],
            }}
            onAnimationComplete={() => handleParticleComplete(p.id)}
            className="absolute select-none font-serif leading-none"
            style={{
              color: p.color,
              fontSize: `${p.size}px`,
              textShadow: `0 0 8px ${p.color}`,
            }}
          >
            {p.symbol}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

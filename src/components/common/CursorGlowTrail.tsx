import React, { useEffect, useState, useRef } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  char: string;
}

const TRAIL_CHARS = ['✦', '✨', '•', '⋆'];

export const CursorGlowTrail: React.FC = () => {
  const currentThemeId = useThemeStore((state) => state.currentThemeId);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<TrailSparkle[]>([]);
  const trailIdRef = useRef(0);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const colors = currentThemeId === 'midnight-navy'
      ? ['#60a5fa', '#fbbf24', '#93c5fd']
      : currentThemeId === 'festive-crimson'
      ? ['#f97316', '#fbbf24', '#ef4444']
      : currentThemeId === 'pearl-studio'
      ? ['#f43f5e', '#fb7185', '#f59e0b']
      : ['#f59e0b', '#fbbf24', '#ea580c'];

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest('button, a, input, select, textarea, [role="button"], .interactive-element, .glass-card');
        setIsPointer(isInteractive);
      }

      // Spawn subtle stardust trail every 65ms on mouse move
      if (now - lastSpawnRef.current > 65) {
        lastSpawnRef.current = now;
        const newSparkle: TrailSparkle = {
          id: ++trailIdRef.current,
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          size: Math.random() * 8 + 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          char: TRAIL_CHARS[Math.floor(Math.random() * TRAIL_CHARS.length)],
        };

        setTrail((prev) => [...prev.slice(-12), newSparkle]);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, currentThemeId]);

  const handleSparkleComplete = (id: number) => {
    setTrail((prev) => prev.filter((s) => s.id !== id));
  };

  if (!isVisible) return null;

  const glowColor = currentThemeId === 'midnight-navy'
    ? 'rgba(96, 165, 250, 0.22)'
    : currentThemeId === 'festive-crimson'
    ? 'rgba(249, 115, 22, 0.22)'
    : currentThemeId === 'pearl-studio'
    ? 'rgba(244, 63, 94, 0.18)'
    : 'rgba(245, 158, 11, 0.22)';

  const ringColor = currentThemeId === 'midnight-navy'
    ? 'rgba(251, 191, 36, 0.5)'
    : currentThemeId === 'festive-crimson'
    ? 'rgba(234, 88, 12, 0.5)'
    : currentThemeId === 'pearl-studio'
    ? 'rgba(244, 63, 94, 0.45)'
    : 'rgba(245, 158, 11, 0.5)';

  return (
    <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden">
      {/* 1. Ambient Soft Halo Light Follower */}
      <motion.div
        animate={{
          x: mousePos.x - 120,
          y: mousePos.y - 120,
          scale: isPointer ? 1.35 : 1,
          opacity: isPointer ? 0.9 : 0.6,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 280,
          mass: 0.2,
        }}
        className="absolute w-[240px] h-[240px] rounded-full blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* 2. Magnetic Crisp Focus Ring */}
      <motion.div
        animate={{
          x: mousePos.x - (isPointer ? 24 : 12),
          y: mousePos.y - (isPointer ? 24 : 12),
          width: isPointer ? 48 : 24,
          height: isPointer ? 48 : 24,
          borderColor: ringColor,
          opacity: isPointer ? 1 : 0.4,
          scale: isPointer ? 1.15 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 24,
          stiffness: 400,
          mass: 0.15,
        }}
        className="absolute rounded-full border border-dashed pointer-events-none"
        style={{
          boxShadow: isPointer ? `0 0 12px ${ringColor}` : 'none',
        }}
      />

      {/* 3. Floating Stardust Trail Sparks */}
      <AnimatePresence>
        {trail.map((s) => (
          <motion.div
            key={`stardust-${s.id}`}
            initial={{
              x: s.x,
              y: s.y,
              opacity: 0.9,
              scale: 0.6,
              rotate: 0,
            }}
            animate={{
              y: s.y - 18,
              opacity: 0,
              scale: [0.6, 1.2, 0],
              rotate: 45,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
            onAnimationComplete={() => handleSparkleComplete(s.id)}
            className="absolute select-none font-serif leading-none"
            style={{
              color: s.color,
              fontSize: `${s.size}px`,
              textShadow: `0 0 6px ${s.color}`,
            }}
          >
            {s.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

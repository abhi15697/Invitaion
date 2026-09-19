import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Interactive3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  scale?: number;
  showMandalaAura?: boolean;
}

export const Interactive3DTilt: React.FC<Interactive3DTiltProps> = ({
  children,
  className = '',
  maxTilt = 10,
  glareOpacity = 0.45,
  scale = 1.03,
  showMandalaAura = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 2 - 1; // -1 to 1
    const percentY = (y / rect.height) * 2 - 1; // -1 to 1

    setRotateX(-percentY * maxTilt);
    setRotateY(percentX * maxTilt);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 relative ${className}`}
    >
      {/* 1. Auspicious Rotating Mandala Aura & Golden Sunbeams on Hover */}
      {showMandalaAura && (
        <motion.div
          animate={{
            opacity: isHovered ? 0.7 : 0,
            scale: isHovered ? 1.15 : 0.85,
            rotate: isHovered ? 180 : 0,
          }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
          }}
          className="absolute -inset-6 rounded-[40px] pointer-events-none z-0 blur-xl opacity-0 transition-opacity"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(249, 115, 22, 0.25) 50%, rgba(220, 38, 38, 0) 80%)',
          }}
        />
      )}

      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? scale : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 350,
          damping: 25,
          mass: 0.5,
        }}
        className="transform-style-3d relative w-full h-full z-10"
      >
        {children}

        {/* 2. Prismatic Holographic Foil Light Reflection */}
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-30 mix-blend-overlay overflow-hidden"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: `radial-gradient(circle 340px at ${glarePos.x}% ${glarePos.y}%, 
              rgba(255, 255, 255, 0.7) 0%, 
              rgba(254, 240, 138, 0.5) 20%, 
              rgba(244, 114, 182, 0.3) 45%, 
              rgba(147, 197, 253, 0.25) 65%, 
              transparent 85%)`,
          }}
        />

        {/* 3. Subtle Holographic Rainbow Diagonal Streak */}
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-500 z-30 opacity-0 group-hover:opacity-30"
          style={{
            background: `linear-gradient(${115 + (glarePos.x - 50) * 0.4}deg, 
              transparent 30%, 
              rgba(251, 191, 36, 0.4) 45%, 
              rgba(244, 63, 94, 0.35) 50%, 
              rgba(96, 165, 250, 0.35) 55%, 
              transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  );
};

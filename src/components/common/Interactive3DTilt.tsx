import React from 'react';

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
}) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};


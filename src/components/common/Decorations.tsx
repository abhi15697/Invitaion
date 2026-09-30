import React from 'react';

interface DecorationProps {
  color?: string;
  className?: string;
}

export const OrnateDivider: React.FC<DecorationProps> = ({ color = '#d97706', className = '' }) => (
  <div className={`flex items-center justify-center space-x-3 my-3 opacity-90 ${className}`}>
    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-current to-transparent" style={{ color }} />
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill={color}>
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-current to-transparent" style={{ color }} />
  </div>
);

export const FloralCorner: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br'; color?: string }> = ({
  position,
  color = '#d97706',
}) => {
  const rotation = {
    tl: 'rotate-0',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90',
  }[position];

  return (
    <div className={`absolute w-24 h-24 pointer-events-none ${rotation} ${
      position === 'tl' ? 'top-2 left-2' :
      position === 'tr' ? 'top-2 right-2' :
      position === 'br' ? 'bottom-2 right-2' : 'bottom-2 left-2'
    }`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full opacity-80" stroke={color}>
        <path d="M5,5 C35,5 65,15 95,5 C95,35 85,65 95,95 C65,85 35,95 5,95 C15,65 5,35 5,5 Z" strokeWidth="0.8" />
        <path d="M15,15 C40,20 60,40 65,65" strokeWidth="1" strokeLinecap="round" />
        <path d="M15,15 C20,40 40,60 65,65" strokeWidth="1" strokeLinecap="round" />
        <circle cx="25" cy="25" r="4" fill={color} />
        <circle cx="45" cy="18" r="3" fill={color} />
        <circle cx="18" cy="45" r="3" fill={color} />
      </svg>
    </div>
  );
};

export const RoyalCrestCorner: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br'; color?: string }> = ({
  position,
  color = '#d97706',
}) => {
  const rotation = {
    tl: 'rotate-0',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90',
  }[position];

  return (
    <div className={`absolute w-20 h-20 pointer-events-none ${rotation} ${
      position === 'tl' ? 'top-3 left-3' :
      position === 'tr' ? 'top-3 right-3' :
      position === 'br' ? 'bottom-3 right-3' : 'bottom-3 left-3'
    }`}>
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full opacity-85" stroke={color}>
        <path d="M4 4 H36 M4 4 V36" strokeWidth="2.5" />
        <path d="M10 10 H28 M10 10 V28" strokeWidth="1" />
        <path d="M4 4 L28 28" strokeWidth="1" />
        <circle cx="10" cy="10" r="2.5" fill={color} />
        <path d="M28 4 C28 16 16 28 4 28" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

export const PeacockCorner: React.FC<{
  position: 'tl' | 'tr' | 'bl' | 'br';
  color?: string;
  size?: number;
}> = ({ position, color = '#f59e0b', size = 115 }) => {
  const isRight = position === 'tr' || position === 'br';
  const isBottom = position === 'bl' || position === 'br';

  return (
    <div
      className={`absolute pointer-events-none z-20 ${
        position === 'tl'
          ? 'top-2 left-2'
          : position === 'tr'
          ? 'top-2 right-2'
          : position === 'bl'
          ? 'bottom-2 left-2'
          : 'bottom-2 right-2'
      }`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `${isRight ? 'scaleX(-1)' : ''} ${isBottom ? 'scaleY(-1)' : ''}`,
      }}
    >
      <svg
        viewBox="0 0 140 140"
        fill="none"
        className="w-full h-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
      >
        <defs>
          <linearGradient id={`goldGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#fde047" />
            <stop offset="60%" stopColor={color} />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <linearGradient id={`goldLustre-${position}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* Outer Corner Filigree Frame Brackets */}
        <path
          d="M 6 6 L 68 6 M 6 6 L 6 68"
          stroke={`url(#goldGrad-${position})`}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 12 12 L 48 12 M 12 12 L 12 48"
          stroke={`url(#goldGrad-${position})`}
          strokeWidth="1.2"
        />
        <circle cx="6" cy="6" r="3.5" fill="#fef08a" stroke="#92400e" strokeWidth="0.8" />
        <circle cx="68" cy="6" r="2.5" fill="#fef08a" stroke="#92400e" strokeWidth="0.5" />
        <circle cx="6" cy="68" r="2.5" fill="#fef08a" stroke="#92400e" strokeWidth="0.5" />

        {/* Corner Scrolled Paisley Motif */}
        <path
          d="M 6 42 C 18 36, 32 20, 26 8 C 20 0, 8 10, 10 26 C 12 40, 28 46, 38 43 C 50 39, 56 22, 48 14"
          stroke={`url(#goldGrad-${position})`}
          strokeWidth="1.8"
          fill="none"
        />

        {/* Peacock Crest Crown (3 delicate royal kalgi stalks with jewels) */}
        <path d="M 68 32 L 64 19 M 72 30 L 73 16 M 76 31 L 82 20" stroke="#fde047" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="64" cy="18" r="2.4" fill="#fef08a" stroke="#78350f" strokeWidth="0.6" />
        <circle cx="73" cy="15" r="2.6" fill="#fef08a" stroke="#78350f" strokeWidth="0.6" />
        <circle cx="82" cy="19" r="2.4" fill="#fef08a" stroke="#78350f" strokeWidth="0.6" />

        {/* Beak, Head & Crown */}
        <path
          d="M 82 34 L 94 36 L 84 40 Z"
          fill="#fef08a"
          stroke="#78350f"
          strokeWidth="0.6"
        />
        <ellipse cx="74" cy="36" rx="8.5" ry="7.5" fill={`url(#goldGrad-${position})`} stroke="#78350f" strokeWidth="0.9" />
        <circle cx="77" cy="35" r="1.6" fill="#0f172a" />
        <circle cx="77.6" cy="34.4" r="0.6" fill="#ffffff" />

        {/* Graceful S-Curved Neck & Royal Breast */}
        <path
          d="M 70 41 C 66 48, 68 56, 75 62 C 82 68, 86 78, 80 90 C 74 100, 60 102, 52 95 C 48 90, 50 82, 56 78 C 64 74, 66 65, 60 55 C 56 50, 60 42, 68 41 Z"
          fill={`url(#goldGrad-${position})`}
          stroke="#78350f"
          strokeWidth="1.3"
        />

        {/* Wing with Layered Gold Scales */}
        <path
          d="M 62 65 C 55 70, 52 80, 56 88 C 60 94, 68 96, 74 90 C 78 84, 76 74, 70 68 Z"
          fill="#92400e"
          stroke="#fef08a"
          strokeWidth="1.2"
        />
        <path d="M 58 72 C 62 70, 68 72, 70 76 M 56 78 C 60 76, 68 78, 72 82 M 58 84 C 62 82, 68 84, 70 88" stroke="#fde047" strokeWidth="1.1" />

        {/* Cascading Paisley Plumes (Mayur Feather Flourishes) */}
        {/* Plume 1 */}
        <path
          d="M 50 92 C 38 98, 24 92, 18 78 C 12 64, 20 48, 34 42 C 45 38, 52 46, 48 56 C 44 66, 32 70, 26 62"
          stroke={`url(#goldGrad-${position})`}
          strokeWidth="2.2"
          fill="none"
        />
        <ellipse cx="26" cy="62" rx="5.5" ry="7.5" fill={`url(#goldGrad-${position})`} stroke="#78350f" strokeWidth="0.9" />
        <circle cx="26" cy="62" r="2.8" fill="#fef08a" />

        {/* Plume 2 */}
        <path
          d="M 52 98 C 42 110, 28 116, 16 108 C 4 98, 4 80, 14 68 C 22 58, 34 60, 36 70 C 38 80, 28 88, 20 82"
          stroke={`url(#goldGrad-${position})`}
          strokeWidth="2.4"
          fill="none"
        />
        <ellipse cx="20" cy="82" rx="6.5" ry="8.5" fill={`url(#goldGrad-${position})`} stroke="#78350f" strokeWidth="0.9" />
        <circle cx="20" cy="82" r="3.2" fill="#fef08a" />

        {/* Plume 3 */}
        <path
          d="M 58 104 C 48 120, 32 130, 18 126 C 6 122, 2 108, 8 96 C 14 84, 26 84, 28 92 C 30 100, 22 106, 16 102"
          stroke={`url(#goldGrad-${position})`}
          strokeWidth="2.2"
          fill="none"
        />
        <ellipse cx="16" cy="102" rx="5.5" ry="7.5" fill={`url(#goldGrad-${position})`} stroke="#78350f" strokeWidth="0.9" />
        <circle cx="16" cy="102" r="2.8" fill="#fef08a" />

        {/* Feather Quill Ribs */}
        <path d="M 54 94 Q 38 82 28 64" stroke="#fde047" strokeWidth="1.2" strokeDasharray="2.5 1.5" />
        <path d="M 56 100 Q 36 94 22 84" stroke="#fde047" strokeWidth="1.2" strokeDasharray="2.5 1.5" />
        <path d="M 60 106 Q 38 108 18 104" stroke="#fde047" strokeWidth="1.2" strokeDasharray="2.5 1.5" />

        {/* Golden Stardust Accents */}
        <circle cx="48" cy="30" r="1.8" fill="#fde047" />
        <circle cx="36" cy="22" r="1.4" fill="#fef08a" />
        <circle cx="20" cy="34" r="1.6" fill="#fde047" />
        <circle cx="10" cy="52" r="1.4" fill="#fef08a" />
        <circle cx="6" cy="74" r="1.6" fill="#fde047" />
        <circle cx="8" cy="118" r="1.4" fill="#fef08a" />
        <circle cx="30" cy="132" r="1.6" fill="#fde047" />
        <circle cx="50" cy="128" r="1.4" fill="#fef08a" />
      </svg>
    </div>
  );
};

export const BaroqueGoldPhotoFrame: React.FC<{
  imageSrc?: string;
  alt?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}> = ({
  imageSrc = '/images/wedding_couple.jpg',
  alt = 'Wedding Couple',
  className = '',
  width = 155,
  height = 190,
}) => {
  return (
    <div
      className={`relative mx-auto flex items-center justify-center select-none ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    >
      {/* Outer Carved Baroque Gold Moulding (Hollow Frame Border) */}
      <div
        className="absolute -inset-2.5 rounded-lg pointer-events-none z-10"
        style={{
          border: '4px solid #f59e0b',
          boxShadow: `
            0 12px 28px rgba(0, 0, 0, 0.75),
            0 0 0 1.5px #78350f,
            0 0 0 3px #fef08a,
            0 0 0 4.5px #92400e,
            inset 0 0 6px rgba(0, 0, 0, 0.7),
            0 0 15px rgba(245, 158, 11, 0.35)
          `,
        }}
      >
        {/* Inner Sculpted Bevel Line */}
        <div
          className="w-full h-full rounded-sm pointer-events-none"
          style={{
            border: '1.5px solid #fef3c7',
            boxShadow: 'inset 0 0 4px rgba(217, 119, 6, 0.7)',
          }}
        />
      </div>

      {/* Frame 4 Corner Carved Scrolled Rosettes */}
      <div className="absolute -top-3.5 -left-3.5 w-6 h-6 pointer-events-none z-20 text-[#fef08a] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="8" fill="#d97706" stroke="#fef08a" strokeWidth="1.5" />
          <path d="M12 5 L14 10 L19 12 L14 14 L12 19 L10 14 L5 12 L10 10 Z" fill="#fef08a" />
        </svg>
      </div>
      <div className="absolute -top-3.5 -right-3.5 w-6 h-6 pointer-events-none z-20 text-[#fef08a] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="8" fill="#d97706" stroke="#fef08a" strokeWidth="1.5" />
          <path d="M12 5 L14 10 L19 12 L14 14 L12 19 L10 14 L5 12 L10 10 Z" fill="#fef08a" />
        </svg>
      </div>
      <div className="absolute -bottom-3.5 -left-3.5 w-6 h-6 pointer-events-none z-20 text-[#fef08a] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="8" fill="#d97706" stroke="#fef08a" strokeWidth="1.5" />
          <path d="M12 5 L14 10 L19 12 L14 14 L12 19 L10 14 L5 12 L10 10 Z" fill="#fef08a" />
        </svg>
      </div>
      <div className="absolute -bottom-3.5 -right-3.5 w-6 h-6 pointer-events-none z-20 text-[#fef08a] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="8" fill="#d97706" stroke="#fef08a" strokeWidth="1.5" />
          <path d="M12 5 L14 10 L19 12 L14 14 L12 19 L10 14 L5 12 L10 10 Z" fill="#fef08a" />
        </svg>
      </div>

      {/* Inside Photo with Radiant Gold Vignette */}
      <div className="relative w-full h-full overflow-hidden rounded shadow-inner z-0 bg-[#2d0515] flex items-center justify-center">
        <img
          key={imageSrc || 'default'}
          src={imageSrc || '/images/wedding_couple.jpg'}
          alt={alt}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            // Fallback to default local wedding couple if external link fails
            (e.target as HTMLImageElement).src = '/images/wedding_couple.jpg';
          }}
        />
        {/* Soft Golden Sunset Glow Overlay on Photo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 35%, rgba(254, 240, 138, 0.12) 0%, transparent 65%), linear-gradient(to top, rgba(45, 5, 21, 0.25) 0%, transparent 40%)',
          }}
        />
      </div>
    </div>
  );
};

export const MotifRenderer: React.FC<{ motifId: string; color?: string; size?: number; className?: string }> = ({
  motifId,
  color = '#d97706',
  size = 48,
  className = '',
}) => {
  switch (motifId) {
    case 'ganesha':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M50 12 C44 12 40 16 40 22 C40 32 45 38 48 42 C51 46 51 52 48 56 C44 62 38 68 38 74 C38 82 46 88 54 88 C62 88 66 82 66 76 C66 68 60 62 56 56 C53 52 53 46 56 42 C59 38 64 32 64 22 C64 16 60 12 50 12 Z" stroke={color} strokeWidth="3" fill={`${color}22`} />
          <circle cx="50" cy="26" r="3.5" fill={color} />
          <path d="M34 32 C38 32 42 36 42 42 C42 48 38 52 34 52" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M66 32 C62 32 58 36 58 42 C58 48 62 52 66 52" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50 10 L50 2" stroke={color} strokeWidth="2" />
          <circle cx="50" cy="2" r="2" fill={color} />
          <path d="M46 72 Q50 78 54 72" stroke={color} strokeWidth="2.5" />
        </svg>
      );

    case 'om':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill={color} className={className}>
          <text x="50" y="70" fontSize="64" fontFamily="serif" textAnchor="middle" fill={color} fontWeight="bold">
            ॐ
          </text>
        </svg>
      );

    case 'swastik':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="6" strokeLinecap="square" className={className}>
          <path d="M50 20 V80" />
          <path d="M20 50 H80" />
          <path d="M50 20 H74" />
          <path d="M80 50 V74" />
          <path d="M50 80 H26" />
          <path d="M20 50 V26" />
          <circle cx="35" cy="35" r="3.5" fill={color} stroke="none" />
          <circle cx="65" cy="35" r="3.5" fill={color} stroke="none" />
          <circle cx="35" cy="65" r="3.5" fill={color} stroke="none" />
          <circle cx="65" cy="65" r="3.5" fill={color} stroke="none" />
        </svg>
      );

    case 'kalash':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2.5" className={className}>
          {/* Coconut */}
          <ellipse cx="50" cy="30" rx="14" ry="18" fill={`${color}33`} />
          <path d="M40 30 L60 30 M42 24 L58 24 M44 36 L56 36" stroke={color} strokeWidth="1.5" />
          {/* Mango Leaves */}
          <path d="M50 36 C40 22 28 26 30 38 C36 40 44 38 50 38 Z" fill={`${color}55`} />
          <path d="M50 36 C60 22 72 26 70 38 C64 40 56 38 50 38 Z" fill={`${color}55`} />
          {/* Pot (Kalash) */}
          <path d="M36 44 H64 L68 50 C74 58 74 72 68 80 C62 86 38 86 32 80 C26 72 26 58 32 50 Z" fill={`${color}22`} />
          <path d="M30 64 H70" stroke={color} strokeWidth="2" strokeDasharray="3 2" />
          {/* Swastik on Pot */}
          <path d="M50 56 V72 M42 64 H58 M50 56 H55 M58 64 V69 M50 72 H45 M42 64 V59" stroke={color} strokeWidth="1.5" />
        </svg>
      );

    case 'diya':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2.5" className={className}>
          {/* Flame */}
          <path d="M50 14 C55 24 60 34 50 44 C40 34 45 24 50 14 Z" fill="#f59e0b" stroke="#f59e0b" />
          <path d="M50 22 C52 28 55 33 50 38 C45 33 48 28 50 22 Z" fill="#ef4444" stroke="#ef4444" />
          {/* Lamp Base */}
          <path d="M20 54 Q50 74 80 54 L76 66 C70 80 30 80 24 66 Z" fill={`${color}44`} />
          <ellipse cx="50" cy="54" rx="30" ry="8" fill={`${color}22`} />
          <path d="M42 80 H58 L62 88 H38 Z" fill={`${color}44`} />
        </svg>
      );

    case 'toran':
      return (
        <svg width={size * 2} height={size * 0.6} viewBox="0 0 200 60" fill="none" stroke={color} className={className}>
          <path d="M0 10 Q100 25 200 10" strokeWidth="3" />
          {Array.from({ length: 7 }).map((_, i) => {
            const cx = 20 + i * 26;
            return (
              <g key={i}>
                <circle cx={cx} cy="18" r="7" fill="#f97316" stroke={color} strokeWidth="1" />
                <circle cx={cx} cy="30" r="5" fill="#eab308" stroke={color} strokeWidth="1" />
                <path d={`M${cx} 35 L${cx - 4} 48 L${cx + 4} 48 Z`} fill="#16a34a" />
              </g>
            );
          })}
        </svg>
      );

    case 'wax-seal':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="44" fill="#991b1b" stroke="#fef08a" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="38" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M34 40 Q50 30 66 40 Q66 60 50 72 Q34 60 34 40 Z" fill="#fef08a" opacity="0.9" />
          <text x="50" y="55" fontSize="11" fontFamily="serif" textAnchor="middle" fill="#991b1b" fontWeight="bold">
            WITH LOVE
          </text>
        </svg>
      );

    case 'gold-crest':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2" className={className}>
          <path d="M50 10 L80 24 V52 C80 72 50 90 50 90 C50 90 20 72 20 52 V24 Z" fill={`${color}22`} />
          <path d="M50 18 L72 29 V50 C72 66 50 80 50 80 C50 80 28 66 28 50 V29 Z" strokeWidth="1" />
          <text x="50" y="58" fontSize="24" fontFamily="serif" textAnchor="middle" fill={color} fontWeight="bold">
            👑
          </text>
        </svg>
      );

    case 'floral-wreath':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="1.5" className={className}>
          <circle cx="50" cy="50" r="38" strokeDasharray="4 2" />
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 30} 50 50)`}>
              <ellipse cx="50" cy="12" rx="4" ry="7" fill={`${color}44`} />
              <circle cx="50" cy="12" r="2" fill={color} />
            </g>
          ))}
        </svg>
      );

    case 'hearts':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2.5" className={className}>
          <path d="M40 32 C30 20 14 28 14 44 C14 62 40 76 40 76 C40 76 66 62 66 44 C66 28 50 20 40 32 Z" fill="#f43f5e33" stroke="#f43f5e" />
          <path d="M60 26 C52 16 38 22 38 36 C38 50 60 62 60 62 C60 62 82 50 82 36 C82 22 68 16 60 26 Z" fill="#fb718555" stroke="#fb7185" />
        </svg>
      );

    case 'champagne':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2.5" className={className}>
          <path d="M30 20 L45 50 V80 M35 80 H55" strokeLinecap="round" />
          <path d="M70 20 L55 50 V80 M45 80 H65" strokeLinecap="round" />
          <circle cx="50" cy="30" r="3" fill="#fbbf24" />
          <circle cx="48" cy="20" r="2" fill="#fbbf24" />
          <circle cx="54" cy="24" r="2.5" fill="#fbbf24" />
        </svg>
      );

    case 'balloons':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="2" className={className}>
          <ellipse cx="40" cy="38" rx="16" ry="22" fill="#38bdf844" stroke="#38bdf8" />
          <ellipse cx="62" cy="34" rx="14" ry="20" fill="#f43f5e44" stroke="#f43f5e" />
          <path d="M40 60 L44 86 M62 54 L44 86 M44 86 L40 92 M44 86 L48 92" stroke="#94a3b8" />
        </svg>
      );

    case 'sparkles':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill={color} className={className}>
          <path d="M50 10 L56 38 L84 50 L56 62 L50 90 L44 62 L16 50 L44 38 Z" opacity="0.9" />
          <circle cx="75" cy="25" r="4" fill={color} />
          <circle cx="25" cy="75" r="4" fill={color} />
        </svg>
      );

    default:
      return (
        <div className="text-2xl" style={{ color }}>
          ✨
        </div>
      );
  }
};

export const BackgroundPatternRenderer: React.FC<{ pattern: string; color?: string }> = ({
  pattern,
  color = '#d97706',
}) => {
  if (pattern === 'none') return null;

  if (pattern === 'mandala') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07] flex items-center justify-center">
        <svg className="w-[800px] h-[800px] animate-spin-slow" viewBox="0 0 200 200" fill="none" stroke={color} strokeWidth="0.6">
          <circle cx="100" cy="100" r="90" />
          <circle cx="100" cy="100" r="70" />
          <circle cx="100" cy="100" r="50" />
          <circle cx="100" cy="100" r="30" />
          <circle cx="100" cy="100" r="10" fill={color} />
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={i}
              d="M100 10 C120 40 120 60 100 100 C80 60 80 40 100 10 Z"
              transform={`rotate(${i * 22.5} 100 100)`}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <circle
              key={`dot-${i}`}
              cx="100"
              cy="25"
              r="2.5"
              fill={color}
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (pattern === 'damask') {
    return (
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(${color} 1.5px, transparent 1.5px), radial-gradient(${color} 1.5px, transparent 1.5px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />
    );
  }

  if (pattern === 'stars') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        {Array.from({ length: 28 }).map((_, i) => {
          const top = (i * 37) % 95;
          const left = (i * 53) % 95;
          const size = (i % 3) + 2;
          return (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                animationDelay: `${(i % 5) * 0.7}s`,
                opacity: 0.6,
              }}
            />
          );
        })}
      </div>
    );
  }

  if (pattern === 'geometric') {
    return (
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(45deg, ${color} 25%, transparent 25%), linear-gradient(-45deg, ${color} 25%, transparent 25%), linear-gradient(135deg, ${color} 25%, transparent 25%), linear-gradient(-135deg, ${color} 25%, transparent 25%)`,
          backgroundSize: '36px 36px',
        }}
      />
    );
  }

  if (pattern === 'marble') {
    return (
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
        <svg className="w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="none">
          <filter id="marbleFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" />
          </filter>
          <rect width="100%" height="100%" filter="url(#marbleFilter)" fill="none" stroke={color} strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (pattern === 'minimal-dots') {
    return (
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />
    );
  }

  if (pattern === 'gradient') {
    return (
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${color}33 0%, transparent 60%), radial-gradient(circle at 80% 80%, ${color}22 0%, transparent 50%)`,
        }}
      />
    );
  }

  if (pattern === 'quilted-lattice' || pattern === 'royal-crosshatch') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Diamond quilted crosshatch lattice with intersection dots */}
        <svg className="w-full h-full opacity-[0.16]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="quiltedLattice" width="34" height="34" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 34 34 M 34 0 L 0 34" stroke={color} strokeWidth="0.85" />
              <circle cx="17" cy="17" r="1.5" fill={color} />
              <circle cx="0" cy="0" r="1.2" fill={color} />
              <circle cx="34" cy="0" r="1.2" fill={color} />
              <circle cx="0" cy="34" r="1.2" fill={color} />
              <circle cx="34" cy="34" r="1.2" fill={color} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#quiltedLattice)" />
        </svg>
        {/* Subtle radial dark edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.45) 100%)',
          }}
        />
      </div>
    );
  }

  return null;
};

export const BorderFrameRenderer: React.FC<{
  style: string;
  color?: string;
  className?: string;
}> = ({ style, color = '#d97706', className = '' }) => {
  if (style === 'none') return null;

  if (style === 'royal-peacock' || style === 'peacock-paisley') {
    return (
      <div className={`absolute inset-2.5 pointer-events-none z-10 ${className}`}>
        {/* Outer and Inner Double Gold Border */}
        <div
          className="absolute inset-1 border-[2px] opacity-90 rounded-sm"
          style={{
            borderColor: color,
            boxShadow: 'inset 0 0 14px rgba(245, 158, 11, 0.25)',
          }}
        />
        <div
          className="absolute inset-3 border-[1px] opacity-75 rounded-sm"
          style={{ borderColor: color }}
        />

        {/* Top & Bottom Crown Scrolled Filigree Finials */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-36 h-6 flex justify-center items-center">
          <svg viewBox="0 0 140 24" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            <path d="M 10 12 Q 70 -4 130 12" stroke={color} strokeWidth="1.8" />
            <path d="M 28 14 Q 70 4 112 14" stroke={color} strokeWidth="1" />
            <circle cx="70" cy="6" r="3" fill="#fef08a" stroke={color} strokeWidth="0.8" />
            <circle cx="56" cy="8" r="2" fill="#fef08a" />
            <circle cx="84" cy="8" r="2" fill="#fef08a" />
            <circle cx="42" cy="11" r="1.5" fill="#fef08a" />
            <circle cx="98" cy="11" r="1.5" fill="#fef08a" />
          </svg>
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-36 h-6 flex justify-center items-center rotate-180">
          <svg viewBox="0 0 140 24" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            <path d="M 10 12 Q 70 -4 130 12" stroke={color} strokeWidth="1.8" />
            <path d="M 28 14 Q 70 4 112 14" stroke={color} strokeWidth="1" />
            <circle cx="70" cy="6" r="3" fill="#fef08a" stroke={color} strokeWidth="0.8" />
            <circle cx="56" cy="8" r="2" fill="#fef08a" />
            <circle cx="84" cy="8" r="2" fill="#fef08a" />
            <circle cx="42" cy="11" r="1.5" fill="#fef08a" />
            <circle cx="98" cy="11" r="1.5" fill="#fef08a" />
          </svg>
        </div>

        {/* 4 Majestic Regal Peacock Corners */}
        <PeacockCorner position="tl" color={color} size={112} />
        <PeacockCorner position="tr" color={color} size={112} />
        <PeacockCorner position="bl" color={color} size={112} />
        <PeacockCorner position="br" color={color} size={112} />
      </div>
    );
  }

  if (style === 'simple') {
    return (
      <div
        className={`absolute inset-4 pointer-events-none border rounded-sm opacity-70 ${className}`}
        style={{ borderColor: color }}
      />
    );
  }

  if (style === 'double-gold') {
    return (
      <div className={`absolute inset-3 pointer-events-none ${className}`}>
        <div className="absolute inset-0 border-2 opacity-80" style={{ borderColor: color }} />
        <div className="absolute inset-2 border opacity-50" style={{ borderColor: color }} />
      </div>
    );
  }

  if (style === 'floral-corners') {
    return (
      <div className={`absolute inset-3 pointer-events-none ${className}`}>
        <div className="absolute inset-2 border opacity-60" style={{ borderColor: color }} />
        <FloralCorner position="tl" color={color} />
        <FloralCorner position="tr" color={color} />
        <FloralCorner position="bl" color={color} />
        <FloralCorner position="br" color={color} />
      </div>
    );
  }

  if (style === 'royal-crest') {
    return (
      <div className={`absolute inset-3 pointer-events-none ${className}`}>
        <div className="absolute inset-2 border-2 opacity-75" style={{ borderColor: color }} />
        <RoyalCrestCorner position="tl" color={color} />
        <RoyalCrestCorner position="tr" color={color} />
        <RoyalCrestCorner position="bl" color={color} />
        <RoyalCrestCorner position="br" color={color} />
      </div>
    );
  }

  if (style === 'modern-frame') {
    return (
      <div className={`absolute inset-4 pointer-events-none ${className}`}>
        <div
          className="absolute inset-0 border-2"
          style={{
            borderColor: color,
            clipPath:
              'polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))',
          }}
        />
      </div>
    );
  }

  if (style === 'ornate-arches' || style === 'jharokha') {
    return (
      <div className={`absolute inset-3 pointer-events-none ${className}`}>
        <div className="absolute inset-2 border-2 opacity-75" style={{ borderColor: color }} />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-48 h-12 flex justify-center items-start">
          <svg viewBox="0 0 160 40" className="w-full h-full" fill="none" stroke={color}>
            <path d="M0 40 Q80 -10 160 40" strokeWidth="2" />
            <path d="M20 40 Q80 5 140 40" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="80" cy="6" r="3" fill={color} />
          </svg>
        </div>
      </div>
    );
  }

  if (style === 'temple-toran') {
    return (
      <div className={`absolute inset-3 pointer-events-none ${className}`}>
        <div className="absolute inset-2 border-2 opacity-80" style={{ borderColor: color }} />
        <div className="absolute top-3 left-0 right-0 flex justify-center">
          <MotifRenderer motifId="toran" size={40} color={color} />
        </div>
      </div>
    );
  }

  return null;
};

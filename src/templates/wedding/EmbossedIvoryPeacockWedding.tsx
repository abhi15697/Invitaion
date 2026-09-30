import React from 'react';
import type { WeddingFields, InvitationCustomization } from '../../types/invitation';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';

export interface EmbossedIvoryPeacockWeddingProps {
  fields: WeddingFields;
  customization?: InvitationCustomization;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

const formatTime = (timeStr: string) => {
  if (!timeStr) return '';
  if (timeStr.includes(':')) {
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h, 10);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${suffix}`;
  }
  return timeStr;
};

/* -------------------------------------------------------------
 * 1. Rich Sculpted 3D Multi-Petal Embossed Rose Component
 * ------------------------------------------------------------- */
const EmbossedRose: React.FC<{
  size?: number;
  className?: string;
  rotation?: number;
}> = ({ size = 60, className = '', rotation = 0 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
      }}
      className={`relative select-none pointer-events-none ${className}`}
    >
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        {/* Shadow Pass for Letterpress Deboss Depth */}
        <g stroke="rgba(165, 125, 90, 0.45)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Outer Leaves */}
          <path d="M 25 25 C 10 15 5 35 15 50 C 20 40 25 35 25 25 Z" />
          <path d="M 75 25 C 90 15 95 35 85 50 C 80 40 75 35 75 25 Z" />
          <path d="M 80 70 C 95 80 85 95 65 90 C 70 82 75 78 80 70 Z" />

          {/* Outer Rose Petals */}
          <path d="M 50 15 C 32 15 20 30 20 48 C 20 68 35 84 50 86 C 65 84 80 68 80 48 C 80 30 68 15 50 15 Z" />
          <path d="M 28 36 C 36 24 64 24 72 36 C 78 48 72 66 60 76" />
          <path d="M 72 44 C 64 34 38 34 30 46 C 24 58 32 72 45 78" />

          {/* Mid Rose Petals */}
          <path d="M 36 46 C 40 38 60 38 64 46 C 68 56 58 68 50 70 C 42 68 34 56 36 46 Z" />
          <path d="M 42 50 C 46 44 54 44 58 50 C 60 56 54 62 50 63 C 46 62 40 56 42 50 Z" />

          {/* Center Rose Core Swirl */}
          <path d="M 47 54 C 48 51 52 51 53 54 C 54 57 52 59 50 59 C 48 59 46 57 47 54 Z" />
        </g>

        {/* Highlight Pass for 3D Raised Paper Relief */}
        <g stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(0, -1)">
          {/* Outer Leaves */}
          <path d="M 25 25 C 10 15 5 35 15 50 C 20 40 25 35 25 25 Z" />
          <path d="M 75 25 C 90 15 95 35 85 50 C 80 40 75 35 75 25 Z" />
          <path d="M 80 70 C 95 80 85 95 65 90 C 70 82 75 78 80 70 Z" />

          {/* Outer Rose Petals */}
          <path d="M 50 15 C 32 15 20 30 20 48 C 20 68 35 84 50 86 C 65 84 80 68 80 48 C 80 30 68 15 50 15 Z" />
          <path d="M 28 36 C 36 24 64 24 72 36 C 78 48 72 66 60 76" />
          <path d="M 72 44 C 64 34 38 34 30 46 C 24 58 32 72 45 78" />

          {/* Mid Rose Petals */}
          <path d="M 36 46 C 40 38 60 38 64 46 C 68 56 58 68 50 70 C 42 68 34 56 36 46 Z" />
          <path d="M 42 50 C 46 44 54 44 58 50 C 60 56 54 62 50 63 C 46 62 40 56 42 50 Z" />

          {/* Center Rose Core Swirl */}
          <path d="M 47 54 C 48 51 52 51 53 54 C 54 57 52 59 50 59 C 48 59 46 57 47 54 Z" />
        </g>
      </svg>
    </div>
  );
};

/* -------------------------------------------------------------
 * 2. Realistic Blind-Embossed Letterpress Paper Relief Layer
 * ------------------------------------------------------------- */
const EmbossedFloralReliefs: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10">
      {/* Top-Right Cluster of Embossed Roses & Leaves */}
      <div className="absolute -top-1 -right-1 w-36 h-36 opacity-90">
        <EmbossedRose size={85} className="absolute top-0 right-0" rotation={15} />
        <EmbossedRose size={55} className="absolute top-12 right-12" rotation={-25} />
        <EmbossedRose size={45} className="absolute top-2 right-18" rotation={40} />
      </div>

      {/* Right Margin Embossed Rose Garland */}
      <div className="absolute right-0 top-[40%] -translate-y-1/2 w-16 h-60 opacity-80 flex flex-col items-center space-y-4">
        <EmbossedRose size={50} rotation={-10} />
        <EmbossedRose size={42} rotation={35} />
        <EmbossedRose size={48} rotation={-45} />
      </div>

      {/* Left Margin Embossed Peacock Feather Plume & Vine */}
      <div className="absolute left-1 top-[50%] -translate-y-1/2 w-18 h-64 opacity-80">
        <svg viewBox="0 0 60 180" fill="none" className="w-full h-full">
          {/* Shadow Pass */}
          <g stroke="rgba(165, 125, 90, 0.45)" strokeWidth="1.6" strokeLinecap="round">
            <path d="M 10 10 C 28 30 38 60 28 95 C 18 130 35 155 15 175" />
            <circle cx="28" cy="40" r="6" />
            <circle cx="28" cy="40" r="3" />
            <circle cx="26" cy="90" r="7" />
            <circle cx="26" cy="90" r="3.5" />
            <circle cx="20" cy="140" r="6" />
            <circle cx="20" cy="140" r="3" />
          </g>
          {/* Highlight Pass */}
          <g stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" transform="translate(0, -1)">
            <path d="M 10 10 C 28 30 38 60 28 95 C 18 130 35 155 15 175" />
            <circle cx="28" cy="40" r="6" />
            <circle cx="28" cy="40" r="3" />
            <circle cx="26" cy="90" r="7" />
            <circle cx="26" cy="90" r="3.5" />
            <circle cx="20" cy="140" r="6" />
            <circle cx="20" cy="140" r="3" />
          </g>
        </svg>
      </div>

      {/* Bottom-Left Embossed Rose Bloom */}
      <div className="absolute -bottom-2 -left-2 w-28 h-28 opacity-85">
        <EmbossedRose size={75} rotation={-30} />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 3. Photorealistic Sculpted 3D 24K Gold Peacock Heart Frame
 * ------------------------------------------------------------- */
const SculptedPeacockHeartFrame: React.FC<{
  imageSrc?: string;
  alt?: string;
}> = ({
  imageSrc = '/images/wedding_couple.jpg',
  alt = 'Wedding Couple',
}) => {
  return (
    <div className="relative mx-auto w-[190px] h-[160px] flex items-center justify-center select-none shrink-0 my-0">
      {/* Soft Ambient Glow / Cast Shadow on Paper */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(180, 83, 9, 0.45) 0%, rgba(60, 20, 5, 0.18) 60%, transparent 80%)',
          transform: 'translateY(6px) scale(1.05)',
        }}
      />

      {/* 3D Sculpted 24K Gold Frame SVG */}
      <svg
        viewBox="0 0 200 170"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(70,20,10,0.55)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
      >
        <defs>
          {/* Heart Clip Path for the Photo */}
          <clipPath id="sculptedHeartClip">
            <path d="M 100 146 C 44 104 22 62 46 26 C 66 2 90 14 100 30 C 110 14 134 2 154 26 C 178 62 156 104 100 146 Z" />
          </clipPath>

          {/* 24K Antique Gold Metallic Gradients */}
          <linearGradient id="goldMouldingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="12%" stopColor="#fef08a" />
            <stop offset="26%" stopColor="#fde047" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="75%" stopColor="#b45309" />
            <stop offset="90%" stopColor="#78350f" />
            <stop offset="96%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <linearGradient id="goldHighlightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#fef9c3" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          <linearGradient id="goldShadowGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="40%" stopColor="#b45309" />
            <stop offset="80%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#2c0c02" />
          </linearGradient>

          <radialGradient id="goldBeadShine" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fef08a" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>

          <radialGradient id="photoRomanticGlow" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="rgba(254, 240, 138, 0.15)" />
            <stop offset="65%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(45, 5, 21, 0.42)" />
          </radialGradient>
        </defs>

        {/* 1. Underlying Cast Shadow Moulding */}
        <path
          d="M 100 154 C 36 108 14 58 40 20 C 62 -6 90 8 100 26 C 110 8 138 -6 160 20 C 186 58 164 108 100 154 Z"
          fill="url(#goldShadowGrad)"
        />

        {/* 2. Main Sculpted Heart Bevel Rim */}
        <path
          d="M 100 150 C 40 106 18 60 43 23 C 64 -4 90 9 100 28 C 110 9 136 -4 157 23 C 182 60 160 106 100 150 Z"
          fill="url(#goldMouldingGrad)"
        />

        {/* 3. Embedded Couple Photo Clipped to Heart */}
        <g clipPath="url(#sculptedHeartClip)">
          <rect x="0" y="0" width="200" height="170" fill="#2d0515" />
          <image
            href={imageSrc || '/images/wedding_couple.jpg'}
            x="24"
            y="6"
            width="152"
            height="146"
            preserveAspectRatio="xMidYMid slice"
            aria-label={alt}
          />
          <rect x="0" y="0" width="200" height="170" fill="url(#photoRomanticGlow)" />
        </g>

        {/* Inner Heart Frame Shadow & Highlight Lip */}
        <path
          d="M 100 146 C 44 104 22 62 46 26 C 66 2 90 14 100 30 C 110 14 134 2 154 26 C 178 62 156 104 100 146 Z"
          fill="none"
          stroke="#451a03"
          strokeWidth="2.8"
          opacity="0.8"
        />
        <path
          d="M 100 146 C 44 104 22 62 46 26 C 66 2 90 14 100 30 C 110 14 134 2 154 26 C 178 62 156 104 100 146 Z"
          fill="none"
          stroke="url(#goldHighlightGrad)"
          strokeWidth="1.2"
        />

        {/* -------------------------------------------------------------
         * 4. 3D SCULPTED GOLD PEACOCK (LEFT HEART FLANK)
         * ------------------------------------------------------------- */}
        {/* Peacock Crest Feathers */}
        <path d="M 80 8 Q 72 -2 68 0" stroke="url(#goldMouldingGrad)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="67" cy="0" r="2.2" fill="url(#goldBeadShine)" stroke="#78350f" strokeWidth="0.3" />

        <path d="M 82 7 Q 78 -5 76 -4" stroke="url(#goldMouldingGrad)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="76" cy="-4" r="2.2" fill="url(#goldBeadShine)" stroke="#78350f" strokeWidth="0.3" />

        <path d="M 85 7 Q 85 -6 87 -5" stroke="url(#goldMouldingGrad)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="87" cy="-5" r="2.2" fill="url(#goldBeadShine)" stroke="#78350f" strokeWidth="0.3" />

        {/* Peacock Head & Beak */}
        <ellipse cx="85" cy="15" rx="6" ry="8.5" fill="url(#goldMouldingGrad)" stroke="#78350f" strokeWidth="0.5" />
        <path d="M 79 14 L 71 16 L 79 18 Z" fill="url(#goldHighlightGrad)" stroke="#78350f" strokeWidth="0.4" />
        <circle cx="83.5" cy="13.5" r="1.3" fill="#2d0515" />
        <circle cx="84" cy="13" r="0.5" fill="#ffffff" />

        {/* Curving Peacock Neck Following Left Shoulder */}
        <path
          d="M 87 22 C 94 36 86 48 74 56 C 62 64 52 72 46 84 C 40 98 48 114 64 128"
          fill="none"
          stroke="url(#goldMouldingGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 87 22 C 94 36 86 48 74 56 C 62 64 52 72 46 84 C 40 98 48 114 64 128"
          fill="none"
          stroke="url(#goldHighlightGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Layered Peacock Feathers Cascading Around Left & Bottom Rim */}
        <g fill="url(#goldMouldingGrad)" stroke="#78350f" strokeWidth="0.5">
          <path d="M 62 32 C 46 28 34 40 46 50 C 53 44 59 38 62 32 Z" />
          <circle cx="46" cy="39" r="2.4" fill="url(#goldBeadShine)" />

          <path d="M 48 44 C 30 42 22 56 36 66 C 42 58 48 52 48 44 Z" />
          <circle cx="33" cy="54" r="2.6" fill="url(#goldBeadShine)" />

          <path d="M 36 60 C 18 62 14 78 28 88 C 34 80 38 70 36 60 Z" />
          <circle cx="25" cy="74" r="2.8" fill="url(#goldBeadShine)" />

          <path d="M 30 82 C 16 88 16 104 34 112 C 36 102 38 92 30 82 Z" />
          <circle cx="26" cy="98" r="2.8" fill="url(#goldBeadShine)" />

          <path d="M 36 104 C 24 114 30 130 48 136 C 46 124 44 114 36 104 Z" />
          <circle cx="36" cy="120" r="2.8" fill="url(#goldBeadShine)" />

          <path d="M 50 126 C 42 136 54 148 72 150 C 66 140 60 132 50 126 Z" />
          <circle cx="56" cy="138" r="2.6" fill="url(#goldBeadShine)" />

          <path d="M 70 140 C 66 150 82 160 98 156 C 90 148 82 142 70 140 Z" />
          <circle cx="80" cy="150" r="2.4" fill="url(#goldBeadShine)" />
        </g>

        {/* -------------------------------------------------------------
         * 5. SCULPTED GOLD PAISLEY / KALKA MOTIF (RIGHT HEART FLANK)
         * ------------------------------------------------------------- */}
        <g fill="url(#goldMouldingGrad)" stroke="#78350f" strokeWidth="0.6">
          <path
            d="M 122 20 C 146 8 176 26 172 54 C 168 72 144 86 130 74 C 120 66 124 54 136 54 C 146 54 152 64 148 70 C 156 62 158 46 146 36 C 134 26 122 28 122 20 Z"
          />
          <circle cx="150" cy="42" r="4.2" fill="url(#goldBeadShine)" />
          <circle cx="136" cy="58" r="2.8" fill="url(#goldBeadShine)" />

          <path
            d="M 146 72 C 172 74 182 100 166 122 C 152 136 132 138 126 126 C 122 118 130 110 138 112 C 146 114 148 122 144 126 C 154 118 158 102 148 90 C 142 82 132 80 146 72 Z"
          />
          <circle cx="158" cy="100" r="3.8" fill="url(#goldBeadShine)" />
          <circle cx="143" cy="120" r="2.8" fill="url(#goldBeadShine)" />

          <path d="M 146 122 C 156 132 146 146 126 148 C 134 138 140 130 146 122 Z" />
          <circle cx="138" cy="138" r="2.6" fill="url(#goldBeadShine)" />

          <path d="M 124 140 C 128 150 114 160 98 156 C 106 148 116 142 124 140 Z" />
          <circle cx="114" cy="150" r="2.4" fill="url(#goldBeadShine)" />
        </g>

        {/* -------------------------------------------------------------
         * 6. GOLD PEARL BEADING ALL AROUND HEART CONTOUR
         * ------------------------------------------------------------- */}
        {[
          [100, 28], [92, 24], [84, 22], [76, 24], [68, 28],
          [60, 34], [54, 42], [48, 52], [44, 64], [42, 76],
          [44, 88], [48, 100], [54, 112], [62, 124], [72, 134],
          [84, 142], [94, 148], [100, 151],
          [106, 148], [116, 142], [128, 134], [138, 124], [146, 112],
          [152, 100], [156, 88], [158, 76], [156, 64], [152, 52],
          [146, 42], [140, 34], [132, 28], [124, 24], [116, 22], [108, 24]
        ].map(([cx, cy], idx) => (
          <circle
            key={idx}
            cx={cx}
            cy={cy}
            r="1.5"
            fill="url(#goldBeadShine)"
            stroke="#78350f"
            strokeWidth="0.25"
          />
        ))}
      </svg>
    </div>
  );
};

/* -------------------------------------------------------------
 * 4. Realistic Draped Gold Brocade Silk & Peacock Feather (Left)
 * ------------------------------------------------------------- */
const BrocadeDrapeAndPeacockFeather: React.FC = () => {
  return (
    <div className="absolute -left-10 top-0 bottom-0 w-48 pointer-events-none z-0 overflow-hidden select-none">
      {/* 3D Draped Gold Jacquard Silk Shawl with Zari Bullion Tassel Trim */}
      <div
        className="w-full h-full rotate-[-4deg] origin-top-left relative"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(254, 240, 138, 0.5) 0%, transparent 60%),
            linear-gradient(135deg, #78350f 0%, #d97706 25%, #fef08a 50%, #b45309 75%, #451a03 100%)
          `,
          boxShadow: '10px 0 30px rgba(0, 0, 0, 0.8), inset -5px 0 15px rgba(254, 240, 138, 0.5)',
        }}
      >
        {/* Intricate Indian Brocade Zari Gold Weave Texture */}
        <svg viewBox="0 0 200 600" className="w-full h-full opacity-40 mix-blend-overlay">
          <pattern id="brocadePattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 C 30 10 30 30 20 40 C 10 30 10 10 20 0 Z M 0 20 C 10 30 30 30 40 20 C 30 10 10 10 0 20 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.2"
            />
            <circle cx="20" cy="20" r="4" fill="#fde047" />
            <circle cx="20" cy="20" r="1.5" fill="#78350f" />
          </pattern>
          <rect width="200" height="600" fill="url(#brocadePattern)" />
        </svg>

        {/* Diagonal Soft Velvet/Silk Fold Ribbons */}
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.35) 0px, transparent 20px, rgba(255,255,255,0.3) 40px, transparent 60px)',
          }}
        />

        {/* Gold Bullion Fringe & Pearl Tassels on Silk Edge */}
        <div className="absolute right-0 top-0 bottom-0 w-3 flex flex-col justify-around opacity-80">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="flex items-center space-x-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-yellow-200 to-amber-500 shadow-sm" />
              <div className="w-2.5 h-[1px] bg-amber-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Photorealistic Natural Peacock Feather Laying on Brocade */}
      <div className="absolute top-[28%] left-8 w-24 h-72 drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] rotate-[-12deg]">
        <svg viewBox="0 0 100 240" fill="none" className="w-full h-full">
          {/* Main Feather Quill Stem */}
          <path d="M 50 240 Q 52 140 50 10" stroke="#fef08a" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 50 240 Q 52 140 50 10" stroke="#b45309" strokeWidth="1" strokeLinecap="round" />

          {/* Radiating Fine Feather Barbs */}
          <g stroke="rgba(217, 119, 6, 0.75)" strokeWidth="0.8">
            {[20, 35, 50, 65, 80, 95, 110, 125, 140, 155, 170, 185].map((y, i) => (
              <React.Fragment key={i}>
                <path d={`M 50 ${y} Q ${25 - i * 1.2} ${y - 12} ${5 - i * 0.4} ${y - 4}`} />
                <path d={`M 50 ${y} Q ${75 + i * 1.2} ${y - 12} ${95 + i * 0.4} ${y - 4}`} />
              </React.Fragment>
            ))}
          </g>

          {/* Peacock Eye (Ocellus) */}
          {/* 1. Outer Golden Bronze Radiance */}
          <ellipse cx="50" cy="55" rx="34" ry="42" fill="url(#peacockAureoleGrad)" />
          <defs>
            <linearGradient id="peacockAureoleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>

          {/* 2. Emerald / Teal Ring */}
          <ellipse cx="50" cy="55" rx="26" ry="32" fill="#047857" />
          <ellipse cx="50" cy="54" rx="24" ry="29" fill="#0d9488" />

          {/* 3. Deep Royal Sapphire Blue Ring */}
          <ellipse cx="50" cy="55" rx="18" ry="22" fill="#1e3a8a" />
          <ellipse cx="50" cy="54" rx="16" ry="19" fill="#2563eb" />

          {/* 4. Turquoise Crescent Glow */}
          <ellipse cx="50" cy="50" rx="11" ry="13" fill="#38bdf8" />

          {/* 5. Deep Midnight Center Pupil */}
          <ellipse cx="50" cy="56" rx="7" ry="8" fill="#090d16" />
          <circle cx="48" cy="54" r="1.5" fill="#ffffff" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * 5. Main Realistic Embossed Ivory Peacock Wedding Component
 * ------------------------------------------------------------- */
export const EmbossedIvoryPeacockWedding: React.FC<EmbossedIvoryPeacockWeddingProps> = ({
  fields,
  customization,
}) => {
  const {
    brideName = 'Priya Sharma',
    groomName = 'Rahul Verma',
    weddingDate = '2026-12-25',
    weddingTime = '19:00',
    venueName = 'The Grand Palace Resort',
    venueAddress = 'Senapati Bapat Road, Pune, Maharashtra 411016',
    weddingMessage = 'Two souls, one heart, uniting in love and celebration. We warmly request the honor of your presence as we exchange our sacred vows.',
    brideParents = 'Mr. Rajesh & Mrs. Sunita Sharma',
    groomParents = 'Mr. Anand & Mrs. Rekha Verma',
    rsvpName = 'Vikram Sharma',
    rsvpPhone = '+91 98765 43210',
    couplePhoto,
  } = fields;

  // Determine velvet background tone from palette
  const rawBg = customization?.backgroundColor;
  const isDarkCustomBg = rawBg && rawBg !== '#faf7f2' && rawBg !== '#ffffff';
  const velvetBgColor = isDarkCustomBg ? rawBg : '#20020c';

  // Constant High-Contrast Card Typography Inks
  const cardTextColor = '#3d2110';
  const headerTextColor = '#45210e';
  const subTextColor = '#6e472a';

  return (
    <div
      className="relative w-full h-full select-none overflow-hidden flex items-center justify-center p-3 sm:p-3.5 transition-colors duration-300"
      style={{
        // Deep crushed velvet background bed
        backgroundColor: velvetBgColor,
        backgroundImage: `
          radial-gradient(ellipse at 80% 25%, rgba(245, 158, 11, 0.22) 0%, ${velvetBgColor} 65%, rgba(0, 0, 0, 0.92) 100%),
          repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.035) 0px, rgba(255, 255, 255, 0.035) 40px, transparent 40px, transparent 80px),
          radial-gradient(circle at 20% 80%, rgba(217, 119, 6, 0.22) 0%, transparent 40%)
        `,
      }}
    >
      {/* ---------------------------------------------------------
       * SCENE ELEMENT: Ambient Golden Bokeh Light Dust
       * --------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-12 right-16 w-3 h-3 rounded-full bg-amber-300/35 blur-sm animate-pulse" />
        <div className="absolute top-1/3 right-6 w-2 h-2 rounded-full bg-yellow-200/40 blur-[1px]" />
        <div className="absolute bottom-24 right-20 w-4 h-4 rounded-full bg-amber-400/25 blur-md" />
      </div>

      {/* ---------------------------------------------------------
       * SCENE ELEMENT: Luxurious Gold Brocade Silk & Peacock Feather
       * --------------------------------------------------------- */}
      <BrocadeDrapeAndPeacockFeather />

      {/* ---------------------------------------------------------
       * TOP LAYERED SLIDER CARD FOLIO HEADER (Revealed behind card)
       * --------------------------------------------------------- */}
      <div
        className="absolute top-1 left-1/2 -translate-x-1/2 w-[92%] h-12 rounded-t-xl z-0 pointer-events-none"
        style={{
          backgroundColor: '#f4ede4',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.85)',
          border: '1px solid #dcd0be',
        }}
      >
        {/* Subtle Embossed Floral Top Border */}
        <div className="w-full h-full flex justify-end pr-4 pt-1 opacity-70">
          <svg viewBox="0 0 120 25" className="w-28 h-6">
            <path
              d="M 10 12 Q 30 2 50 12 T 90 12 T 115 12"
              stroke="#baa38a"
              strokeWidth="1.2"
              fill="none"
            />
            <circle cx="50" cy="12" r="3" stroke="#baa38a" strokeWidth="0.8" fill="none" />
            <circle cx="90" cy="12" r="3" stroke="#baa38a" strokeWidth="0.8" fill="none" />
          </svg>
        </div>
      </div>

      {/* ---------------------------------------------------------
       * MAIN INVITATION CARD (Fine-Art Heavy Ivory Cardstock)
       * --------------------------------------------------------- */}
      <div
        className="relative w-full h-[620px] rounded-2xl flex flex-col justify-between items-center text-center px-4 py-3 z-10 overflow-hidden"
        style={{
          // Heavy textured fine-art cream cardstock
          backgroundColor: '#faf7f2',
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(248, 242, 233, 0.95) 100%),
            repeating-radial-gradient(#baa38a 0 0.0001%, transparent 0 0.0005%)
          `,
          color: cardTextColor,
          boxShadow: `
            0 25px 50px -10px rgba(0, 0, 0, 0.85),
            0 10px 25px rgba(45, 5, 21, 0.55),
            0 0 0 1px rgba(217, 119, 6, 0.22),
            inset 0 0 35px rgba(245, 235, 220, 0.9)
          `,
        }}
      >
        {/* Rich Multi-Petal Blind-Embossed Letterpress Paper Relief Layer */}
        <EmbossedFloralReliefs />

        {/* Double Debossed / Stitched Card Border */}
        <div
          className="absolute inset-2 rounded-xl pointer-events-none z-10"
          style={{
            border: '1px solid rgba(190, 155, 120, 0.4)',
            boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(160, 120, 80, 0.2)',
          }}
        />

        {/* ---------------------------------------------------------
         * A. TOP-LEFT TILTED GANESHA BLESSINGS INSERT CARD
         * --------------------------------------------------------- */}
        <div
          className="absolute top-1.5 left-1.5 z-30 pointer-events-none drop-shadow-[0_8px_16px_rgba(40,15,5,0.45)] rotate-[-7deg]"
        >
          <div
            className="w-32 h-20 rounded-xl p-2 flex flex-col items-center justify-center text-center relative overflow-hidden"
            style={{
              backgroundColor: '#fffefb',
              border: '1px solid #e5dac9',
              boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.95), 0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            {/* Blind-Embossed Floral Garland Border on Ganesha Mini Card */}
            <div className="absolute inset-1 border border-dashed border-[#d8c8b4] rounded-lg opacity-70" />
            <EmbossedRose size={28} className="absolute -top-2 -left-2 opacity-60" />
            <EmbossedRose size={28} className="absolute -bottom-2 -right-2 opacity-60" />

            {/* 3D Gold Foil Lord Ganesha Linear Emblem */}
            <div className="w-8 h-8 mb-0.5 text-[#d97706] flex items-center justify-center drop-shadow-[0_1px_2px_rgba(180,83,9,0.65)] relative">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                <path d="M 50 10 C 40 10 34 18 34 26 C 34 34 40 38 45 40 C 40 44 36 52 36 62 C 36 74 44 84 56 84 C 66 84 74 76 74 64 C 74 50 62 42 56 40 C 62 36 66 32 66 24 C 66 16 58 10 50 10 Z M 50 16 C 54 16 58 19 58 24 C 58 29 54 32 50 32 C 46 32 42 29 42 24 C 42 19 46 16 50 16 Z M 48 42 C 54 42 62 46 64 56 C 66 66 60 74 52 74 C 44 74 42 66 42 56 C 42 48 44 42 48 42 Z" />
                <circle cx="50" cy="6" r="3" fill="#f59e0b" />
                <path d="M 50 18 L 50 28 M 46 23 L 54 23" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>

            <p
              className="text-[11.5px] font-script tracking-wider leading-none font-bold text-[#b45309]"
              style={{
                textShadow: '0 1px 1px rgba(255, 255, 255, 0.95)',
              }}
            >
              {fields.deityInvocation || 'Ganesha blessings'}
            </p>
          </div>
        </div>

        {/* ---------------------------------------------------------
         * B. TOP HEADER INVITATION COPY
         * --------------------------------------------------------- */}
        <div className="z-20 w-full pl-28 pr-2 pt-0.5 text-right flex flex-col justify-center min-h-[52px]">
          <p
            className="text-[9.5px] sm:text-[10px] font-serif font-bold tracking-wider leading-tight"
            style={{
              color: headerTextColor,
              textShadow: '0 1px 1px rgba(255, 255, 255, 0.95)',
            }}
          >
            {brideParents && groomParents
              ? `${brideParents} & ${groomParents}`
              : 'Together with their beloved families,'}
          </p>

          <h2
            className="text-[15px] sm:text-[16px] font-serif font-bold tracking-wide leading-tight mt-0.5"
            style={{
              color: headerTextColor,
              textShadow: '0 1px 1px rgba(255, 255, 255, 0.95)',
            }}
          >
            The Wedding Celebration
          </h2>
        </div>

        {/* ---------------------------------------------------------
         * C. CENTER SECTION: 3D SCULPTED GOLD HEART + COUPLE NAMES
         * --------------------------------------------------------- */}
        <div className="w-full flex flex-col items-center z-20 my-auto py-0 space-y-0.5">
          {/* Sculpted 3D Antique Gold Peacock Heart Frame */}
          <SculptedPeacockHeartFrame
            imageSrc={couplePhoto || '/images/wedding_couple.jpg'}
            alt={`${brideName} & ${groomName}`}
          />

          {/* Couple Names in 3D Embossed Gold Foil Calligraphy */}
          <div className="space-y-0 text-center w-full pt-0.5 flex flex-col items-center">
            {/* Bride Name */}
            <div className="relative inline-block drop-shadow-[0_2px_4px_rgba(120,53,15,0.4)]">
              <h1
                className="text-[36px] sm:text-[38px] font-script leading-[1.0] tracking-wide"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #fef08a 25%, #d97706 65%, #78350f 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {brideName}
              </h1>
              <span className="absolute -top-1 -right-3 text-[10px] text-amber-400 select-none pointer-events-none drop-shadow">
                ✦
              </span>
            </div>

            {/* 'and' connector */}
            <p
              className="font-script text-base sm:text-lg italic leading-none my-0 py-0.5"
              style={{
                color: '#b45309',
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.95)',
              }}
            >
              and
            </p>

            {/* Groom Name */}
            <div className="relative inline-block drop-shadow-[0_2px_4px_rgba(120,53,15,0.4)]">
              <h1
                className="text-[36px] sm:text-[38px] font-script leading-[1.0] tracking-wide"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 0%, #fef08a 25%, #d97706 65%, #78350f 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {groomName}
              </h1>
              <span className="absolute -bottom-1 -left-3 text-[10px] text-amber-400 select-none pointer-events-none drop-shadow">
                ✦
              </span>
            </div>
          </div>

          {/* Sacred Wedding Invitation Message */}
          <p
            className="text-[10px] sm:text-[10.5px] font-serif max-w-[320px] mx-auto leading-relaxed font-medium px-2 pt-0.5 pb-0.5"
            style={{
              color: cardTextColor,
              textShadow: '0 1px 1px rgba(255, 255, 255, 0.95)',
            }}
          >
            {weddingMessage}
          </p>
        </div>

        {/* ---------------------------------------------------------
         * D. BOTTOM-RIGHT TILTED VENUE & RSVP INSERT CARD
         * --------------------------------------------------------- */}
        <div
          className="absolute bottom-3 right-2.5 z-30 pointer-events-none drop-shadow-[0_10px_18px_rgba(40,15,5,0.45)] rotate-[3.5deg]"
        >
          <div
            className="w-48 sm:w-52 rounded-xl p-2.5 space-y-1 text-left relative overflow-hidden"
            style={{
              backgroundColor: '#fffefb',
              border: '1px solid #e5dac9',
              boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.95), 0 3px 8px rgba(0,0,0,0.12)',
            }}
          >
            {/* Blind-Embossed Card Borders on RSVP Card */}
            <div className="absolute inset-1 border border-dashed border-[#d8c8b4] rounded-lg opacity-70" />
            <EmbossedRose size={26} className="absolute -top-1.5 -left-1.5 opacity-55" />
            <EmbossedRose size={24} className="absolute -bottom-1.5 -right-1.5 opacity-55" />

            <div className="relative z-10 space-y-1">
              {/* Venue & Location */}
              <div className="flex items-start space-x-1">
                <MapPin className="w-3 h-3 text-[#b45309] shrink-0 mt-0.5" />
                <div>
                  <p
                    className="font-serif font-bold text-[9.5px] leading-tight"
                    style={{ color: cardTextColor }}
                  >
                    {venueName}
                  </p>
                  <p className="text-[8px] font-sans leading-tight opacity-90 truncate max-w-[155px]" style={{ color: subTextColor }}>
                    {venueAddress}
                  </p>
                </div>
              </div>

              {/* Date & Auspicious Muhurat */}
              <div className="flex items-center space-x-1.5 text-[8px] text-[#854d0e] font-semibold pt-0.5 border-t border-[#f0e6d8]">
                <div className="flex items-center space-x-0.5">
                  <Calendar className="w-2.5 h-2.5 text-[#b45309]" />
                  <span>{formatDate(weddingDate)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-0.5">
                  <Clock className="w-2.5 h-2.5 text-[#b45309]" />
                  <span>{formatTime(weddingTime)}</span>
                </div>
              </div>

              {/* RSVP Contact */}
              {(rsvpName || rsvpPhone) && (
                <div
                  className="flex items-center space-x-1 text-[8px] font-medium pt-0.5 border-t border-[#f0e6d8]/60"
                  style={{ color: subTextColor }}
                >
                  <Phone className="w-2 h-2 text-[#b45309] shrink-0" />
                  <span className="truncate max-w-[160px]">
                    RSVP: {rsvpName} {rsvpPhone && `• ${rsvpPhone}`}
                  </span>
                </div>
              )}

              {/* Gold 4-point Diamond Star Ornament */}
              <div className="w-full flex justify-center pt-0.5 opacity-60">
                <span className="text-[9px] text-[#d97706]">✦</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------
         * E. GOLD SATIN PULL-OUT RIBBON TABS
         * --------------------------------------------------------- */}
        {/* Bottom Center Gold Satin Ribbon Pull Tab */}
        <div
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-14 h-6 z-20 pointer-events-none drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)]"
        >
          <div
            className="w-full h-full rounded-b-lg flex items-center justify-center border-t border-[#fef08a]"
            style={{
              background: 'linear-gradient(180deg, #d97706 0%, #fef08a 40%, #b45309 80%, #78350f 100%)',
              boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.7), 0 3px 6px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div className="w-1.5 h-full bg-white/40 blur-[0.5px]" />
          </div>
        </div>

        {/* Right Side Gold Satin Ribbon Band */}
        <div
          className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-6 h-12 z-20 pointer-events-none drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)]"
        >
          <div
            className="w-full h-full rounded-r-lg border-l border-[#fef08a]"
            style={{
              background: 'linear-gradient(90deg, #d97706 0%, #fef08a 40%, #b45309 80%, #78350f 100%)',
              boxShadow: 'inset 1px 0 2px rgba(255, 255, 255, 0.7)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

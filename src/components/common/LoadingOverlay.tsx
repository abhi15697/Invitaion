import React from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
  submessage?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = 'Generating your invitation...',
  submessage = 'Rendering high-resolution crisp print canvas',
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-3xl glass-dropdown border border-amber-500/30 text-center space-y-6 shadow-2xl animate-fade-in">
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold font-display text-white">{message}</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">{submessage}</p>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full w-2/3 animate-pulse-slow rounded-full" />
        </div>
      </div>
    </div>
  );
};

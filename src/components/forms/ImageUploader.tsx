import React, { useRef, useState } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
  helperText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  helperText = 'JPG, PNG or WEBP up to 5MB',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    setError(null);

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image exceeds 5MB limit. Please choose a smaller photo.');
      return;
    }

    // Validate type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Unsupported format. Please upload JPG, PNG, or WEBP.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string);
      }
    };
    reader.onerror = () => {
      setError('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
        {label}
      </label>

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-900/60 p-2 flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <img
              src={value}
              alt="Upload preview"
              className="w-14 h-14 object-cover rounded-lg border border-slate-600 shrink-0"
            />
            <div className="truncate text-xs">
              <p className="text-slate-200 font-medium truncate">Uploaded Photo</p>
              <p className="text-slate-400 text-[11px]">Ready for preview & export</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-amber-500 bg-amber-500/10'
              : 'border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-900/70'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-1.5 text-slate-400">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-amber-400">
              <Upload className="w-4 h-4" />
            </div>
            <p className="text-xs font-medium text-slate-300">
              Click to upload or drag photo here
            </p>
            <p className="text-[11px] text-slate-500">{helperText}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-1.5 text-rose-400 text-xs mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};

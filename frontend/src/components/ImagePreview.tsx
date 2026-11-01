import { X } from "lucide-react";

interface Props {
  src: string;
  name: string;
  size: number;
  onRemove: () => void;
  disabled?: boolean;
}

const formatSize = (b: number) => (b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1024 / 1024).toFixed(2)} MB`);

export default function ImagePreview({ src, name, size, onRemove, disabled }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      <div className="grid place-items-center bg-slate-100/70 p-3">
        <img src={src} alt={`Preview of ${name}`} className="max-h-80 w-full rounded-xl object-contain" />
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800">{name}</p>
          <p className="text-xs text-slate-500">{formatSize(size)}</p>
        </div>
        <button
          onClick={onRemove}
          disabled={disabled}
          aria-label="Remove image"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-40"
        >
          <X size={18} aria-hidden />
        </button>
      </div>
    </div>
  );
}

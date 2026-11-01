import { useRef, useState, type DragEvent, type KeyboardEvent } from "react";
import { ImagePlus, UploadCloud } from "lucide-react";

interface Props {
  onFile: (file: File) => void;
}

export default function UploadZone({ onFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const open = () => inputRef.current?.click();

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Upload an image. Drag and drop or press Enter to browse."
      onClick={open}
      onKeyDown={onKey}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition ${
        dragging ? "border-violet-500 bg-violet-50" : "border-slate-200 bg-slate-50/60 hover:border-blue-400 hover:bg-blue-50/40"
      }`}
    >
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-100 to-violet-100 text-violet-600">
        <UploadCloud size={30} aria-hidden />
      </span>
      <div>
        <p className="font-semibold text-slate-800">{dragging ? "Drop your image here" : "Drag and drop an image here"}</p>
        <p className="mt-1 text-sm text-slate-500">JPG, JPEG or PNG, up to 5MB</p>
      </div>
      <span className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
        <ImagePlus size={16} aria-hidden /> Browse Image
      </span>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = ""; // allow re-selecting the same file
        }}
      />
    </div>
  );
}

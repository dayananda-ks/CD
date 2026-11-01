import { RotateCcw } from "lucide-react";
import type { PredictionResult } from "../types";

interface Props {
  result: PredictionResult;
  onReset: () => void;
}

export default function ResultCard({ result, onReset }: Props) {
  const labelConfig = {
    CAT: { badge: "CAT 🐱", caption: "A cat was found in this image." },
    DOG: { badge: "DOG 🐶", caption: "A dog was found in this image." },
    BOTH: { badge: "BOTH 🐱🐶", caption: "Both a cat and a dog were found in this image." },
  } as const;

  const display = labelConfig[result.label];

  return (
    <div aria-live="polite" className="animate-pop rounded-2xl border border-violet-100 bg-gradient-to-br from-blue-50 to-violet-50 p-6 text-center">
      <p className="text-sm font-medium text-slate-500">Prediction</p>
      <p className="mt-2 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-3 text-4xl font-extrabold tracking-tight text-slate-900 shadow-card sm:text-5xl">
        {display.badge}
      </p>

      <p className="mt-5 text-sm text-slate-600">{display.caption}</p>

      <button onClick={onReset} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50">
        <RotateCcw size={16} aria-hidden /> Upload Another Image
      </button>
    </div>
  );
}

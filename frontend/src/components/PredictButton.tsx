import { Loader2, Sparkles } from "lucide-react";

interface Props {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function PredictButton({ onClick, disabled, loading }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
    >
      {loading ? <Loader2 className="animate-spin" size={18} aria-hidden /> : <Sparkles size={18} aria-hidden />}
      {loading ? "Analyzing image..." : "Predict"}
    </button>
  );
}

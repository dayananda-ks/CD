import { AlertCircle, RotateCw } from "lucide-react";

interface Props {
  message: string;
  onRetry?: () => void;
}

export default function ErrorAlert({ message, onRetry }: Props) {
  return (
    <div role="alert" className="flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-800 sm:flex-row sm:items-center">
      <AlertCircle className="shrink-0" size={20} aria-hidden />
      <p className="flex-1 text-sm">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-rose-700 shadow-sm ring-1 ring-rose-200 transition hover:bg-rose-100">
          <RotateCw size={14} aria-hidden /> Retry
        </button>
      )}
    </div>
  );
}

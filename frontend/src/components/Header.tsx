import { PawPrint } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="flex items-center gap-2.5 font-bold text-slate-900">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-white">
            <PawPrint size={18} aria-hidden />
          </span>
          <span className="text-base sm:text-lg">Cat vs Dog Classifier</span>
        </a>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm font-medium text-slate-600">
          <a href="#home" className="rounded-lg px-3 py-2 transition hover:bg-slate-50 hover:text-violet-600">Home</a>
          <a href="#about" className="rounded-lg px-3 py-2 transition hover:bg-slate-50 hover:text-violet-600">About</a>
        </nav>
      </div>
    </header>
  );
}

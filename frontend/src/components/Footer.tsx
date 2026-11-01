const TECH = ["React", "TypeScript", "Tailwind CSS", "FastAPI", "TensorFlow / Keras", "MobileNetV2"];

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 px-4 py-10 text-center sm:px-6">
      <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
        {TECH.map((t) => (
          <li key={t} className="rounded-full bg-gradient-to-r from-blue-50 to-violet-50 px-3.5 py-1.5 text-xs font-semibold text-violet-700 ring-1 ring-violet-100">
            {t}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-slate-500">Built for a Deep Learning demo. Predictions come from a live MobileNetV2 model.</p>
    </footer>
  );
}

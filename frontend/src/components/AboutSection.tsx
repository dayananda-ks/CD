import { Brain, Cpu, Workflow } from "lucide-react";
import type { ReactNode } from "react";

interface CardProps { icon: ReactNode; title: string; children: ReactNode }

function InfoCard({ icon, title, children }: CardProps) {
  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue-100 to-violet-100 text-violet-600">{icon}</span>
      <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">{children}</div>
    </article>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="bg-slate-50/70 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">How it works</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
          A quick look at the deep learning behind this demo.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <InfoCard icon={<Brain size={22} aria-hidden />} title="What is a CNN?">
            <p>
              A Convolutional Neural Network learns to see. It slides small filters over a picture to spot edges,
              then textures, then shapes like ears and snouts. Stacking these layers lets it recognise whole objects.
            </p>
          </InfoCard>
          <InfoCard icon={<Cpu size={22} aria-hidden />} title="What is MobileNetV2?">
            <p>
              MobileNetV2 is a small, fast CNN built to run on phones and laptops. This app uses a copy already
              trained on ImageNet, a library of over a million photos, so it reuses what it learned (transfer learning)
              instead of training from scratch.
            </p>
          </InfoCard>
          <InfoCard icon={<Workflow size={22} aria-hidden />} title="How a prediction happens">
            <p>
              You upload a photo and the React app sends it to the FastAPI server. The server resizes the image,
              checks the model's cat and dog scores across the full and side crops, and returns the label for the
              picture as CAT, DOG, or BOTH.
            </p>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}

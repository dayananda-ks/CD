export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-14 text-center sm:px-6 sm:pt-20">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-200/50 to-violet-200/50 blur-3xl" />
      <h1 className="mx-auto max-w-2xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
        Is it a{" "}
        <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">Cat or a Dog?</span>
      </h1>
      <p className="mx-auto mt-5 max-w-md text-base text-slate-600 sm:text-lg">
        Upload an image and let Deep Learning identify your pet.
      </p>
    </section>
  );
}

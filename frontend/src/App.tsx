import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import UploadZone from "./components/UploadZone";
import ImagePreview from "./components/ImagePreview";
import PredictButton from "./components/PredictButton";
import ResultCard from "./components/ResultCard";
import ErrorAlert from "./components/ErrorAlert";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import { usePrediction } from "./hooks/usePrediction";

const ALLOWED = ["image/jpeg", "image/png"];
const MAX_SIZE = 5 * 1024 * 1024;

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const { status, result, error, predict, reset } = usePrediction();

  // Free the object URL when it changes or the component unmounts
  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const handleFile = useCallback((f: File) => {
    reset();
    if (!ALLOWED.includes(f.type)) {
      setFileError("Unsupported file type. Please choose a JPG, JPEG or PNG image.");
      return;
    }
    if (f.size > MAX_SIZE) {
      setFileError("That image is larger than 5MB. Please choose a smaller one.");
      return;
    }
    setFileError(null);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }, [reset]);

  const clearAll = useCallback(() => {
    setFile(null);
    setPreviewUrl(null);
    setFileError(null);
    reset();
  }, [reset]);

  const loading = status === "loading";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="home" className="flex-1">
        <Hero />

        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-xl space-y-5 rounded-3xl border border-slate-100 bg-white p-5 shadow-card sm:p-8">
            {file && previewUrl ? (
              <ImagePreview src={previewUrl} name={file.name} size={file.size} onRemove={clearAll} disabled={loading} />
            ) : (
              <UploadZone onFile={handleFile} />
            )}

            {fileError && <ErrorAlert message={fileError} />}

            {status === "error" && error && <ErrorAlert message={error} onRetry={file ? () => predict(file) : undefined} />}

            {status === "success" && result ? (
              <ResultCard result={result} onReset={clearAll} />
            ) : (
              <PredictButton onClick={() => file && predict(file)} disabled={!file} loading={loading} />
            )}
          </div>
        </section>

        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}

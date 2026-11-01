import { useCallback, useState } from "react";
import { predictImage } from "../services/api";
import type { PredictionResult, PredictionStatus } from "../types";

export function usePrediction() {
  const [status, setStatus] = useState<PredictionStatus>("idle");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const predict = useCallback(async (file: File) => {
    setStatus("loading");
    setError(null);
    setResult(null);
    try {
      setResult(await predictImage(file));
      setStatus("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Prediction failed.");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  return { status, result, error, predict, reset };
}

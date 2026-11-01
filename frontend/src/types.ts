export type PredictionLabel = "CAT" | "DOG" | "BOTH";

export interface PredictionResult {
  label: PredictionLabel;
}

export type PredictionStatus = "idle" | "loading" | "success" | "error";

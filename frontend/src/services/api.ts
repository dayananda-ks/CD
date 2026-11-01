import type { PredictionResult } from "../types";

const API_URL = import.meta.env.VITE_API_URL?.trim() ?? "";
const TIMEOUT_MS = 30_000;

export async function predictImage(file: File): Promise<PredictionResult> {
  const body = new FormData();
  body.append("file", file);

  const endpoint = API_URL ? `${API_URL.replace(/\/$/, "")}/predict` : "/predict";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(endpoint, { method: "POST", body, signal: controller.signal });

    if (!res.ok) {
      let detail = `Server error (${res.status}).`;
      try {
        const data = await res.json();
        if (typeof data?.detail === "string") detail = data.detail;
      } catch { /* non-JSON error body */ }
      throw new Error(detail);
    }

    const data = await res.json();
    if (data?.label !== "CAT" && data?.label !== "DOG" && data?.label !== "BOTH") {
      throw new Error("Unexpected response from the server.");
    }
    return { label: data.label };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("The request timed out after 30 seconds. Please try again.");
    }
    if (err instanceof TypeError) {
      throw new Error(`Cannot reach the backend at ${API_URL || endpoint}. Make sure the FastAPI server is running.`);
    }
    throw err instanceof Error ? err : new Error("Something went wrong.");
  } finally {
    clearTimeout(timer);
  }
}

export const USABLE_RAM_FRACTION = 0.75;

export const PRECISION = {
  fp32: { bytes: 4, label: "FP32" },
  fp16: { bytes: 2, label: "FP16" },
  bf16: { bytes: 2, label: "BF16" },
  int8: { bytes: 1, label: "INT8" },
  int4: { bytes: 0.5, label: "INT4" },
} as const;

export type PrecisionId = keyof typeof PRECISION;

export type ModelSpec = {
  id: string;
  name: string;
  paramsB: number;
  layers: number;
  kvHeads: number;
  headDim: number;
  note: string;
};

export const models: ModelSpec[] = [
  {
    id: "llama31-8b",
    name: "Llama 3.1 8B",
    paramsB: 8,
    layers: 32,
    kvHeads: 8,
    headDim: 128,
    note: "Grouped-query attention. Cache is smaller than a model with 32 key-value heads.",
  },
  {
    id: "llama31-70b",
    name: "Llama 3.1 70B",
    paramsB: 70,
    layers: 80,
    kvHeads: 8,
    headDim: 128,
    note: "Weights dominate. Even INT4 is a datacenter-class memory plan.",
  },
  {
    id: "mistral-7b",
    name: "Mistral 7B",
    paramsB: 7.3,
    layers: 32,
    kvHeads: 8,
    headDim: 128,
    note: "Same cache shape as many 7B grouped-query models.",
  },
  {
    id: "phi3-mini",
    name: "Phi-3 mini 3.8B",
    paramsB: 3.8,
    layers: 32,
    kvHeads: 32,
    headDim: 96,
    note: "Full key-value heads, so the cache grows faster than the parameter count suggests.",
  },
];

/** Weight memory in decimal GB. One billion parameters at 2 bytes is 2 GB. */
export function weightGb(paramsB: number, bytes: number): number {
  return paramsB * bytes;
}

/**
 * KV cache for one transformer pass, decimal GB.
 * elements = 2 (key and value) × layers × kv heads × head dim × sequence × batch
 */
export function kvCacheGb(input: {
  layers: number;
  kvHeads: number;
  headDim: number;
  sequence: number;
  batch: number;
  bytes: number;
}): number {
  const elements =
    2 * input.layers * input.kvHeads * input.headDim * input.sequence * input.batch;
  return (elements * input.bytes) / 1e9;
}

export function formatMemory(gb: number): string {
  if (!Number.isFinite(gb)) return "n/a";
  const sign = gb < 0 ? "-" : "";
  const abs = Math.abs(gb);
  if (abs < 1) return `${sign}${Math.round(abs * 1024)} MB`;
  const digits = abs < 10 ? 2 : 1;
  return `${sign}${abs.toFixed(digits)} GB`;
}

export type PlanInput = {
  latencyMs: number;
  requestsPerDay: number;
  usdPerGpuHour: number;
  hitRate: number;
  cacheLatencyMs: number;
  quant: "none" | "int8" | "int4";
  kvInt8: boolean;
  batching: boolean;
};

export type PlanResult = {
  latencyMs: number;
  weightScale: number;
  kvScale: number;
  throughputScale: number;
  gpuHours: number;
  baselineGpuHours: number;
  cost: number;
  baselineCost: number;
  hitRate: number;
};

/**
 * Planning model, not a benchmark.
 * Baseline is FP16 weights, FP16 cache, no batching, no result cache.
 * Batching changes latency and a separate capacity factor. It does not
 * also shrink GPU-hours, which would count the same effect twice.
 */
export function planOptimization(input: PlanInput): PlanResult {
  let latencyMs = input.latencyMs;
  let weightScale = 1;
  let kvScale = 1;
  let throughputScale = 1;

  if (input.quant === "int8") {
    latencyMs *= 0.75;
    weightScale = 0.5;
  } else if (input.quant === "int4") {
    latencyMs *= 0.55;
    weightScale = 0.25;
  }

  if (input.kvInt8) {
    latencyMs *= 0.97;
    kvScale = 0.5;
  }

  if (input.batching) {
    latencyMs *= 1.25;
    throughputScale = 1.7;
  }

  const hitRate = clamp(input.hitRate, 0, 0.95);
  const miss = 1 - hitRate;
  const gpuHours = (input.requestsPerDay * miss * (latencyMs / 1000)) / 3600;
  const baselineGpuHours =
    (input.requestsPerDay * (input.latencyMs / 1000)) / 3600;

  return {
    latencyMs,
    weightScale,
    kvScale,
    throughputScale,
    gpuHours,
    baselineGpuHours,
    cost: gpuHours * input.usdPerGpuHour,
    baselineCost: baselineGpuHours * input.usdPerGpuHour,
    hitRate,
  };
}

export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function formatHours(hours: number): string {
  if (!Number.isFinite(hours)) return "n/a";
  if (hours < 0.1) return `${(hours * 60).toFixed(1)} min`;
  return `${hours.toFixed(hours < 10 ? 2 : 1)} h`;
}

export function formatUsd(amount: number): string {
  if (!Number.isFinite(amount)) return "n/a";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount < 100 ? 2 : 0,
  }).format(amount);
}

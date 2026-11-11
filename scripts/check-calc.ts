import { kvCacheGb, planOptimization, weightGb } from "../lib/calc.ts";

function assertClose(actual: number, expected: number, label: string) {
  const delta = Math.abs(actual - expected);
  if (delta > 0.02) {
    throw new Error(`${label}: expected ${expected}, got ${actual}`);
  }
}

assertClose(weightGb(8, 2), 16, "fp16 8B weights");
assertClose(weightGb(8, 0.5), 4, "int4 8B weights");
assertClose(
  kvCacheGb({
    layers: 32,
    kvHeads: 8,
    headDim: 128,
    sequence: 4096,
    batch: 1,
    bytes: 2,
  }),
  0.537,
  "llama-like kv",
);

const plan = planOptimization({
  latencyMs: 800,
  requestsPerDay: 100_000,
  usdPerGpuHour: 2,
  hitRate: 0.4,
  cacheLatencyMs: 20,
  quant: "int8",
  kvInt8: false,
  batching: false,
});

assertClose(plan.latencyMs, 600, "int8 latency");
assertClose(plan.baselineGpuHours, 22.22, "baseline hours");
assertClose(plan.gpuHours, 10, "cached int8 hours");
assertClose(plan.cost, 20, "cached int8 cost");

const batched = planOptimization({
  latencyMs: 800,
  requestsPerDay: 100_000,
  usdPerGpuHour: 2,
  hitRate: 0,
  cacheLatencyMs: 20,
  quant: "none",
  kvInt8: false,
  batching: true,
});

assertClose(batched.latencyMs, 1000, "batch latency penalty");
assertClose(batched.throughputScale, 1.7, "batch capacity");
assertClose(batched.gpuHours, batched.baselineGpuHours * 1.25, "batch does not double count");

console.log("calc checks passed");

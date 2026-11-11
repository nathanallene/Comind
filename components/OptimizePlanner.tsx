"use client";

import { useMemo, useState } from "react";
import { formatHours, formatUsd, planOptimization } from "@/lib/calc";

export function OptimizePlanner() {
  const [latencyMs, setLatencyMs] = useState(800);
  const [requestsPerDay, setRequestsPerDay] = useState(100000);
  const [usdPerGpuHour, setUsdPerGpuHour] = useState(2);
  const [quant, setQuant] = useState<"none" | "int8" | "int4">("none");
  const [kvInt8, setKvInt8] = useState(false);
  const [batching, setBatching] = useState(false);
  const [useCache, setUseCache] = useState(false);
  const [hitRate, setHitRate] = useState(0.4);

  const result = useMemo(
    () =>
      planOptimization({
        latencyMs,
        requestsPerDay,
        usdPerGpuHour,
        hitRate: useCache ? hitRate : 0,
        cacheLatencyMs: 20,
        quant,
        kvInt8,
        batching,
      }),
    [latencyMs, requestsPerDay, usdPerGpuHour, quant, kvInt8, batching, useCache, hitRate],
  );

  const hoursDelta = result.baselineGpuHours - result.gpuHours;
  const costDelta = result.baselineCost - result.cost;

  return (
    <div className="tool-layout">
      <form className="controls" onSubmit={(event) => event.preventDefault()}>
        <NumberField id="latency" label="Baseline p50 latency (ms)" value={latencyMs} min={1} max={60000} step={1} onChange={setLatencyMs} />
        <NumberField id="requests" label="Requests per day" value={requestsPerDay} min={1} max={100000000} step={1} onChange={setRequestsPerDay} />
        <NumberField id="price" label="USD per GPU-hour" value={usdPerGpuHour} min={0} max={100} step={0.1} onChange={setUsdPerGpuHour} />

        <fieldset className="choice">
          <legend>Weight precision, from FP16</legend>
          {(
            [
              ["none", "Keep FP16"],
              ["int8", "INT8, plan 0.75× latency and 0.5× weight memory"],
              ["int4", "INT4, plan 0.55× latency and 0.25× weight memory"],
            ] as const
          ).map(([id, label]) => (
            <label key={id}>
              <input
                type="radio"
                name="quant"
                checked={quant === id}
                onChange={() => setQuant(id)}
              />
              {label}
            </label>
          ))}
        </fieldset>

        <label className="check">
          <input type="checkbox" checked={kvInt8} onChange={(event) => setKvInt8(event.target.checked)} />
          INT8 KV cache: 0.5× cache memory, 0.97× latency
        </label>
        <label className="check">
          <input type="checkbox" checked={batching} onChange={(event) => setBatching(event.target.checked)} />
          Continuous batching: 1.7× in-flight capacity, 1.25× p50 latency
        </label>
        <label className="check">
          <input type="checkbox" checked={useCache} onChange={(event) => setUseCache(event.target.checked)} />
          Result cache. Hits use no GPU time in this model.
        </label>
        {useCache ? (
          <div className="field">
            <label htmlFor="hitRate">Cache hit rate: {Math.round(hitRate * 100)}%</label>
            <input
              id="hitRate"
              type="range"
              min={0}
              max={95}
              step={1}
              value={Math.round(hitRate * 100)}
              onChange={(event) => setHitRate(Number(event.target.value) / 100)}
            />
          </div>
        ) : null}
      </form>

      <div className="results" aria-live="polite">
        <p className="kicker">Planned operating point</p>
        <div className="stat-grid">
          <Stat label="p50 latency" value={`${Math.round(result.latencyMs)} ms`} detail={`from ${latencyMs} ms`} />
          <Stat label="GPU time / day" value={formatHours(result.gpuHours)} detail={`${hoursDelta >= 0 ? "down" : "up"} ${formatHours(Math.abs(hoursDelta))}`} />
          <Stat label="Cost / day" value={formatUsd(result.cost)} detail={`${costDelta >= 0 ? "down" : "up"} ${formatUsd(Math.abs(costDelta))}`} />
        </div>
        <ul className="fit-list">
          <li>
            <strong>Weight memory</strong>
            <span>{result.weightScale === 1 ? "Unchanged versus FP16." : `${result.weightScale}× the FP16 weight memory.`}</span>
          </li>
          <li>
            <strong>KV cache</strong>
            <span>{result.kvScale === 1 ? "Unchanged." : `${result.kvScale}× the FP16 cache.`}</span>
          </li>
          <li>
            <strong>In-flight capacity</strong>
            <span>
              {result.throughputScale === 1
                ? "No batching factor applied."
                : `${result.throughputScale}× if the device was throughput-bound. GPU hours above do not use this factor again.`}
            </span>
          </li>
        </ul>
        <p className="disclaimer">
          Coefficients are planning factors for a first cut from an FP16, uncached,
          unbatched baseline. Measure the runtime before you treat them as a result.
          A quality or safety regression is not represented here at all.
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={Number.isFinite(value) ? value : ""}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (!Number.isFinite(next)) return;
          onChange(Math.min(max, Math.max(min, next)));
        }}
      />
    </div>
  );
}

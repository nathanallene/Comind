"use client";

import { useMemo, useState } from "react";
import {
  PRECISION,
  formatMemory,
  kvCacheGb,
  models,
  weightGb,
  type PrecisionId,
} from "@/lib/calc";
import { boards, usableRamGb } from "@/lib/hardware";

const sequences = [512, 1024, 2048, 4096, 8192, 16384, 32768];

export function MemoryCalculator() {
  const [modelId, setModelId] = useState(models[0].id);
  const [paramsB, setParamsB] = useState(models[0].paramsB);
  const [layers, setLayers] = useState(models[0].layers);
  const [kvHeads, setKvHeads] = useState(models[0].kvHeads);
  const [headDim, setHeadDim] = useState(models[0].headDim);
  const [weightPrecision, setWeightPrecision] = useState<PrecisionId>("fp16");
  const [kvPrecision, setKvPrecision] = useState<PrecisionId>("fp16");
  const [sequence, setSequence] = useState(4096);
  const [batch, setBatch] = useState(1);
  const [reserveGb, setReserveGb] = useState(1.5);

  const preset = models.find((item) => item.id === modelId);

  function chooseModel(id: string) {
    setModelId(id);
    const next = models.find((item) => item.id === id);
    if (!next) return;
    setParamsB(next.paramsB);
    setLayers(next.layers);
    setKvHeads(next.kvHeads);
    setHeadDim(next.headDim);
  }

  const result = useMemo(() => {
    const weights = weightGb(paramsB, PRECISION[weightPrecision].bytes);
    const kv = kvCacheGb({
      layers,
      kvHeads,
      headDim,
      sequence,
      batch,
      bytes: PRECISION[kvPrecision].bytes,
    });
    const total = weights + kv + reserveGb;
    return { weights, kv, total };
  }, [paramsB, layers, kvHeads, headDim, sequence, batch, weightPrecision, kvPrecision, reserveGb]);

  return (
    <div className="tool-layout">
      <form className="controls" onSubmit={(event) => event.preventDefault()}>
        <div className="field">
          <label htmlFor="model">Architecture preset</label>
          <select id="model" value={modelId} onChange={(event) => chooseModel(event.target.value)}>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          {preset ? <p className="hint">{preset.note}</p> : null}
        </div>

        <div className="field-row">
          <NumberField id="params" label="Parameters (billions)" value={paramsB} min={0.1} max={500} step={0.1} onChange={setParamsB} />
          <NumberField id="layers" label="Layers" value={layers} min={1} max={200} step={1} onChange={setLayers} />
        </div>
        <div className="field-row">
          <NumberField id="kvHeads" label="Key-value heads" value={kvHeads} min={1} max={128} step={1} onChange={setKvHeads} />
          <NumberField id="headDim" label="Head dimension" value={headDim} min={1} max={512} step={1} onChange={setHeadDim} />
        </div>

        <fieldset className="choice">
          <legend>Weight precision</legend>
          {(Object.keys(PRECISION) as PrecisionId[]).map((id) => (
            <label key={id}>
              <input
                type="radio"
                name="weightPrecision"
                checked={weightPrecision === id}
                onChange={() => setWeightPrecision(id)}
              />
              {PRECISION[id].label}
            </label>
          ))}
        </fieldset>

        <fieldset className="choice">
          <legend>Cache precision</legend>
          {(Object.keys(PRECISION) as PrecisionId[])
            .filter((id) => id !== "fp32")
            .map((id) => (
              <label key={id}>
                <input
                  type="radio"
                  name="kvPrecision"
                  checked={kvPrecision === id}
                  onChange={() => setKvPrecision(id)}
                />
                {PRECISION[id].label}
              </label>
            ))}
        </fieldset>

        <div className="field-row">
          <div className="field">
            <label htmlFor="sequence">Sequence length</label>
            <select
              id="sequence"
              value={sequence}
              onChange={(event) => setSequence(Number(event.target.value))}
            >
              {sequences.map((value) => (
                <option key={value} value={value}>
                  {value.toLocaleString("en-US")} tokens
                </option>
              ))}
            </select>
          </div>
          <NumberField id="batch" label="Batch" value={batch} min={1} max={64} step={1} onChange={setBatch} />
        </div>
        <NumberField
          id="reserve"
          label="Runtime reserve (GB)"
          value={reserveGb}
          min={0}
          max={32}
          step={0.1}
          onChange={setReserveGb}
        />
      </form>

      <div className="results" aria-live="polite">
        <p className="kicker">Planning estimate</p>
        <div className="stat-grid">
          <Stat label="Weights" value={formatMemory(result.weights)} />
          <Stat label="KV cache" value={formatMemory(result.kv)} />
          <Stat label="With reserve" value={formatMemory(result.total)} />
        </div>
        <ul className="fit-list">
          {boards.map((board) => {
            const usable = usableRamGb(board.ramGb);
            const headroom = usable - result.total;
            const fits = headroom >= 0;
            return (
              <li key={board.id} className={fits ? "fit-yes" : "fit-no"}>
                <strong>{board.name}</strong>
                <span>
                  {fits
                    ? `Fits, with ${formatMemory(headroom)} left inside the 75% planning budget.`
                    : `Short by ${formatMemory(Math.abs(headroom))} after the 75% budget.`}
                  {fits && !board.hasAccelerator
                    ? " No tensor accelerator, so speed is a separate question."
                    : ""}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="disclaimer">
          Weights use decimal gigabytes (parameter billions × bytes). The cache formula
          is an architecture estimate, not a runtime profile. Vendor TOPS numbers are not used here.
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
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

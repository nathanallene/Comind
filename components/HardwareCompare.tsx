"use client";

import { useMemo, useState } from "react";
import { boards } from "@/lib/hardware";

const rows: { key: keyof (typeof boards)[number]; label: string }[] = [
  { key: "role", label: "Role" },
  { key: "cpu", label: "CPU" },
  { key: "accelerator", label: "Accelerator" },
  { key: "tops", label: "AI peak" },
  { key: "ramGb", label: "Memory" },
  { key: "bandwidth", label: "Memory bandwidth" },
  { key: "power", label: "Power" },
  { key: "storage", label: "Storage" },
  { key: "os", label: "Software" },
  { key: "fitNote", label: "Typical fit" },
];

export function HardwareCompare() {
  const [selected, setSelected] = useState<string[]>([
    "pi-5-8gb",
    "orin-nano-8gb",
    "orin-nx-16gb",
  ]);
  const [maxWatts, setMaxWatts] = useState(60);
  const [minRam, setMinRam] = useState(0);
  const [acceleratorOnly, setAcceleratorOnly] = useState(false);

  const visible = useMemo(
    () =>
      boards.filter((board) => {
        if (!selected.includes(board.id)) return false;
        if (board.powerWattsMax > maxWatts) return false;
        if (board.ramGb < minRam) return false;
        if (acceleratorOnly && !board.hasAccelerator) return false;
        return true;
      }),
    [selected, maxWatts, minRam, acceleratorOnly],
  );

  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <div className="tool-stack">
      <fieldset className="choice board-picker">
        <legend>Boards</legend>
        {boards.map((board) => (
          <label key={board.id}>
            <input
              type="checkbox"
              checked={selected.includes(board.id)}
              onChange={() => toggle(board.id)}
            />
            {board.name}
          </label>
        ))}
      </fieldset>

      <div className="filter-row">
        <div className="field">
          <label htmlFor="watts">Power ceiling: {maxWatts} W</label>
          <input
            id="watts"
            type="range"
            min={5}
            max={60}
            step={1}
            value={maxWatts}
            onChange={(event) => setMaxWatts(Number(event.target.value))}
          />
        </div>
        <div className="field">
          <label htmlFor="minRam">At least {minRam} GB RAM</label>
          <input
            id="minRam"
            type="range"
            min={0}
            max={32}
            step={1}
            value={minRam}
            onChange={(event) => setMinRam(Number(event.target.value))}
          />
        </div>
        <label className="check">
          <input
            type="checkbox"
            checked={acceleratorOnly}
            onChange={(event) => setAcceleratorOnly(event.target.checked)}
          />
          Tensor accelerator required
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="note">No selected board meets those filters.</p>
      ) : (
        <div className="table-scroll">
          <table className="spec-table">
            <caption>Published specifications for the selected boards.</caption>
            <thead>
              <tr>
                <th scope="col">Spec</th>
                {visible.map((board) => (
                  <th key={board.id} scope="col">
                    {board.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <th scope="row">{row.label}</th>
                  {visible.map((board) => (
                    <td key={board.id}>
                      {row.key === "ramGb" ? `${board.ramGb} GB` : String(board[row.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="disclaimer">
        Jetson TOPS figures are NVIDIA published sparse INT8 peaks, including Super
        modes where noted. Raspberry Pi memory bandwidth is the published bus figure.
        These are not measured workloads.
      </p>
    </div>
  );
}

export type Board = {
  id: string;
  name: string;
  maker: string;
  role: string;
  cpu: string;
  accelerator: string;
  hasAccelerator: boolean;
  tops: string;
  ramGb: number;
  bandwidth: string;
  power: string;
  /** Upper published operating point used by the power filter. */
  powerWattsMax: number;
  storage: string;
  os: string;
  fitNote: string;
};

export const boards: Board[] = [
  {
    id: "pi-zero-2w",
    name: "Raspberry Pi Zero 2 W",
    maker: "Raspberry Pi",
    role: "Very small appliance",
    cpu: "4× Arm Cortex-A53 @ 1.0 GHz",
    accelerator: "None",
    hasAccelerator: false,
    tops: "No dedicated AI accelerator",
    ramGb: 0.5,
    bandwidth: "LPDDR2, shared with the CPU",
    power: "About 2 W active. A 2 A supply is the published recommendation.",
    powerWattsMax: 3,
    storage: "microSD",
    os: "Raspberry Pi OS and other embedded Linux",
    fitNote: "Sensors, control, and small classical models. Not a language-model host.",
  },
  {
    id: "pi-5-8gb",
    name: "Raspberry Pi 5 (8 GB)",
    maker: "Raspberry Pi",
    role: "General compact computer",
    cpu: "Broadcom BCM2712, 4× Cortex-A76 @ 2.4 GHz",
    accelerator: "VideoCore VII graphics, no NPU",
    hasAccelerator: false,
    tops: "No dedicated AI accelerator",
    ramGb: 8,
    bandwidth: "LPDDR4X-4267, up to 17 GB/s",
    power:
      "5 V / 5 A USB-C supply (27 W official supply). Bare-board active draw is about 4 W before USB devices and NVMe.",
    powerWattsMax: 12,
    storage: "microSD, or NVMe through a PCIe 2.0 x1 HAT",
    os: "Raspberry Pi OS and other embedded Linux",
    fitNote: "Prototypes, gateways, and quantized models that fit in memory and can tolerate CPU inference.",
  },
  {
    id: "orin-nano-8gb",
    name: "Jetson Orin Nano 8 GB",
    maker: "NVIDIA",
    role: "Entry edge AI module",
    cpu: "6× Arm Cortex-A78AE, up to 1.7 GHz in Super mode",
    accelerator: "Ampere GPU, 1024 CUDA cores, 32 Tensor cores",
    hasAccelerator: true,
    tops: "67 sparse INT8 TOPS (33 dense) in Super mode",
    ramGb: 8,
    bandwidth: "8 GB LPDDR5, 102 GB/s",
    power: "7 W to 25 W reference modes",
    powerWattsMax: 25,
    storage: "NVMe or SD, depending on the carrier",
    os: "JetPack / Ubuntu-based embedded Linux",
    fitNote: "Camera and robotics pipelines whose weights and cache fit in 8 GB.",
  },
  {
    id: "orin-nx-16gb",
    name: "Jetson Orin NX 16 GB",
    maker: "NVIDIA",
    role: "Compact multi-model module",
    cpu: "8× Arm Cortex-A78AE @ 2.0 GHz",
    accelerator: "Ampere GPU, 1024 CUDA cores, 32 Tensor cores, plus a DLA",
    hasAccelerator: true,
    tops: "157 sparse INT8 TOPS (78 dense) in Super mode",
    ramGb: 16,
    bandwidth: "16 GB LPDDR5, 102 GB/s",
    power: "10 W to 40 W reference modes",
    powerWattsMax: 40,
    storage: "External NVMe",
    os: "JetPack / Ubuntu-based embedded Linux",
    fitNote: "Several vision models, or a quantized 7B–8B language model with a short context.",
  },
  {
    id: "agx-orin-64gb",
    name: "Jetson AGX Orin 64 GB",
    maker: "NVIDIA",
    role: "High-end edge server",
    cpu: "12× Arm Cortex-A78AE, up to 2.2 GHz",
    accelerator: "Ampere GPU, 2048 CUDA cores, 64 Tensor cores, 2× DLA",
    hasAccelerator: true,
    tops: "275 sparse INT8 TOPS",
    ramGb: 64,
    bandwidth: "64 GB LPDDR5, 204.8 GB/s",
    power: "Configurable, up to 60 W",
    powerWattsMax: 60,
    storage: "64 GB eMMC, plus NVMe",
    os: "JetPack / Ubuntu-based embedded Linux",
    fitNote: "Large on-device models and several concurrent pipelines. It is compact relative to a rack server, not relative to a Pi.",
  },
];

export function usableRamGb(ramGb: number): number {
  return ramGb * 0.75;
}

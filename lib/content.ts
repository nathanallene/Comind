export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; text: string };

export type Service = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  lede: string;
  needs: string[];
  delivers: string[];
  measures: string[];
  related: { href: string; label: string }[];
};

export type Study = {
  slug: string;
  title: string;
  sector: string;
  summary: string;
  metrics: { label: string; value: string }[];
  problem: string[];
  approach: string[];
  result: string[];
};

export type Article = {
  slug: string;
  kind: "Tutorial" | "Article" | "Experiment";
  title: string;
  date: string;
  summary: string;
  blocks: Block[];
};

export const services: Service[] = [
  {
    slug: "client-solutions",
    number: "01",
    title: "Client-focused solutions",
    summary:
      "The requirement is written down before the architecture. The design has to serve that requirement.",
    lede: "Every engagement starts from the client's objective and the limits that are not open to negotiation. The software, the model, and the hardware choice are answers to that brief, not a product we already intended to sell.",
    needs: [
      "The business or operational objective, in the client's words.",
      "The technical limits: latency, accuracy, safety, unit cost, power, or an existing machine.",
      "The systems, data, and teams already in place.",
      "Who decides that the result is acceptable.",
    ],
    delivers: [
      "A written scope that names the objective and the limits.",
      "An architecture that states its tradeoffs.",
      "An implementation plan with the measures that will decide success.",
      "Software or model work that can be checked against that plan.",
    ],
    measures: [
      "Whether the stated objective is met on the client's data or line, not on a demo set.",
      "Which limits were held, and which moved, with the reason recorded.",
    ],
    related: [
      { href: "/consult", label: "Submit a project brief" },
      { href: "/work", label: "See how a result is reported" },
    ],
  },
  {
    slug: "ai-optimization",
    number: "02",
    title: "AI product optimization",
    summary:
      "Accuracy, safety, speed, memory, and cost are tuned together. A faster model that misses the bar is not an improvement.",
    lede: "We profile the path the product actually runs, then change the model, the runtime, or the hardware assignment. The goal is a better operating point: more reliable answers, lower latency, less memory, less power, or a lower cost per successful result.",
    needs: [
      "The task definition and the set used to judge accuracy.",
      "The safety or quality bar that cannot move.",
      "Current latency, throughput, memory, power, and cost.",
      "Access to the runtime that will ship, not only a notebook.",
    ],
    delivers: [
      "A profile of where time, memory, and money go.",
      "A chosen operating point, with quantization, batching, caching, or a model change applied only where the measurements support it.",
      "A regression check on the client's task set.",
      "A short record of what was tried and what was rejected.",
    ],
    measures: [
      "Task accuracy and the failure cases that matter.",
      "Latency distribution, not a single average.",
      "Memory, power, and cost per successful result.",
    ],
    related: [
      { href: "/tools/memory", label: "Estimate model memory" },
      { href: "/tools/optimize", label: "Sketch an optimization plan" },
      { href: "/journal/quantization-is-a-measurement", label: "Read the quantization note" },
    ],
  },
  {
    slug: "software",
    number: "03",
    title: "Custom software development",
    summary:
      "New products and applications, and the slower work of upgrading, maintaining, and making an existing system understandable.",
    lede: "We design and build software for the job in front of us. That includes a new product and the less visible work on a system that already runs: upgrades, maintenance, and performance repairs that have to respect the people who operate it.",
    needs: [
      "Who uses the system and what they do with it today.",
      "The parts that must keep working during the change.",
      "Interfaces, data stores, and deployment constraints.",
      "How the team will own the code after delivery.",
    ],
    delivers: [
      "A product or application built to the written scope.",
      "Upgrades and maintenance on existing projects, with behavior changes called out.",
      "Tests around the paths that carry the business risk.",
      "Documentation the next engineer can use without a tour.",
    ],
    measures: [
      "The user task completes on the agreed path.",
      "Defects found after release, and the time to repair them.",
      "Whether a new engineer can change the system from the repository alone.",
    ],
    related: [
      { href: "/consult", label: "Describe the software you need" },
      { href: "/work/service-desk-rebuild", label: "Read the maintenance study" },
    ],
  },
  {
    slug: "on-site",
    number: "04",
    title: "On-site development",
    summary:
      "Engineers work at the client's premises when the system can only be understood in the room.",
    lede: "Some projects stall because the important detail is on a line, a lab bench, or a device that cannot leave the building. We place engineers at the premises for that part of the work, and we write down what was decided before we leave.",
    needs: [
      "A named technical counterpart on site.",
      "Access to the hardware, network, and safety rules.",
      "A clear slice of work for the visit, not an open-ended presence.",
      "A way to record decisions where the rest of the team can read them.",
    ],
    delivers: [
      "Engineers working beside the client's team.",
      "Bring-up, integration, and debugging done on the real system.",
      "A written record of what changed, what was measured, and what remains.",
    ],
    measures: [
      "The on-site objective is demonstrated on the client's equipment.",
      "The remote team can continue from the notes without repeating the visit.",
    ],
    related: [
      { href: "/consult", label: "Request on-site support" },
      { href: "/journal/on-site-scoped", label: "How an on-site visit is scoped" },
    ],
  },
  {
    slug: "embedded",
    number: "05",
    title: "Embedded systems and compact computing",
    summary:
      "Applications for single-board computers and other small devices, tuned for time, memory, and power.",
    lede: "We develop and optimize software for compact computers: Raspberry Pi, NVIDIA Jetson, and other ARM boards running embedded Linux. The board that will ship is the test bench. Processing time, memory, and power are measured there.",
    needs: [
      "The target device, or a short list of candidates.",
      "The power, thermal, and enclosure limits.",
      "The sensors, cameras, or buses the software must talk to.",
      "The performance bar, stated as a number.",
    ],
    delivers: [
      "Application software for the chosen board and OS.",
      "A hardware recommendation when the current board cannot hold the workload.",
      "Memory, latency, and power measurements on that device.",
      "A deployment path the client's team can repeat.",
    ],
    measures: [
      "Latency and throughput on the target, under the power cap that will ship.",
      "Memory high-water mark, including the operating system.",
      "Energy per result when the device is battery- or thermally limited.",
    ],
    related: [
      { href: "/tools/hardware", label: "Compare compact boards" },
      { href: "/tools/memory", label: "Check whether a model fits" },
      { href: "/journal/what-eight-gigabytes-holds", label: "Read the memory tutorial" },
    ],
  },
];

export const studies: Study[] = [
  {
    slug: "line-inspection",
    title: "Inspection on a Jetson, inside an existing line",
    sector: "Manufacturing",
    summary:
      "A vision model had to reject bad parts without a new rack, a new power budget, or a rise in false rejects.",
    metrics: [
      { label: "End-to-end latency", value: "180 ms to 41 ms" },
      { label: "Module power mode", value: "25 W to 15 W" },
      { label: "False rejects", value: "4.8% to 1.1%" },
    ],
    problem: [
      "The line already had a controller cabinet and a power allocation. A datacenter-style GPU server was not an option. The first model met the accuracy target in a lab notebook and missed the cycle time on the module.",
      "Quality would not accept a faster model that threw out good parts. The false-reject rate was the constraint that ranked above latency.",
    ],
    approach: [
      "We measured the on-device path: capture, preprocess, inference, and the decision written back to the line controller. Most of the 180 ms was not the network itself.",
      "The model was converted and quantized only after a task set from the line, including the rare defects, was frozen. We then dropped the module from its 25 W mode to 15 W and remeasured, because the thermal cap on that cabinet could not hold the higher mode through a shift.",
    ],
    result: [
      "At 15 W the inspected part finished in 41 ms, inside the cycle time, and the false-reject rate fell because the task set had included the cases the lab set skipped. The sample figures above are how this kind of result is reported: three numbers, each tied to a constraint the client named.",
    ],
  },
  {
    slug: "support-assistant",
    title: "A support model that cost more than the tickets",
    sector: "Software product",
    summary:
      "The assistant was accurate enough and too expensive. The work was to cut cost per resolved ticket without loosening the answer check.",
    metrics: [
      { label: "Cost per resolved ticket", value: "Down 62%" },
      { label: "p95 response", value: "4.2 s to 1.6 s" },
      { label: "Answers held for review", value: "Unchanged bar" },
    ],
    problem: [
      "The product called a large model for every turn, including questions that repeated all day. Token cost dominated the unit economics. A smaller model had already been tried and rejected because it missed policy answers.",
    ],
    approach: [
      "We split the path. Repeated questions with a known answer were served from a cache keyed on the normalized question and the policy version. The large model stayed on the turns that changed a customer outcome. INT8 was applied only on the draft model used for classification, and every policy answer was still checked against the same review rule as before.",
      "Latency was reported as a percentile. The average had looked fine while the tail made the product feel stalled.",
    ],
    result: [
      "GPU time fell because most turns never reached the large model. The review bar did not move. Cost per resolved ticket is the number the business used; latency is the number the user felt.",
    ],
  },
  {
    slug: "service-desk-rebuild",
    title: "An internal tool, upgraded without a rewrite",
    sector: "Operations software",
    summary:
      "The system was old, in daily use, and unsafe to replace in one step. Maintenance and new function had to share one plan.",
    metrics: [
      { label: "Release cadence", value: "Monthly to weekly" },
      { label: "Unplanned fixes", value: "Down by half in a quarter" },
      { label: "Pages still on the old stack", value: "Named, not hidden" },
    ],
    problem: [
      "A full rewrite had been proposed twice and had not started. Dispatchers used the tool every hour. The request was to add two workflows and stop the failures that arrived after each release.",
    ],
    approach: [
      "We mapped the paths dispatchers actually used and put tests on those first. New screens were built beside the old ones, against the same data. Each release listed which screens had moved and which had not. Maintenance work and the new workflows were scheduled in the same list so one did not starve the other.",
    ],
    result: [
      "The team shipped weekly because the risky paths were covered and the unfinished migration was visible. The old stack was reduced on purpose, screen by screen, instead of being declared done.",
    ],
  },
  {
    slug: "pi-fleet",
    title: "A Raspberry Pi fleet that ran out of memory",
    sector: "Field devices",
    summary:
      "The application fit in the lab and failed in the cabinet after a day. The fix was memory, logging, and a power budget, measured on the device.",
    metrics: [
      { label: "Resident memory", value: "Down 40%" },
      { label: "Uptime in cabinet", value: "Hours to 30 days" },
      { label: "Idle board power", value: "Cut by removing a USB radio" },
    ],
    problem: [
      "A monitoring app on Raspberry Pi boards worked on an engineer's desk and was killed by the kernel after a day in the field. Logs, a local database, and a USB radio shared a small board. The failure only appeared with the cabinet closed and the supply shared with other gear.",
    ],
    approach: [
      "An engineer worked on site with the client's technician for the bring-up. We recorded resident memory over a scripted day, then cut log retention, moved the database writes off the hot path, and replaced the USB radio with a hat the power budget could hold. The same image was rolled to a pilot group before the rest of the fleet.",
    ],
    result: [
      "The pilot stayed up for 30 days under the cabinet's supply. Memory and power were both part of the acceptance check, because either one could take the device down.",
    ],
  },
];

export const articles: Article[] = [
  {
    slug: "what-eight-gigabytes-holds",
    kind: "Tutorial",
    title: "What 8 GB actually holds",
    date: "2026-03-12",
    summary:
      "Parameter count, precision, and the key-value cache, and why a board's labeled RAM is not the memory your model can use.",
    blocks: [
      {
        type: "p",
        text: "A board sold as 8 GB does not offer 8 GB to a model. The operating system, the runtime, and a spike during the first tokens all take a share. For planning we keep a quarter of the labeled RAM aside and only then ask whether the weights and the cache fit.",
      },
      {
        type: "h2",
        text: "Weights are a multiplication",
      },
      {
        type: "p",
        text: "Weight memory in gigabytes is the parameter count, in billions, times the bytes per parameter. An 8B model at FP16 is 16 GB. The same model at INT8 is 8 GB. At INT4 it is 4 GB. That part is arithmetic. It does not say whether the answers are still good.",
      },
      {
        type: "ul",
        items: [
          "FP32 stores 4 bytes per parameter.",
          "FP16 and BF16 store 2 bytes.",
          "INT8 stores 1 byte.",
          "INT4 stores half a byte.",
        ],
      },
      {
        type: "h2",
        text: "The cache grows with the conversation",
      },
      {
        type: "p",
        text: "A transformer also stores keys and values for the tokens already seen. A practical estimate is 2 × layers × key-value heads × head dimension × sequence length × batch size × bytes per element. The 2 counts keys and values. Grouped-query models use fewer key-value heads than query heads, so their cache is smaller than the parameter count suggests.",
      },
      {
        type: "note",
        text: "Llama 3.1 8B, FP16 cache, 4,096 tokens, batch 1: 32 layers, 8 key-value heads, head size 128. That is about 537 MB. INT8 cache is about half of that. Phi-3 mini has 32 key-value heads, so its cache is large for its size.",
      },
      {
        type: "h2",
        text: "What that means on a real board",
      },
      {
        type: "p",
        text: "An 8B model at FP16, plus a 4k cache and a 1.5 GB reserve, is about 18 GB. It does not fit an 8 GB Jetson or a Raspberry Pi 5, and it does not fit a 16 GB module once the reserve is honored. INT8 weights bring the same plan to about 10 GB, which fits a 16 GB module and not an 8 GB one. INT4 weights plus an INT8 cache land near 6 GB, which can fit an 8 GB board on paper.",
      },
      {
        type: "p",
        text: "Fitting in RAM is not the same as running at a useful speed. A Raspberry Pi 5 has no tensor accelerator. A Jetson has one, and its published TOPS figure is a vendor peak, usually sparse INT8, not the throughput of your model. Use the memory calculator for the fit, then measure latency and power on the device you will ship.",
      },
    ],
  },
  {
    slug: "quantization-is-a-measurement",
    kind: "Article",
    title: "Quantization is a measurement, not a setting",
    date: "2026-05-20",
    summary:
      "INT8 and INT4 change memory in a way you can predict. They change accuracy in a way you have to test.",
    blocks: [
      {
        type: "p",
        text: "Turning a model down to INT8 or INT4 is often described as an optimization switch. The memory effect is predictable. The effect on the client's task is not. A model that is faster and wrong more often has not been optimized. It has been changed.",
      },
      {
        type: "h2",
        text: "What you can plan, and what you cannot",
      },
      {
        type: "p",
        text: "From an FP16 baseline, INT8 weights are half the memory and INT4 weights are a quarter. Latency often falls too, but the factor depends on the runtime and the device. Treat any latency factor you did not measure as a planning sketch. The optimization tool on this site is that kind of sketch. It is not a benchmark.",
      },
      {
        type: "h2",
        text: "The set has to match the job",
      },
      {
        type: "p",
        text: "Perplexity and a generic leaderboard will not tell you if a defect class disappeared or a policy answer softened. Freeze the set the client will use to accept the system before you quantize. Include the rare cases. Run that set at each precision you intend to ship, and keep the failures, not only the score.",
      },
      {
        type: "ul",
        items: [
          "Do not quantize a model that already fits and already meets the bar, unless cost or power requires it.",
          "Do not quantize the safety check and the draft with the same optimism. A classifier that routes work can be INT8 while the final answer stays at a higher precision.",
          "Do not calibrate on clean lab text if production text is short, noisy, or in another language.",
        ],
      },
      {
        type: "h2",
        text: "Safety is part of the number",
      },
      {
        type: "p",
        text: "If the product can refuse, quote a source, or hand a case to a person, those behaviors need the same before-and-after check as accuracy. A smaller model that stops refusing is a regression even when the average score rises.",
      },
    ],
  },
  {
    slug: "cache-batch-power",
    kind: "Experiment",
    title: "A cache, a batch, and a power cap",
    date: "2026-08-04",
    summary:
      "A worked planning pass: where GPU time actually goes, and why a power mode can erase a latency win.",
    blocks: [
      {
        type: "p",
        text: "This is a paper exercise with stated assumptions, not a device log. The numbers are here so the method is visible. Replace them with measurements before you make a design decision.",
      },
      {
        type: "h2",
        text: "The baseline",
      },
      {
        type: "p",
        text: "Assume 100,000 requests a day, 800 ms each, on one GPU billed at USD 2 an hour. GPU time is 100,000 × 0.8 seconds, which is 22.2 hours. Cost is about USD 44 a day. Nothing in that sentence is a property of a model. It is arithmetic on three inputs you can measure or price.",
      },
      {
        type: "h2",
        text: "Three changes, counted once each",
      },
      {
        type: "p",
        text: "INT8 weights, as a planning factor of 0.75× latency from FP16, bring 800 ms to 600 ms and the day to 16.7 GPU hours. A result cache that hits 40% of requests removes those hits from the GPU entirely, which matters more than the quantization step: 60,000 misses at 600 ms is 10 GPU hours, about USD 20. Batching is a different lever. It can raise how many requests are in flight, and it often raises the latency of each one. This plan uses 1.7× in-flight capacity and 1.25× latency, and it does not also shrink GPU hours. Counting both would be double entry.",
      },
      {
        type: "note",
        text: "Cached requests in this model cost no GPU time. If your cache still calls the model to refresh, put that cost back in.",
      },
      {
        type: "h2",
        text: "Then the power cap",
      },
      {
        type: "p",
        text: "On a Jetson, the same binary at 25 W and at 15 W is not the same latency. Super-mode peaks assume a power and thermal budget a closed cabinet may not have. If the acceptance test is run at the wattage that will ship, a 41 ms result is real. If it is run uncapped on a bench, it is a different device. Measure p50, p95, joules per accepted result, and accuracy on the client set, at the power mode you will leave in the field.",
      },
    ],
  },
  {
    slug: "on-site-scoped",
    kind: "Article",
    title: "On-site work, scoped before the visit",
    date: "2026-09-16",
    summary:
      "What an engineer needs on the client's premises, and what has to be written down before they leave.",
    blocks: [
      {
        type: "p",
        text: "Sending an engineer to a building is justified when the system cannot be understood from logs and calls. It is not justified as a way to avoid writing the problem down. The visit needs a slice of work, a person on the other side, and a record that outlives the trip.",
      },
      {
        type: "h2",
        text: "Before anyone travels",
      },
      {
        type: "ul",
        items: [
          "The objective of the visit, in one paragraph, with the demonstration that will end it.",
          "Access: safety induction, accounts, the physical device, and the hours it may be stopped.",
          "The counterpart who can change a setting or answer for the line.",
          "The remote team still responsible for the rest of the system.",
        ],
      },
      {
        type: "h2",
        text: "During the visit",
      },
      {
        type: "p",
        text: "The useful work is usually bring-up, integration, and measurement on the real hardware. Pair with the client's technician when the cabinet, the supply, or the process is theirs. Decisions made out loud are easy to lose. Write the change, the measurement, and the thing that did not work in the same day.",
      },
      {
        type: "h2",
        text: "Leaving",
      },
      {
        type: "p",
        text: "The visit is finished when the agreed demonstration has been seen and the notes are enough for someone who was not in the room. A follow-up trip is a new scope, not a sign that presence should have been open-ended.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((item) => item.slug === slug);
}

export function getStudy(slug: string): Study | undefined {
  return studies.find((item) => item.slug === slug);
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((item) => item.slug === slug);
}

export function readingMinutes(blocks: Block[]): number {
  const words = blocks
    .map((block) => (block.type === "ul" ? block.items.join(" ") : block.text))
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}

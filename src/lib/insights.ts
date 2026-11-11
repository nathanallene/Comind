export type Insight = {
  slug: string
  group: string
  title: string
  summary: string
}

export const insights: Insight[] = [
  {
    slug: "understanding-quantization",
    group: "AI Engineering",
    title: "Understanding AI Model Quantization",
    summary:
      "Quantization stores model weights in fewer bits. Memory drops in a way you can calculate. Accuracy does not. Any production change still needs an evaluation set from the real task.",
  },
  {
    slug: "llm-deployment",
    group: "AI Engineering",
    title: "Practical LLM Deployment Strategies",
    summary:
      "A deployment choice is where the model runs, which precision it uses, and how requests are batched. Local inference, a hosted API, and a private GPU each change latency, cost, and what data leaves the building.",
  },
  {
    slug: "inference-performance",
    group: "AI Engineering",
    title: "Improving AI Inference Performance",
    summary:
      "Inference time is usually weights, the key-value cache, and the batch. Measure the slow path on the hardware that will serve traffic before changing the model.",
  },
  {
    slug: "evaluating-accuracy",
    group: "AI Engineering",
    title: "Evaluating AI Application Accuracy",
    summary:
      "Accuracy is a measurement on the client's data, not a setting in a config file. Define the pass bar, the failure that matters, and who signs off before tuning for speed.",
  },
  {
    slug: "reliable-assistants",
    group: "AI Engineering",
    title: "Building Reliable AI Assistants",
    summary:
      "A reliable assistant has a bounded task, a way to refuse or escalate, and a log of what it did. Reliability is tested on the cases that used to fail, not on a demo prompt.",
  },
  {
    slug: "local-vs-cloud",
    group: "AI Engineering",
    title: "Local AI vs. Cloud AI",
    summary:
      "Local inference keeps data on hardware you control and is limited by that hardware. A cloud API removes the device limit and adds latency, cost per request, and a data-handling decision.",
  },
  {
    slug: "agentic-architecture",
    group: "Agentic AI & Automation",
    title: "Understanding Agentic AI Architecture",
    summary:
      "An agent is a model plus tools, memory, and a stop condition. The architecture should name which tools exist, what they are allowed to change, and when a person must approve.",
  },
  {
    slug: "tool-calling",
    group: "Agentic AI & Automation",
    title: "Building AI Agents with Tool Calling",
    summary:
      "Tool calling works when each function has a narrow contract: inputs, outputs, and the side effect it is allowed to cause. Wide tools are harder to test and harder to revoke.",
  },
  {
    slug: "human-in-the-loop",
    group: "Agentic AI & Automation",
    title: "Designing Human-in-the-Loop Systems",
    summary:
      "Human approval belongs on the steps that spend money, change records, or send something a person cannot undo. The queue should show the proposed action and the evidence the model used.",
  },
  {
    slug: "n8n-architecture",
    group: "Agentic AI & Automation",
    title: "n8n Workflow Architecture",
    summary:
      "A maintainable n8n workflow has a clear trigger, a small number of responsibilities per workflow, and sub-workflows for anything reused. Credentials and error paths are part of the design.",
  },
  {
    slug: "workflow-errors",
    group: "Agentic AI & Automation",
    title: "Reliable Workflow Error Handling",
    summary:
      "Retries help transient failures. They hide permanent ones if every error is retried the same way. Separate retryable calls from steps that must stop and notify a person.",
  },
  {
    slug: "ai-business-apps",
    group: "Agentic AI & Automation",
    title: "Integrating AI with Business Applications",
    summary:
      "Integration starts from the system of record. The model should read and write through the same APIs the rest of the business uses, with the same permissions.",
  },
  {
    slug: "understanding-rag",
    group: "RAG & Knowledge Systems",
    title: "Understanding Retrieval-Augmented Generation",
    summary:
      "RAG answers from retrieved passages instead of from the model alone. Quality depends on what was ingested, how it was chunked, and whether the search returns the passage a person would cite.",
  },
  {
    slug: "document-pipelines",
    group: "RAG & Knowledge Systems",
    title: "Designing Effective Document Processing Pipelines",
    summary:
      "A pipeline extracts text, keeps the source and date, chunks on a boundary a reader would recognize, and can be run again when the document changes.",
  },
  {
    slug: "vector-vs-hybrid",
    group: "RAG & Knowledge Systems",
    title: "Vector Search vs. Hybrid Search",
    summary:
      "Vector search finds similar meaning. Keyword search finds exact names, codes, and phrases. Hybrid search uses both when the corpus contains both prose and identifiers.",
  },
  {
    slug: "retrieval-quality",
    group: "RAG & Knowledge Systems",
    title: "Improving Retrieval Quality",
    summary:
      "Retrieval quality is measured by whether the right passage is in the set the model sees. Tune chunking, metadata, and ranking against questions from the real users.",
  },
  {
    slug: "private-knowledge",
    group: "RAG & Knowledge Systems",
    title: "Building Private Knowledge Assistants",
    summary:
      "A private assistant only retrieves documents the asking user is allowed to see. Access checks belong in the retrieval step, before the model writes an answer.",
  },
  {
    slug: "pi-ai",
    group: "Embedded & Edge Computing",
    title: "Running AI Models on Raspberry Pi",
    summary:
      "A Raspberry Pi has a small memory budget and no discrete GPU on most boards. A model fits only after you account for the operating system, the runtime, and the cache, not just the weight file.",
  },
  {
    slug: "jetson-edge",
    group: "Embedded & Edge Computing",
    title: "NVIDIA Jetson for Edge AI",
    summary:
      "Jetson modules publish power modes and accelerator limits. A vision or language workload still has to be measured on the module, at the power mode the product will use.",
  },
  {
    slug: "embedded-linux",
    group: "Embedded & Edge Computing",
    title: "Optimizing Embedded Linux Applications",
    summary:
      "On embedded Linux, the useful work is often memory that stays resident, logs that fill the disk, and a service that does not recover after a power cut.",
  },
  {
    slug: "limited-ram",
    group: "Embedded & Edge Computing",
    title: "Running AI with Limited RAM",
    summary:
      "Labeled RAM is not the memory a model can use. The operating system, runtime, and key-value cache all take a share. The remaining figure is what the weights must fit inside.",
  },
  {
    slug: "compact-platforms",
    group: "Embedded & Edge Computing",
    title: "Comparing Compact Computing Platforms",
    summary:
      "Compare boards on published memory, power, and accelerator specs, then on the workload you will actually run. Peak TOPS is a vendor figure, not a measured application result.",
  },
  {
    slug: "power-efficiency",
    group: "Embedded & Edge Computing",
    title: "Improving Power and Resource Efficiency",
    summary:
      "A lower power mode can erase a latency win. Record power, temperature, and the task result together so a cooler device is not mistaken for a better product.",
  },
  {
    slug: "maintainable-apis",
    group: "Software Engineering",
    title: "Designing Maintainable APIs",
    summary:
      "A maintainable API has a small surface, explicit errors, and a version story. Callers should be able to tell a bad request from a failed dependency.",
  },
  {
    slug: "app-performance",
    group: "Software Engineering",
    title: "Application Performance Optimization",
    summary:
      "Start from a trace of the slow request. Optimize the path users hit, and keep a before-and-after measurement on that path.",
  },
  {
    slug: "database-integration",
    group: "Software Engineering",
    title: "Database Integration Best Practices",
    summary:
      "Integration should use the constraints and transactions the database already provides. A second copy of the same record needs an owner and a refresh rule.",
  },
  {
    slug: "monitoring-debugging",
    group: "Software Engineering",
    title: "Monitoring and Debugging Applications",
    summary:
      "Logs, metrics, and a way to reproduce the failing request are the minimum. An alert should name the user-visible symptom, not only a saturated resource.",
  },
  {
    slug: "reliable-software",
    group: "Software Engineering",
    title: "Building Reliable Software Systems",
    summary:
      "Reliability is what the system does when a dependency fails, a deploy goes wrong, or the input is incomplete. Those cases belong in the test plan.",
  },
]

export function getInsight(slug: string) {
  return insights.find((item) => item.slug === slug)
}

export const insightGroups = Array.from(new Set(insights.map((item) => item.group)))

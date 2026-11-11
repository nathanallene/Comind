export type ServiceDetail = {
  id: string
  number: string
  title: string
  headline: string
  summary: string
  capabilitiesLabel: string
  capabilities: string[]
  close: string
}

export const serviceDetails: ServiceDetail[] = [
  {
    id: "education",
    number: "01",
    title: "AI Education & Training",
    headline: "",
    summary:
      "We provide educational resources and structured learning experiences to help individuals understand and develop practical skills in artificial intelligence.",
    capabilitiesLabel: "Our educational focus includes:",
    capabilities: [
      "Artificial Intelligence Fundamentals",
      "Generative AI Technologies",
      "Machine Learning Fundamentals",
      "AI Tools and Applications",
      "Practical AI Learning Exercises",
    ],
    close: "",
  },
  {
    id: "mentorship",
    number: "02",
    title: "Technical Mentorship",
    headline: "",
    summary:
      "We connect individuals with experienced technology professionals who share practical knowledge and technical guidance.",
    capabilitiesLabel: "Our mentorship focuses on:",
    capabilities: [
      "AI Engineering Knowledge",
      "Software Development Fundamentals",
      "Technical Problem-Solving",
      "Programming and Development Skills",
      "Professional Knowledge Sharing",
    ],
    close: "",
  },
  {
    id: "platform",
    number: "03",
    title: "AI Platform & Opportunity Guidance",
    headline: "",
    summary:
      "We provide general educational guidance to help individuals understand the AI industry and independently explore relevant third-party platforms.",
    capabilitiesLabel: "Our support includes:",
    capabilities: [
      "Introduction to AI Training and Evaluation Platforms",
      "Understanding Platform Requirements",
      "General Workflow Education",
      "AI Industry Knowledge Sharing",
      "Independent Opportunity Exploration",
    ],
    close:
      "Participation in external platforms is independent and subject to each platform's terms, eligibility requirements and policies. We do not operate or represent these platforms.",
  },
  {
    id: "software",
    number: "04",
    title: "AI & Software Development",
    headline: "",
    summary:
      "We develop software and AI-powered solutions to help businesses address technical challenges and improve their digital capabilities.",
    capabilitiesLabel: "Our development services include:",
    capabilities: [
      "Custom Software Development",
      "AI-Powered Applications",
      "Machine Learning Solutions",
      "AI System Integration",
      "Application Development and Maintenance",
    ],
    close: "",
  },
  {
    id: "automation",
    number: "05",
    title: "Intelligent Automation",
    headline: "",
    summary:
      "We help businesses streamline operations and improve productivity through intelligent automation technologies.",
    capabilitiesLabel: "Our solutions include:",
    capabilities: [
      "Business Process Automation",
      "AI-Powered Workflow Automation",
      "Automated Data Processing",
      "Intelligent Chatbots and Assistants",
      "Workflow Integration Solutions",
    ],
    close: "",
  },
  {
    id: "consulting",
    number: "06",
    title: "Technology Consulting & Collaboration",
    headline: "",
    summary:
      "We provide technology consulting and develop international professional relationships to support innovation and technology development.",
    capabilitiesLabel: "Our services include:",
    capabilities: [
      "AI Technology Consulting",
      "Software Engineering Consulting",
      "Technical Project Planning",
      "US–Taiwan Technology Collaboration",
      "International Professional Networking",
    ],
    close: "",
  },
]

export interface Project {
  title: string;
  description: string;
  stack: string[];
  color: string;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    title: "Electric Rainbow",
    description:
      "An interactive music visualization system that transforms live guitar audio into synchronized abstract visual art in real time. Built as part of my engineering capstone at UBC.",
    stack: ["Electron", "Node.js", "JavaScript", "Python", "Raspberry Pi"],
    color: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f2845 100%)",
    github: "https://github.com/anant248/electric-rainbow",
    live: "https://www.linkedin.com/posts/anant-goyal1_ubcengineering-ugcPost-7053884815351152640-UId1?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC4bAoEBMtyzw4uoYmMdxn6YVavtjk5_4nY",
  },
  {
    title: "Hybrid Distributed File System (HyDFS)",
    description:
      "Built a fault-tolerant distributed file system and stream processing engine with replication and failure recovery mechanisms inspired by Hadoop and Apache Spark.",
    stack: ["Java", "Hadoop", "Apache Spark"],
    color: "linear-gradient(135deg, #0a1628 0%, #0d2137 50%, #0a2f3a 100%)",
    github: "https://github.com/anant248/hybrid-dfs",
  },
  {
    title: "InterPrep",
    description:
      "Built a real-time mock interview platform that analyzes non-verbal communication during behavioral interviews using live webcam input. Implemented computer vision pipelines with Google MediaPipe to generate eye contact and facial expression feedback in real time.",
    stack: ["Next.js", "TypeScript", "Google MediaPipe", "Computer Vision"],
    color: "linear-gradient(135deg, #130a2e 0%, #1e1040 60%, #2a1060 100%)",
    github: "https://github.com/anant248/neurohack",
    live: "https://neurohack25.vercel.app/"
  },
  {
    title: "XLG Inspector",
    description:
      "Built a large-scale load generation inspection and benchmarking system for analyzing coordinated omission and latency reporting behavior in modern load generators. This work received a top paper nomination.",
    stack: ["Go", "Distributed Systems", "Benchmarking", "Performance Engineering"],
    color: "linear-gradient(135deg, #0b1320 0%, #14213d 60%, #1f3a5f 100%)",
    github: "https://github.com/adas2125/vegeta",
    live: "https://drive.google.com/file/d/14DCZWsXL1KE_RpJ_sgwB8VqG2ktp30wZ/view?usp=sharing",
  },
  {
    title: "PokerFace",
    description:
      "Developed an AI-powered multiplayer poker platform featuring autonomous agents capable of reasoning, bluffing, and interacting dynamically with human players in real time.",
    stack: ["Next.js", "TypeScript", "AI Agents", "WebSockets"],
    color: "linear-gradient(135deg, #1a1208 0%, #2b1d0e 60%, #4a2c12 100%)",
    github: "https://github.com/ritwikgarg/agent-poker",
    live: "https://sv-frontend-ten.vercel.app/",
  },
  {
    title: "Ice Cap Growth",
    description:
      "Developed a computer vision pipeline for stabilizing rotating Earth imagery and segmenting Arctic ice regions using geometric transformations and image processing techniques to analyze ice cap growth over time.",
    stack: ["Python", "OpenCV", "Computer Vision", "Image Processing"],
    color: "linear-gradient(135deg, #1c1008 0%, #2d1a05 60%, #3a2205 100%)",
    github: "https://github.com/anant248/ice-cap-growth",
    live: "https://drive.google.com/file/d/1I0fnhSGhdphSFupOH1Ud000LwYXRjbGG/view?usp=share_link",
  },
  {
    title: "Personal Portfolio Website",
    description:
      "Designed and developed a modern personal portfolio website featuring interactive UI elements, animated project showcases, and a globe-based experience timeline to visualize my academic and professional journey.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "linear-gradient(135deg, #07121f 0%, #10243d 60%, #183b63 100%)",
    github: "https://github.com/anant248",
    live: "https://anantgoyal.dev",
  },
];

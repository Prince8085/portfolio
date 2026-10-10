import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { BrainCircuit, Server, Workflow, Zap } from "lucide-react";

const skills = [
  {
    title: "AI Agents & LLM Systems",
    icon: <BrainCircuit className="text-blue-600 dark:text-blue-400" size={24} />,
    description: "Architecting autonomous agents with multi-modal inputs, Gemini/GPT-4/Qwen routing, Function Calling, and low-latency RAG pipelines with ChromaDB.",
    tags: ["LangChain", "RAG & ChromaDB", "Multi-Model Routing", "OpenCV"]
  },
  {
    title: "Distributed Microservices",
    icon: <Server className="text-purple-600 dark:text-purple-400" size={24} />,
    description: "Designing high-throughput asynchronous services with FastAPI, Redis Pub/Sub, Celery workers, API Gateway rate-limiting, and OAuth 2.0 authentication.",
    tags: ["FastAPI (Async)", "Redis Pub/Sub", "Celery Queues", "AWS Lambda"]
  },
  {
    title: "Full Stack Engineering",
    icon: <Workflow className="text-emerald-600 dark:text-emerald-400" size={24} />,
    description: "Building resilient client applications and SaaS dashboards with Next.js 15, React 19, real-time WebSockets, offline-first PWAs, and Three.js 3D viewports.",
    tags: ["React 19", "Next.js 15", "WebSockets", "Three.js"]
  },
  {
    title: "Production Ops & AI Observability",
    icon: <Zap className="text-amber-600 dark:text-amber-400" size={24} />,
    description: "Deploying production infrastructure on AWS (EC2, S3, CloudFront), maintaining 85%+ PyTest coverage, CI/CD pipelines, and LangSmith LLM evaluation guardrails.",
    tags: ["AWS & Docker", "PyTest (85%+ cov)", "GitHub Actions", "LangSmith"]
  }
];

export function About() {
  return (
    <section className="py-24 relative z-10 bg-white dark:bg-black transition-colors duration-300" id="about">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4">Engineering Philosophy</Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
            Systems Thinking. <br />
            <span className="text-gray-400 dark:text-white/40">Product Execution.</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/60 font-light leading-relaxed">
            I don't just write code; I design systems that solve complex business problems. 
            With 2+ years of experience architecting 8+ production applications across retail, 
            healthcare, ed-tech, and pharma, my focus is on building resilient, scalable, 
            and autonomous AI infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 border border-black/10 dark:border-white/10">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{skill.title}</h3>
                <p className="text-gray-600 dark:text-white/60 mb-6 flex-grow text-sm leading-relaxed">
                  {skill.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {skill.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono text-gray-500 dark:text-white/40 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

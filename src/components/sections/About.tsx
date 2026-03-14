import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { BrainCircuit, Server, Workflow, Zap } from "lucide-react";

const skills = [
  {
    title: "AI Agents & LLMs",
    icon: <BrainCircuit className="text-blue-600 dark:text-blue-400" size={24} />,
    description: "Building autonomous systems with Gemini, GPT-4, Function Calling, and RAG pipelines using ChromaDB.",
    tags: ["LangChain", "OpenCV", "Prompt Engineering"]
  },
  {
    title: "Distributed Systems",
    icon: <Server className="text-purple-600 dark:text-purple-400" size={24} />,
    description: "Architecting scalable microservices with FastAPI, Node.js, and event-driven patterns.",
    tags: ["AWS", "Docker", "Redis", "Celery"]
  },
  {
    title: "Full Stack Engineering",
    icon: <Workflow className="text-emerald-600 dark:text-emerald-400" size={24} />,
    description: "Crafting premium user experiences with modern React, Next.js, and real-time WebSockets.",
    tags: ["React 19", "Next.js 15", "Tailwind CSS"]
  },
  {
    title: "Production Ops",
    icon: <Zap className="text-amber-600 dark:text-amber-400" size={24} />,
    description: "Deploying resilient infrastructure with CI/CD, monitoring, and circuit breaker patterns.",
    tags: ["GitHub Actions", "CloudWatch", "LangSmith"]
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
            With 2+ years of experience architecting 6+ production applications, my focus is on 
            building resilient, scalable, and autonomous AI infrastructure.
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

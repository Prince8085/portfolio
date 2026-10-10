import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Project OMNI — Autonomous AI Desktop Agent",
    description: "Built an autonomous agent executing code in sandboxed Docker containers, controlling desktop via real-time screen analysis (OpenCV), with multi-modal input (voice, vision, gesture, chat).",
    impact: "80% workflow reduction",
    tech: ["Python", "Gemini Pro", "Docker", "ChromaDB", "OpenCV", "AWS EC2"],
    architecture: "Sandboxed Docker execution, ChromaDB vector memory for continuous context, OpenCV real-time visual UI parsing, Telegram bot IPC remote control, and CloudWatch monitoring.",
    liveUrl: "",
    githubUrl: "https://github.com/Prince8085/Project-OMNI"
  },
  {
    title: "God-Mode Job Hunter — Autonomous Recruitment Agent",
    description: "Engineered 24/7 recruitment agent processing 500+ listings/day across 4 major platforms with LLM relevance scoring, scam detection, and dynamic ATS resume tailoring.",
    impact: "40% conversion lift • 15-20 hrs/week saved",
    tech: ["Python", "Gemini AI", "Celery", "Redis", "AWS Lambda", "Next.js 15", "Clerk"],
    architecture: "Celery & Redis async task pipeline, automated ATS field autofill (Lever, Greenhouse, Workday), serverless scrapers on AWS Lambda, and full-stack Next.js dashboard.",
    liveUrl: "",
    githubUrl: "https://github.com/Prince8085/God-Mode-Job-Hunter"
  },
  {
    title: "Saree Sansar — AI E-Commerce with Virtual Try-On (Client)",
    description: "Production full-stack e-commerce platform with AI Virtual Try-On, bilingual conversational shopping assistant, and high-performance product catalog.",
    impact: "90% LLM cost reduction",
    tech: ["Next.js 15", "FastAPI", "Gemini Vision", "Qwen VL", "AWS", "Redis"],
    architecture: "Multi-model vision routing (Gemini Vision + Qwen VL) with circuit breaker failover, Redis session caching, S3 + CloudFront image delivery, and FastAPI microservices.",
    liveUrl: "https://saree-sansar.vercel.app",
    githubUrl: "https://github.com/Prince8085/saree-sansar"
  },
  {
    title: "Smart API Trading Bot — Real-Time Indian Stock Market",
    description: "Real-time algorithmic trading analysis system integrating option chain sentiment, breaking financial news processing, and custom ML predictive models.",
    impact: "95%+ model accuracy",
    tech: ["Python", "Flask", "ML/LSTM", "DeepSeek", "Option Chain", "News API"],
    architecture: "LSTM neural network for market trend forecasting, DeepSeek sentiment analysis on live news, Angel One SmartAPI WebSocket streaming, and interactive analytics dashboard.",
    liveUrl: "",
    githubUrl: "https://github.com/Prince8085/smart-api-trading-bot"
  },
  {
    title: "Hyper3D Rodin AI Generator — Text-to-3D Suite",
    description: "Next-gen generative 3D asset generation suite converting text prompts and reference images into interactive 3D meshes with real-time polling and multi-format exports.",
    impact: "Production 3D Pipeline",
    tech: ["Next.js 15", "TypeScript", "Three.js", "Hyper3D Rodin API", "Tailwind CSS"],
    architecture: "Interactive Three.js WebGL preview viewport, async generation job queue polling, and automated multi-format export pipeline (GLB, OBJ, FBX, STL).",
    liveUrl: "",
    githubUrl: "https://github.com/Prince8085/Hyper3D-Rodin-AI-Generator-"
  }
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 relative z-10 bg-gray-50 dark:bg-black transition-colors duration-300" id="projects">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <Badge variant="outline" className="mb-4">Case Studies</Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
            Featured <span className="text-gradient">Projects</span>.
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/60 font-light leading-relaxed">
            Deep dives into production systems I've architected, focusing on problem-solving, 
            scalability, and measurable impact.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative" ref={containerRef}>
          {/* Background Timeline Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10" />

          {/* Animated Timeline Line */}
          <motion.div 
            className="absolute left-0 md:left-8 top-0 w-px bg-gradient-to-b from-blue-500 to-purple-500 origin-top z-0"
            style={{ height }}
          />

          {/* Moving Dot */}
          <motion.div 
            className="absolute left-[-4px] md:left-[28px] w-2 h-2 rounded-full bg-blue-600 dark:bg-white shadow-[0_0_15px_3px_rgba(59,130,246,0.8)] z-10"
            style={{ top: height, marginTop: "-4px" }}
          />

          <div className="space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-24"
              >
                {/* Static Timeline Dot */}
                <div className="absolute left-[-4px] md:left-[28px] top-8 w-2 h-2 rounded-full bg-white dark:bg-black border border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10" />

                <Card className="flex flex-col md:flex-row gap-8 p-8 border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02]">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                      <Badge variant="glow" className="ml-auto md:ml-0">{project.impact}</Badge>
                    </div>
                    <p className="text-gray-600 dark:text-white/70 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-mono text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">Architecture</h4>
                      <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed border-l-2 border-black/10 dark:border-white/10 pl-4 py-1">
                        {project.architecture}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map(tech => (
                        <span key={tech} className="text-xs font-mono text-gray-600 dark:text-white/50 bg-black/5 dark:bg-white/5 px-2.5 py-1 rounded-md border border-black/10 dark:border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      {project.liveUrl && project.liveUrl.trim() !== "" && (
                        <Button variant="secondary" size="sm" icon={<ExternalLink size={14} />} onClick={() => window.open(project.liveUrl, '_blank')}>
                          View Live
                        </Button>
                      )}
                      {project.githubUrl && project.githubUrl.trim() !== "" && (
                        <Button variant="ghost" size="sm" icon={<Github size={14} />} onClick={() => window.open(project.githubUrl, '_blank')}>
                          Source Code
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

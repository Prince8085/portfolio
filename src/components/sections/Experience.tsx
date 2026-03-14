import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { ExternalLink } from "lucide-react";

const experiences = [
  {
    role: "Founder & Lead Software Engineer",
    company: "Innovix Solutions (MSME Registered)",
    website: "https://innovixsolutions.in",
    period: "Jan 2024 - Jan 2026",
    details: [
      "Founded AI software studio; architected and shipped 6+ production applications using Python, TypeScript, React, Next.js, FastAPI, Node.js, PostgreSQL - deployed on AWS infrastructure.",
      "Designed microservices architecture with Redis Pub/Sub message queues, Celery async workers, API Gateway with rate limiting, and OAuth 2.0 - reducing API latency by 30% and database load by 45%.",
      "Engineered multi-model LLM inference routing (Gemini / GPT-4 / Qwen) with Function Calling, RAG pipelines (ChromaDB), and SSE / WebSocket streaming - cutting inference costs by 40%.",
      "Deployed on AWS EC2 (Docker, Nginx, SSL), Lambda serverless functions, S3 + CloudFront CDN, with CloudWatch monitoring and LangSmith LLM observability.",
      "Maintained 85%+ test coverage (PyTest), CI/CD pipelines (GitHub Actions), feature flags for staged rollouts, and OpenAPI / Swagger API documentation.",
      "Built CNN-LSTM models achieving 95% accuracy; implemented LLM evaluation frameworks for hallucination detection and guardrails for autonomous agent safety.",
      "Led and mentored a team of 10+ software engineering and AI interns, supervising their internship projects, conducting technical guidance sessions, reviewing code, and ensuring successful project delivery aligned with company objectives."
    ]
  }
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 relative z-10 bg-gray-50 dark:bg-black transition-colors duration-300" id="experience">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <Badge variant="outline" className="mb-4">Professional Journey</Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
            Building <span className="text-gradient">Production</span> AI.
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/60 font-light leading-relaxed">
            A track record of founding, architecting, and scaling AI-driven software studios.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative" ref={containerRef}>
          {/* Background Timeline Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10" />

          {/* Animated Timeline Line */}
          <motion.div 
            className="absolute left-0 md:left-8 top-0 w-px bg-gradient-to-b from-blue-500 to-purple-500 origin-top z-0"
            style={{ height }}
          />

          {/* Moving Dot */}
          <motion.div 
            className="absolute left-[-4px] md:left-[28px] w-2 h-2 rounded-full bg-blue-500 dark:bg-white shadow-[0_0_15px_3px_rgba(59,130,246,0.8)] z-10"
            style={{ top: height, marginTop: "-4px" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
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

                <Card className="p-8 border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                        {exp.website && (
                          <a 
                            href={exp.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-blue-600 dark:text-white/50 dark:hover:text-blue-400 transition-colors bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-md"
                          >
                            <ExternalLink size={12} />
                            Visit Site
                          </a>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className="w-fit">{exp.period}</Badge>
                  </div>

                  <ul className="space-y-4">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="text-gray-600 dark:text-white/70 leading-relaxed flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

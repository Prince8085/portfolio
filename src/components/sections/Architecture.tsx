import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Database, Server, Cpu, Globe, ArrowRight } from "lucide-react";

export function Architecture() {
  return (
    <section className="py-24 relative z-10 bg-white dark:bg-black transition-colors duration-300" id="architecture">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <Badge variant="outline" className="mb-4">Systems Thinking</Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
            Designing <span className="text-gradient">Autonomous</span> Systems.
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/60 font-light leading-relaxed">
            A visual representation of my approach to building scalable, resilient, and 
            high-performance AI architectures.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="p-8 border-black/10 dark:border-white/10 bg-gradient-to-br from-gray-50 dark:from-black to-blue-100/50 dark:to-blue-900/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative">
              
              {/* Frontend / Client */}
              <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center">
                  <Globe className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">Client Layer</h3>
                  <p className="text-sm text-gray-500 dark:text-white/50">Next.js 15, React 19, WebSockets</p>
                </div>
              </div>

              {/* Arrow 1 */}
              <div className="hidden md:flex justify-center text-gray-300 dark:text-white/20">
                <ArrowRight size={24} />
              </div>

              {/* API Gateway / Microservices */}
              <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                  <Server className="text-blue-600 dark:text-blue-400" size={40} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">API Gateway & Services</h3>
                  <p className="text-sm text-gray-500 dark:text-white/50">FastAPI, Node.js, AWS Lambda</p>
                  <div className="mt-2 flex flex-wrap justify-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider bg-black/5 dark:bg-white/5 px-2 py-1 rounded border border-black/10 dark:border-white/10 text-gray-500 dark:text-white/40">Rate Limiting</span>
                    <span className="text-[10px] uppercase tracking-wider bg-black/5 dark:bg-white/5 px-2 py-1 rounded border border-black/10 dark:border-white/10 text-gray-500 dark:text-white/40">OAuth 2.0</span>
                  </div>
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="hidden md:flex justify-center text-gray-300 dark:text-white/20">
                <ArrowRight size={24} />
              </div>

              {/* Data & AI Layer */}
              <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Cpu className="text-purple-600 dark:text-purple-400" size={32} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900 dark:text-white">AI & Data Layer</h3>
                  <p className="text-sm text-gray-500 dark:text-white/50">Gemini, RAG, ChromaDB, PostgreSQL</p>
                  <div className="mt-2 flex flex-wrap justify-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider bg-black/5 dark:bg-white/5 px-2 py-1 rounded border border-black/10 dark:border-white/10 text-gray-500 dark:text-white/40">Vector DB</span>
                    <span className="text-[10px] uppercase tracking-wider bg-black/5 dark:bg-white/5 px-2 py-1 rounded border border-black/10 dark:border-white/10 text-gray-500 dark:text-white/40">Redis Pub/Sub</span>
                  </div>
                </div>
              </div>

              {/* Connecting Lines (Background) */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent -translate-y-1/2 hidden md:block z-0" />
            </div>

            <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="text-sm font-mono text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">Async Pipelines</h4>
                <p className="text-sm text-gray-600 dark:text-white/60">Celery workers and Redis queues for heavy LLM inference and scraping tasks.</p>
              </div>
              <div>
                <h4 className="text-sm font-mono text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">Observability</h4>
                <p className="text-sm text-gray-600 dark:text-white/60">CloudWatch monitoring and LangSmith for LLM hallucination detection.</p>
              </div>
              <div>
                <h4 className="text-sm font-mono text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">Resilience</h4>
                <p className="text-sm text-gray-600 dark:text-white/60">Circuit breaker patterns for multi-model failover (Gemini / GPT-4 / Qwen).</p>
              </div>
              <div>
                <h4 className="text-sm font-mono text-gray-500 dark:text-white/40 uppercase tracking-wider mb-2">Infrastructure</h4>
                <p className="text-sm text-gray-600 dark:text-white/60">AWS EC2 (Docker, Nginx), Serverless functions, S3 + CloudFront CDN.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

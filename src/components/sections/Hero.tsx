import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ArrowRight, Terminal } from "lucide-react";

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </Canvas>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-50 transition-opacity duration-300">
        <Scene />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 dark:via-black/50 to-white dark:to-black z-0 transition-colors duration-300" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <Badge variant="glow" className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Available for new opportunities
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 text-gray-900 dark:text-white"
          >
            Architecting <span className="text-gradient">Autonomous</span> <br className="hidden md:block" />
            AI Systems.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-white/60 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
          >
            I'm Prince Khatik, a Full Stack + AI Engineer building production-grade LLM pipelines, autonomous agents, and scalable microservices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" icon={<ArrowRight size={18} />} onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Case Studies
            </Button>
            <Button variant="secondary" size="lg" icon={<Terminal size={18} />} onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Architecture
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

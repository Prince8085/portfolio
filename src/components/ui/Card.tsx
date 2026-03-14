import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";

export function Card({ children, className, hover = true }: { children: React.ReactNode, className?: string, hover?: boolean }) {
  return (
    <motion.div 
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-xl p-6 relative overflow-hidden group transition-colors duration-300",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

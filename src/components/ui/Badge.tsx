import { cn } from "@/src/lib/utils";

export function Badge({ children, className, variant = "default" }: { children: React.ReactNode, className?: string, variant?: "default" | "outline" | "glow" }) {
  const variants = {
    default: "bg-black/10 dark:bg-white/10 text-black dark:text-white border border-black/5 dark:border-white/5",
    outline: "bg-transparent text-gray-700 dark:text-white/70 border border-black/20 dark:border-white/20",
    glow: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
  };
  
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-mono tracking-wide transition-colors duration-300", variants[variant], className)}>
      {children}
    </span>
  );
}

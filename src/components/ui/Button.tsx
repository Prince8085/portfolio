import { cn } from "@/src/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export function Button({ children, className, variant = "primary", size = "md", icon, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90",
    secondary: "bg-black/5 dark:bg-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/10",
    ghost: "bg-transparent text-gray-600 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </motion.button>
  );
}

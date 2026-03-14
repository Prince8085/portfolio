import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Mail, Github, Linkedin, ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section className="py-32 relative z-10 bg-white dark:bg-black overflow-hidden transition-colors duration-300" id="contact">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 dark:from-blue-900/10 to-transparent z-0 transition-colors duration-300" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="glow" className="mb-6">Let's Build</Badge>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-8 text-gray-900 dark:text-white">
              Ready to scale your <br className="hidden md:block" />
              <span className="text-gradient">AI infrastructure?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-white/60 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" icon={<ArrowRight size={18} />} onClick={() => window.location.href = 'mailto:kachhwahaprince@gmail.com'}>
                Get In Touch
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6">
              <a href="https://github.com/prince8085" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/prince-kachhwaha-" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:kachhwahaprince@gmail.com" className="text-gray-400 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-0 w-full text-center text-gray-400 dark:text-white/20 text-sm font-mono transition-colors duration-300">
        © {new Date().getFullYear()} Prince Khatik. All rights reserved.
      </div>
    </section>
  );
}

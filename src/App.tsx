/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Architecture } from "./components/sections/Architecture";
import { Experience } from "./components/sections/Experience";
import { Education } from "./components/sections/Education";
import { GithubActivity } from "./components/sections/GithubActivity";
import { Contact } from "./components/sections/Contact";
import SplashCursor from "./components/ui/SplashCursor";
import { WhatsAppButton } from "./components/ui/WhatsAppButton";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="bg-white dark:bg-black min-h-screen text-gray-900 dark:text-white font-sans antialiased selection:bg-blue-500/30 transition-colors duration-300">
      <SplashCursor />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-black/50 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-colors duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xl font-display font-bold tracking-tighter">
            PK<span className="text-blue-500">.</span>
          </button>
          
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium text-gray-600 dark:text-white/60">
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-black dark:hover:text-white transition-colors">About</button>
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-black dark:hover:text-white transition-colors">Projects</button>
              <button onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-black dark:hover:text-white transition-colors">Architecture</button>
              <button onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-black dark:hover:text-white transition-colors">Experience</button>
              <button onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-black dark:hover:text-white transition-colors">Education</button>
              <button onClick={() => document.getElementById('github')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-black dark:hover:text-white transition-colors">GitHub</button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Contact</button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/80 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <Projects />
        <Architecture />
        <Experience />
        <Education />
        <GithubActivity />
        <Contact />
      </main>

      <WhatsAppButton />
    </div>
  );
}

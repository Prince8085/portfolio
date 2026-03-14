import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Download, GraduationCap, MapPin } from "lucide-react";

const educationData = [
  {
    degree: "B.Tech in Computer Science — AI & Machine Learning",
    institution: "Madhav Institute of Technology and Science (MITS)",
    location: "Gwalior",
    period: "July 2021 - July 2025",
    details: [
      "Coursework: Deep Learning, NLP, Distributed Systems, DSA, Algorithms, System Design, Software Engineering."
    ]
  },
  {
    degree: "12th Grade (Higher Secondary)",
    institution: "Shantiniketan",
    location: "Bilaspur",
    period: "Completed",
    details: []
  },
  {
    degree: "11th Grade",
    institution: "Narayana Junior College",
    location: "Vishakapatnam",
    period: "Completed",
    details: []
  },
  {
    degree: "10th Grade (High School)",
    institution: "Christa Jyoti Mission Higher Secondary School",
    location: "Beohari",
    period: "Completed",
    details: []
  }
];

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 relative z-10 bg-white dark:bg-black transition-colors duration-300" id="education">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <Badge variant="outline" className="mb-4">Academic Background</Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
            Education & <span className="text-gradient">Resume</span>.
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/60 font-light leading-relaxed">
            My academic journey and professional resume available for download.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Smaller Photo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 relative group lg:sticky lg:top-32 max-w-sm mx-auto lg:mx-0 w-full"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] border border-black/10 dark:border-white/10 bg-gray-100 dark:bg-white/5">
              <img 
                src="/photo.jpg" 
                alt="Prince Khatik" 
                className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-500"
                onError={(e) => {
                  // Fallback to placeholder if photo is missing.
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-medium text-xl">Prince Khatik</p>
                <p className="text-white/80 text-sm mt-1">Full Stack + AI Engineer</p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-2xl -z-10" />
          </motion.div>

          {/* Right Side: Education & Resume Download */}
          <div className="lg:col-span-8 space-y-12">
            {/* Resume Download Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-8 border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Full Resume</h3>
                  <p className="text-gray-600 dark:text-white/60">Get a detailed overview of my experience, skills, and education.</p>
                </div>
                <Button 
                  size="lg" 
                  icon={<Download size={18} />} 
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = "/prince.pdf";
                    link.download = "prince.pdf";
                    link.click();
                  }}
                  className="w-full sm:w-auto shrink-0"
                >
                  Download PDF
                </Button>
              </Card>
            </motion.div>

            {/* Education Timeline */}
            <div className="space-y-8">
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <GraduationCap className="text-blue-500" />
                Education
              </h3>
              
              <div className="relative pl-8" ref={containerRef}>
                {/* Background Timeline Line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10" />

                {/* Animated Timeline Line */}
                <motion.div 
                  className="absolute left-0 top-0 w-px bg-gradient-to-b from-blue-500 to-purple-500 origin-top z-0"
                  style={{ height }}
                />

                {/* Moving Dot */}
                <motion.div 
                  className="absolute left-[-4px] w-2 h-2 rounded-full bg-blue-500 dark:bg-white shadow-[0_0_15px_3px_rgba(59,130,246,0.8)] z-10"
                  style={{ top: height, marginTop: "-4px" }}
                />

                <div className="space-y-12">
                  {educationData.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                      className="relative"
                    >
                      {/* Static Timeline Dot */}
                      <div className="absolute left-[-36px] top-8 w-2 h-2 rounded-full bg-white dark:bg-black border border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10" />

                      <Card className="p-8 border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.02]">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{edu.degree}</h4>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">{edu.institution}</p>
                          </div>
                          <Badge variant="outline" className="w-fit shrink-0">{edu.period}</Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-500 dark:text-white/50">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={14} />
                            <span>{edu.location}</span>
                          </div>
                        </div>

                        {edu.details.length > 0 && (
                          <ul className="space-y-3 mt-4">
                            {edu.details.map((detail, i) => (
                              <li key={i} className="text-gray-600 dark:text-white/70 leading-relaxed flex items-start gap-3 text-sm">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

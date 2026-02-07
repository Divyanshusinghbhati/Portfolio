import { type Experience } from "@shared/schema";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  // Sort implies backend sends order or we reverse here if needed
  // For now assuming backend returns correct order
  
  return (
    <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12 pb-12">
      {experiences.map((exp, index) => (
        <motion.div 
          key={exp.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative pl-8 md:pl-12"
        >
          {/* Dot */}
          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          
          <div className="glass-card p-6 rounded-xl hover:bg-white/5 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
              <div>
                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                <div className="flex items-center gap-2 text-primary font-medium mt-1">
                  <Briefcase size={16} />
                  <span>{exp.company}</span>
                </div>
              </div>
              <span className="text-sm font-mono text-muted-foreground bg-white/5 px-3 py-1 rounded-full w-fit">
                {exp.duration}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {exp.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

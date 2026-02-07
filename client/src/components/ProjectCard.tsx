import { motion } from "framer-motion";
import { type Project } from "@shared/schema";
import { Github, ExternalLink, FolderGit2 } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const techs = project.technologies.split(",").map(t => t.trim());

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col h-full border border-white/5 hover:border-primary/50 transition-colors"
    >
      <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative group">
        <FolderGit2 className="w-16 h-16 text-white/10 group-hover:text-primary/20 transition-colors duration-500" />
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold font-display mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {techs.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4 mt-auto">
          {project.link && (
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-white hover:text-primary transition-colors"
            >
              <ExternalLink size={16} />
              View Project
            </a>
          )}
          {/* Fallback if no link provided */}
          {!project.link && (
            <span className="text-sm text-muted-foreground italic">Internal Project</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { type Skill } from "@shared/schema";
import { 
  Code2, 
  Terminal, 
  Database, 
  Wrench, 
  Users, 
  Briefcase, 
  Megaphone, 
  Smartphone,
  Cpu
} from "lucide-react";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

// Helper to map skill names/categories to icons
const getIcon = (name: string, category: string) => {
  const lowerName = name.toLowerCase();
  const lowerCat = category.toLowerCase();

  if (lowerName.includes("flutter") || lowerName.includes("app")) return <Smartphone className="w-6 h-6" />;
  if (lowerName.includes("firebase") || lowerCat.includes("data")) return <Database className="w-6 h-6" />;
  if (lowerCat.includes("soft") || lowerName.includes("communication")) return <Users className="w-6 h-6" />;
  if (lowerName.includes("project") || lowerName.includes("manage")) return <Briefcase className="w-6 h-6" />;
  if (lowerName.includes("market")) return <Megaphone className="w-6 h-6" />;
  if (lowerName.includes("network") || lowerName.includes("system")) return <Cpu className="w-6 h-6" />;
  
  if (lowerCat.includes("technical")) return <Code2 className="w-6 h-6" />;
  if (lowerCat.includes("tool")) return <Wrench className="w-6 h-6" />;
  
  return <Terminal className="w-6 h-6" />;
};

export function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-card p-6 rounded-xl flex flex-col items-center text-center gap-4 hover:neon-border transition-all duration-300 group"
    >
      <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
        {getIcon(skill.name, skill.category)}
      </div>
      <div>
        <h3 className="font-bold text-lg mb-1">{skill.name}</h3>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{skill.category}</span>
      </div>
    </motion.div>
  );
}

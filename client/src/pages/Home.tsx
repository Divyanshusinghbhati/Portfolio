import { Navbar } from "@/components/Navbar";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillCard } from "@/components/SkillCard";
import { ProjectCard } from "@/components/ProjectCard";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ContactForm } from "@/components/ContactForm";
import { useProfile, useSkills, useProjects, useExperience, useEducation, useCertifications } from "@/hooks/use-portfolio";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, GraduationCap, Award, Download } from "lucide-react";

export default function Home() {
  const { data: profile } = useProfile();
  const { data: skills } = useSkills();
  const { data: projects } = useProjects();
  const { data: experience } = useExperience();
  const { data: education } = useEducation();
  const { data: certifications } = useCertifications();

  if (!profile) return null; // Or a full screen loader

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
        {/* Abstract Background Blobs */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] -z-10" />

        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-sm">
              Hello, I am
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight">
              {profile.name}
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-light">
              {profile.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              {profile.heroHeadline}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#projects" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                View Projects
              </a>
              <a href="#contact" className="px-6 py-3 rounded-lg border border-white/20 hover:border-primary hover:text-primary transition-all bg-white/5 backdrop-blur-sm">
                Contact Me
              </a>
            </div>

            <div className="flex items-center gap-6 pt-8">
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={24} />
              </a>
              <a href={`mailto:${profile.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={24} />
              </a>
              {/* Add Github if available in schema later, or hardcode if known */}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-[0_0_60px_rgba(6,182,212,0.2)]">
              {/* Dynamic Image */}
              <img 
                src={profile.profileImageUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Orbiting Elements Decoration */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 -m-8 border border-dashed border-white/10 rounded-full z-[-1]"
            />
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="About Me" 
            subtitle="Get to know me and my background"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-muted-foreground text-lg leading-relaxed"
            >
              <p>{profile.summary}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="glass-card p-4 rounded-lg flex items-start gap-3">
                  <MapPin className="text-primary mt-1" />
                  <div>
                    <h4 className="text-white font-bold">Location</h4>
                    <span className="text-sm">{profile.location}</span>
                  </div>
                </div>
                <div className="glass-card p-4 rounded-lg flex items-start gap-3">
                  <GraduationCap className="text-primary mt-1" />
                  <div>
                    <h4 className="text-white font-bold">Education</h4>
                    <span className="text-sm">BCA Graduate</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="space-y-6">
               <h3 className="text-2xl font-bold font-display flex items-center gap-2">
                 <GraduationCap className="text-primary" />
                 Education History
               </h3>
               
               <div className="space-y-6">
                 {education?.map((edu, i) => (
                   <motion.div 
                     key={edu.id}
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="glass-card p-6 rounded-xl border-l-4 border-l-primary"
                   >
                     <div className="flex justify-between items-start mb-2">
                       <h4 className="text-lg font-bold text-white">{edu.institution}</h4>
                       <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">{edu.year}</span>
                     </div>
                     <p className="text-muted-foreground font-medium">{edu.degree}</p>
                     {edu.gpa && <p className="text-sm text-white/60 mt-2">GPA: {edu.gpa}</p>}
                   </motion.div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Experience" 
            subtitle="My professional journey so far"
          />
          {experience && <ExperienceTimeline experiences={experience} />}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Skills" 
            subtitle="Technologies and tools I work with"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills?.map((skill, index) => (
              <SkillCard key={skill.id} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Projects" 
            subtitle="Some of the things I've built"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certifications" className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Certifications" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications?.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl flex items-center gap-4 hover:bg-white/5 transition-colors"
              >
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -z-10" />
        
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Get In Touch" 
            subtitle="Have a question or want to work together?"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <p className="text-lg text-muted-foreground">
                I'm currently available for freelance work or full-time opportunities.
                If you have a project that needs some creative touch, let's chat.
              </p>
              
              <div className="space-y-6">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
                  <div className="bg-white/5 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <span className="text-lg">{profile.email}</span>
                </a>
                
                <a href={`tel:${profile.phone}`} className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
                  <div className="bg-white/5 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Phone size={24} className="text-primary" />
                  </div>
                  <span className="text-lg">{profile.phone}</span>
                </a>
                
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
                  <div className="bg-white/5 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Linkedin size={24} className="text-primary" />
                  </div>
                  <span className="text-lg">LinkedIn Profile</span>
                </a>
                
                <div className="flex items-center gap-4 text-white group">
                  <div className="bg-white/5 p-3 rounded-lg">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <span className="text-lg">{profile.location}</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3 glass-card p-8 rounded-2xl border border-white/5">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-white/5 text-center text-muted-foreground">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p className="text-sm mt-2">Built with React, Tailwind & Framer Motion</p>
      </footer>
    </div>
  );
}

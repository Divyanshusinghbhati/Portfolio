import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingProfile = await storage.getProfile();
  if (!existingProfile) {
    await storage.createProfile({
      name: "Divyanshu Singh Bhati",
      title: "IT Professional / Operation Executive / Tech-driven BCA Graduate",
      summary: "Background in software engineering, IT support, and operational coordination. Experience with Flutter, Firebase, system maintenance, troubleshooting, documentation, and workflow management. Career objective: securing an IT-focused role combining technical skills with operational efficiency.",
      heroHeadline: "Tech-driven BCA graduate with experience in software engineering, IT management, and operational coordination, focused on delivering reliable technical solutions.",
      location: "Jaipur, Rajasthan",
      email: "mrdivyanshu31@gmail.com",
      phone: "+91 6378502420",
      linkedinUrl: "https://www.linkedin.com/in/divyanshu-singh-bhati-389012362",
      profileImageUrl: "/images/profile.jpeg"
    });

    const skillsList = [
      { name: "Marketing", category: "Business" },
      { name: "Project Management", category: "Management" },
      { name: "Budget Planning", category: "Management" },
      { name: "Communication", category: "Soft Skills" },
      { name: "Problem-solving", category: "Soft Skills" },
      { name: "Network Administration", category: "Technical" },
      { name: "Flutter Development", category: "Technical" },
      { name: "Firebase", category: "Technical" },
      { name: "IT Support", category: "Technical" },
      { name: "System Maintenance", category: "Technical" },
      { name: "Troubleshooting", category: "Technical" },
    ];
    for (const skill of skillsList) await storage.createSkill(skill);

    const experienceList = [
      {
        role: "Operation Executive",
        company: "Elbow Grease Business Solutions Pvt. Ltd",
        duration: "Oct 2025 – Present",
        description: "IT support, technical troubleshooting, workflow coordination, vendor handling, operational process management."
      },
      {
        role: "IT Manager",
        company: "Smart Circle Group",
        duration: "Jun 2025 – Sep 2025",
        description: "Managed IT infrastructure and technical operations."
      },
      {
        role: "Software Engineer Intern",
        company: "Ethereal Softech Pvt. Ltd",
        duration: "May 2024 – Jul 2024",
        description: "Mobile app development with Flutter."
      }
    ];
    for (const exp of experienceList) await storage.createExperience(exp);

    const educationList = [
      {
        degree: "BCA",
        institution: "Poornima University",
        year: "2022–2025",
        gpa: "7.82 GPA"
      },
      {
        degree: "12th",
        institution: "K.V No.1, Bikaner",
        year: "2020–2021",
        gpa: "7.96 GPA"
      }
    ];
    for (const edu of educationList) await storage.createEducation(edu);

    const projectsList = [
      {
        title: "Royal Baisa App",
        description: "Women's Rajputi dress mobile application. Focused on app development, design, and technical implementation.",
        technologies: "Flutter, Firebase",
        link: "#"
      }
    ];
    for (const proj of projectsList) await storage.createProject(proj);

    const certificationsList = [
      { name: "Public Speaking", issuer: "NPTEL" },
      { name: "Flutter and Firebase Development", issuer: "Udemy" },
      { name: "Prompt Engineering Course", issuer: "DeepLearning AI" },
      { name: "Innovation in Artificial Intelligence", issuer: "Unknown" },
      { name: "PepsiCo Sales Certificate", issuer: "PepsiCo" }
    ];
    for (const cert of certificationsList) await storage.createCertification(cert);
    
    console.log("Database seeded successfully");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed data on startup
  seedDatabase().catch(console.error);

  app.get(api.profile.get.path, async (_req, res) => {
    const profile = await storage.getProfile();
    res.json(profile || {});
  });

  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get(api.experience.list.path, async (_req, res) => {
    const experience = await storage.getExperience();
    res.json(experience);
  });

  app.get(api.education.list.path, async (_req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.certifications.list.path, async (_req, res) => {
    const certifications = await storage.getCertifications();
    res.json(certifications);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.createMessage(input);
      res.json({ success: true });
    } catch (error) {
       if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", details: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}

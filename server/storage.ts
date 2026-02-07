import { db } from "./db";
import { 
  profile, skills, experience, education, projects, certifications, messages,
  type Profile, type Skill, type Experience, type Education, type Project, type Certification,
  type InsertMessage, type InsertProfileSchema
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: any): Promise<Profile>;
  getSkills(): Promise<Skill[]>;
  createSkill(skill: any): Promise<Skill>;
  getExperience(): Promise<Experience[]>;
  createExperience(exp: any): Promise<Experience>;
  getEducation(): Promise<Education[]>;
  createEducation(edu: any): Promise<Education>;
  getProjects(): Promise<Project[]>;
  createProject(project: any): Promise<Project>;
  getCertifications(): Promise<Certification[]>;
  createCertification(cert: any): Promise<Certification>;
  createMessage(message: InsertMessage): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const result = await db.select().from(profile).limit(1);
    return result[0];
  }

  async createProfile(insertProfile: any): Promise<Profile> {
    const [newProfile] = await db.insert(profile).values(insertProfile).returning();
    return newProfile;
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createSkill(insertSkill: any): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(insertSkill).returning();
    return newSkill;
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience);
  }

  async createExperience(insertExperience: any): Promise<Experience> {
    const [newExperience] = await db.insert(experience).values(insertExperience).returning();
    return newExperience;
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async createEducation(insertEducation: any): Promise<Education> {
    const [newEducation] = await db.insert(education).values(insertEducation).returning();
    return newEducation;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createProject(insertProject: any): Promise<Project> {
    const [newProject] = await db.insert(projects).values(insertProject).returning();
    return newProject;
  }

  async getCertifications(): Promise<Certification[]> {
    return await db.select().from(certifications);
  }

  async createCertification(insertCertification: any): Promise<Certification> {
    const [newCertification] = await db.insert(certifications).values(insertCertification).returning();
    return newCertification;
  }

  async createMessage(insertMessage: InsertMessage): Promise<void> {
    await db.insert(messages).values(insertMessage);
  }
}

export const storage = new DatabaseStorage();

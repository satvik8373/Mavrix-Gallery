import { z } from 'zod';

export const experienceSchema = z.object({
  dataId: z.string().default(() => `exp-${crypto.randomUUID()}`),
  title: z.string().default(''),
  company: z.string().default(''),
  duration: z.string().default(''),
  description: z.array(z.string()).default(['']),
});

export const educationSchema = z.object({
  dataId: z.string().default(() => `edu-${crypto.randomUUID()}`),
  degree: z.string().default(''),
  institution: z.string().default(''),
  duration: z.string().default(''),
});

export const awardSchema = z.object({
  dataId: z.string().default(() => `award-${crypto.randomUUID()}`),
  name: z.string().default(''),
  date: z.string().default(''),
});

const designSchema = z.object({
  accentColor: z.string().default('#09090b'),
  fontFamily: z.string().default('Inter'),
  fontSize: z.number().default(100),
  sectionVisibility: z.object({
    summary: z.boolean().default(true),
    experience: z.boolean().default(true),
    education: z.boolean().default(true),
    skills: z.boolean().default(true),
    awards: z.boolean().default(true),
  }).default({}),
});

export const resumeDataSchema = z.object({
  personal: z.object({
    name: z.string().default('John Smith'),
    title: z.string().default('Title Position'),
    email: z.string().email().default('mail@yourweb.com'),
    phone: z.string().default('+4-234-126-45679'),
    linkedin: z.string().url().default('https://yourwebsite.com'),
    location: z.string().default('Street name, 328, CA'),
    initials: z.string().default('JS'),
    photoUrl: z.string().url().optional().default('https://placehold.co/150x150.png'),
  }).default({}),
  summary: z.string().default('Innovative and deadline-driven Full Stack Developer with 5+ years of experience designing and developing user-centered web applications from initial concept to final, polished deliverable.'),
  experience: z.array(experienceSchema).default([
    { title: 'Senior Frontend Developer', company: 'Tech Solutions Inc.', duration: 'Jan 2021 - Present', description: ["Lead the development of a new e-commerce platform using React and Next.js, resulting in a 40% increase in user engagement.","Mentor junior developers and conduct code reviews to maintain high-quality code standards."] },
    { title: 'Full Stack Developer', company: 'Innovatech', duration: 'Jun 2018 - Dec 2020', description: ["Developed and maintained RESTful APIs with Node.js and Express for a suite of internal tools.","Managed database schemas and queries using PostgreSQL and an ORM."] },
  ]),
  education: z.array(educationSchema).default([
    { degree: 'Bachelor of Science in Computer Science', institution: 'University of Technology', duration: '2014 - 2018' }
  ]),
  skills: z.array(z.string()).default(['Illustrator', 'Photoshop', 'Indesign', 'Ms Word', 'React', 'Next.js', 'Node.js']),
  awards: z.array(awardSchema).default([
    { name: 'Award Name', date: '2018' },
    { name: 'Award Name', date: '2020' },
  ]),
  design: designSchema.default({})
});

export type ResumeData = z.infer<typeof resumeDataSchema>;

export const defaultResumeData = resumeDataSchema.parse({
  personal: {
    photoUrl: 'https://placehold.co/150x150.png',
  }
});
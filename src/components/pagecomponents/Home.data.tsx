import { Facebook, Github, Linkedin } from "lucide-react";

export const SKILLS: Skill[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React JS",
  "Next js",
  "Node Js",
  "Express js",
  "PostgreSQL",
  "Sequelize",
].map((title) => ({ title }));

export const EXPERIENCE: ExperienceType[] = [
  {
    jobTitle: "Frontend Developer",
    company: "Reflex It Solution",
    period: "July 2024 - current",
    description:
      "worked in 4+ projects. Made reusable components and maintained codebase of existing ecommerce project",
  },
  {
    jobTitle: "Frontend Intern",
    company: "Reflex It Solution",
    period: "March - July 2024",
    description:
      "Built a Dashboard and web app of Bishraam using Next.js, TypeScript, SCSS, and integrated api using Redux and axios",
  },
];

export const SOCIAL_LINKS = [
  {
    link: "https://www.linkedin.com/in/abhishek-khati-b4a427299/",
    icon: <Linkedin />,
    label: "LinkedIn Profile",
  },
  {
    link: "https://github.com/Abhishek758666/",
    icon: <Github />,
    label: "GitHub Profile",
  },
  {
    link: "https://www.facebook.com/profile.php?id=100055382902789",
    icon: <Facebook />,
    label: "Facebook Profile",
  },
];

// Types
export type Skill = {
  title: string;
  index?: number;
};

export type ExperienceType = {
  jobTitle: string;
  company: string;
  period: string;
  description: string;
};

export type SocialLink = {
  link: string;
  icon: React.ReactNode;
  label: string;
};

import { Download, Facebook, Github, icons, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";
import ThreeLines from "../svgcomponents/3Lines";
import Image from "next/image";
import ArrowSvg from "../svgcomponents/ArrowSvg";
import StickyNote from "../uicomponents/StickyNote";
import { motion } from "motion/react";
import { spring } from "motion";

const skillsList: Skill[] = [
  { title: "HTML" },
  { title: "CSS" },
  { title: "JavaScript" },
  { title: "TypeScript" },
  { title: "React JS" },
  { title: "Next js" },
  { title: "Node Js" },
  { title: "Express js" },
  { title: "PostgreSQL" },
  { title: "Sequelize" },
];

const experienceList: ExperienceItem[] = [
  // {
  //   jobTitle: "Fullstack Developer",
  //   company: "Reflex It Solution",
  //   period: "April - Current",
  //   description: "Working on for 2+ projects building API and web app UI.",
  // },
  {
    jobTitle: "Frontend Developer",
    company: "Reflex It Solution",
    period: "July 2024 - current",
    description:
      "Built a web app and implemented API for 3+ projects. Also refactored UI and codebase of existing projects.",
  },
  {
    jobTitle: "Frontend Intern",
    company: "Reflex It Solution",
    period: "March - July 2024",
    description:
      "Built a Dashboard and web app UI for a client using Next.js, TypeScript, SCSS, and Redux.",
  },
];

const socialLinks = [
  {
    link: "https://www.linkedin.com/in/abhishek-khati-b4a427299/",
    icons: <Linkedin />,
  },
  {
    link: "https://github.com/Abhishek758666/",
    icons: <Github />,
  },
  {
    link: "https://www.facebook.com/profile.php?id=100055382902789",
    icons: <Facebook />,
  },
];

interface Skill {
  title: string;
}

interface ExperienceItem {
  jobTitle: string;
  company: string;
  period: string;
  description: string;
}

interface SkillCardProps {
  title: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-2 text-lg font-bold border-[#474747] py-2 px-3 rounded-2xl border-2">
      <p>{title}</p>
    </div>
  );
};

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <div>
      <h3 className="headingFont font-black text-2xl">Skills</h3>
      <div className="flex flex-wrap gap-4 mt-4">
        {skills.map((skill, index) => (
          <SkillCard key={index} title={skill.title} />
        ))}
      </div>
    </div>
  );
};

interface ExperienceProps {
  jobTitle: string;
  company: string;
  period: string;
  description: string;
}

const Experience: React.FC<ExperienceProps> = ({
  jobTitle,
  company,
  period,
  description,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-black text-xl">
        {jobTitle} <span className="text-[#8c8fa6]">({company})</span>
      </h4>
      <span className="text-lg font-bold text-black">{period}</span>
      <p className="text-[#8c8fa6] text-xl">{description}</p>
    </div>
  );
};

const ResumeDownload = () => {
  return (
    <Link
      href={"/resume/abhishek_cv.pdf"}
      className="flex items-center gap-2 font-bold text-2xl relative mb-14"
      target="_blank"
      download={"abhishek_cv.pdf"}
      rel="noopener noreferrer"
    >
      <Download /> DownLoad Resume
      <div className="absolute -top-7 right-44 rotate-90">
        <ThreeLines />
      </div>
    </Link>
  );
};

const Home: React.FC = () => {
  return (
    <section className="w-full h-full">
      <div className="flex flex-col gap-10">
        <SocialLinks links={socialLinks} />
        <Skills skills={skillsList} />

        <div className="flex flex-col gap-4 ">
          <h3 className="headingFont font-black text-2xl">Experience</h3>
          {experienceList.map((exp, index) => (
            <Experience
              key={index}
              jobTitle={exp.jobTitle}
              company={exp.company}
              period={exp.period}
              description={exp.description}
            />
          ))}
        </div>

        <ResumeDownload />
      </div>
    </section>
  );
};

interface SocialLink {
  link: string;
  icons: React.ReactNode;
}

const SocialLinks: React.FC<{ links: SocialLink[] }> = ({ links }) => {
  return (
    <div>
      <h3 className="headingFont font-black text-2xl">Social Links</h3>
      <div className="flex flex-wrap gap-4 mt-4">
        {links.map((link, index) => (
          <motion.a
            key={index}
            whileHover={{
              rotate: "-15deg",
              scale: 1.1,
              transition: {
                type: spring,
                stiffness: 300,
                damping: 10,
              },
            }}
            href={link.link}
            className="flex items-center gap-2 font-bold border-[#474747] p-2 rounded-2xl border-2 text-sm"
            target="_blank"
          >
            {link.icons}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <main className="w-full h-full">
      <aside>
        <LayoutAside />
      </aside>
      <div className="page w-full">
        <div className="max-w-[820px] w-full mx-auto px-5 py-20 grid gap-20 md:grid-cols-[1.5fr_2fr] tracking-tighter leading-none">
          <div className="hidden md:block"></div>
          <Home />
        </div>
      </div>
    </main>
  );
};

export default HomePage;

const LayoutAside = () => {
  return (
    <section className="relative md:fixed top-[6rem] left-0 md:left-[10vw] w-full md:max-w-[20rem] lg:left-[20vw] xl:left-[25vw] h-screen items-center flex flex-col">
      <div className="flex flex-col items-center justify-center relative">
        <span className="absolute -top-4 left-10">
          <ThreeLines />
        </span>
        <Image
          className="h-[119px] w-[119px] rounded-full border-3 object-cover border-[#474747]"
          width={400}
          height={400}
          src="/me.png"
          alt="profile-image"
        />
        <div className="flex items-end">
          <ArrowSvg />
          <p className="text-[32px] translate-y-5 font-black">Abhishek Khati</p>
        </div>
      </div>
      <div className="w-full max-w-[390px] px-3 py-10 grid gap-2 grid-cols-2">
        <StickyNote
          child="1+ year as software developer"
          isEven={false}
          bg={2}
        />
        <StickyNote child="completed 5+ client projects" bg={3} isEven />

        <StickyNote
          child={
            <div className="flex flex-col items-center gap-2">
              <Image
                src={"/location.svg"}
                alt="location icon"
                width={50}
                height={50}
              />
              <span>Kathmandu, Nepal</span>
            </div>
          }
          bg={5}
          isEven={false}
        />
        <StickyNote child="Available for hiring" bg={4} isEven />
      </div>
    </section>
  );
};

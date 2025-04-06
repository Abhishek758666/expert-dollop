import React from "react";

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
    <div className="flex items-center gap-2 text-lg font-bold border-black py-2 px-3 rounded-2xl border-2">
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
      <h3 className="font-black text-3xl">Skills</h3>
      <div className="flex flex-wrap gap-4">
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

const Home: React.FC = () => {
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
    {
      jobTitle: "Fullstack Developer",
      company: "Reflex It Solution",
      period: "April - Current",
      description: "Working on for 2+ projects building API and web app UI.",
    },
    {
      jobTitle: "Frontend Developer",
      company: "Reflex It Solution",
      period: "July 2024 - April 2025",
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

  return (
    <section className="w-full h-full">
      <div className="flex flex-col gap-10">
        <p className="text-2xl font-bold leading-none text-[#8c8fa6]">
          I am a software engineer with a passion for building web applications.
        </p>

        <Skills skills={skillsList} />

        <div className="flex flex-col gap-4 ">
          <h3 className="font-black text-3xl">Experience</h3>
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
      </div>
    </section>
  );
};

export default Home;

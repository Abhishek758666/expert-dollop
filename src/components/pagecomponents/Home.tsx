"use client";
import { Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, spring } from "framer-motion";
import ThreeLines from "../svgcomponents/3Lines";
import ArrowSvg from "../svgcomponents/ArrowSvg";
import StickyNote from "../uicomponents/StickyNote";
import {
  EXPERIENCE,
  ExperienceType,
  Skill,
  SKILLS,
  SOCIAL_LINKS,
  SocialLink,
} from "./Home.data";

const SkillCard = ({ title, index }: Skill) => {
  return (
    <motion.div
      variants={cardTiltVariants}
      initial="initial"
      whileInView="animate"
      custom={index}
      viewport={{ once: true }}
      className="flex items-center gap-2 text-lg font-bold border-[#474747] py-2 px-3 rounded-2xl border-2"
    >
      <p>{title}</p>
    </motion.div>
  );
};

const SpringTransition = {
  duration: 5,
  type: "spring",
  damping: 10,
  stiffness: 100,
};

export const cardTiltVariants = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: { ...SpringTransition, delay: index * 0.06 },
  }),
};

const Skills = ({ skills }: { skills: Skill[] }) => {
  return (
    <div>
      <motion.h3
        variants={cardTiltVariants}
        initial="initial"
        whileInView="animate"
        className="headingFont font-black text-2xl"
        viewport={{ once: true }}
      >
        Skills
      </motion.h3>
      <div className="flex flex-wrap gap-4 mt-4">
        {skills.map((skill, index) => (
          <SkillCard key={`skill-${index}`} {...skill} index={index} />
        ))}
      </div>
    </div>
  );
};

const ExperienceItem = ({
  jobTitle,
  company,
  period,
  description,
}: ExperienceType) => {
  return (
    <motion.div
      variants={cardTiltVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="flex flex-col gap-3"
    >
      <h4 className="font-black text-xl">
        {jobTitle} <span className="text-[#8c8fa6]">({company})</span>
      </h4>
      <span className="text-lg font-bold text-black">{period}</span>
      <p className="text-[#8c8fa6] text-xl">{description}</p>
    </motion.div>
  );
};

const ResumeDownload = () => {
  return (
    <Link
      href="/resume/abhishek_cv.pdf"
      target="_blank"
      download="abhishek_cv.pdf"
      rel="noopener noreferrer"
      aria-label="Download resume"
    >
      <motion.div
        className="flex items-center gap-2 font-bold text-2xl relative"
        variants={cardTiltVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="absolute -top-7 right-44 rotate-90">
          <ThreeLines />
        </div>
        <motion.div
          animate={{
            y: [-10, 0, 0 - 10],
            transition: {
              repeat: Infinity,
              duration: 1,
              type: "linear",
            },
          }}
        >
          <Download />
        </motion.div>
        Download Resume
      </motion.div>
    </Link>
  );
};

const SocialLinks = ({ links }: { links: SocialLink[] }) => {
  return (
    <div>
      <motion.h3
        variants={cardTiltVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="headingFont font-black text-2xl"
      >
        Social Links
      </motion.h3>
      <div className="flex flex-wrap gap-4 mt-4">
        {links.map(({ link, icon, label }, index) => (
          <motion.a
            key={`social-${index}`}
            whileHover={{
              rotate: "-15deg",
              scale: 1.1,
              transition: {
                type: spring,
                stiffness: 300,
                damping: 10,
              },
            }}
            variants={cardTiltVariants}
            initial="initial"
            whileInView="animate"
            custom={index}
            href={link}
            viewport={{ once: true }}
            className="flex items-center gap-2 font-bold border-[#474747] p-2 rounded-2xl border-2 text-sm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            {icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

const HomeContent = () => {
  return (
    <section className="w-full h-full">
      <div className="flex flex-col gap-10">
        <ResumeDownload />

        <SocialLinks links={SOCIAL_LINKS} />
        <Skills skills={SKILLS} />

        <div className="flex flex-col gap-4">
          <motion.h3
            variants={cardTiltVariants}
            initial="initial"
            whileInView="animate"
            className="headingFont font-black text-2xl"
          >
            Experience
          </motion.h3>
          {EXPERIENCE.map((exp, index) => (
            <ExperienceItem key={`exp-${index}`} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

const LayoutAside = () => {
  return (
    <motion.section
      variants={cardTiltVariants}
      initial="initial"
      whileInView="animate"
      className="relative md:fixed top-[6rem] left-0 md:left-[10vw] w-full md:max-w-[20rem] lg:left-[20vw] xl:left-[25vw] h-screen items-center flex flex-col"
    >
      <div className="flex flex-col items-center justify-center relative">
        <span className="absolute -top-4 left-10">
          <ThreeLines />
        </span>
        <Image
          className="h-[119px] w-[119px] rounded-full border-3 object-cover border-[#474747]"
          width={400}
          height={400}
          src="/me.png"
          alt="Abhishek Khati profile picture"
          priority
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
        <StickyNote child="worked in 5+ client projects" bg={3} isEven />
        <StickyNote
          child={
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/location.svg"
                alt="Location icon"
                width={50}
                height={50}
              />
              <span>Lalitpur, Nepal</span>
            </div>
          }
          bg={5}
          isEven={false}
        />
        <StickyNote child="Available for hiring" bg={4} isEven />
      </div>
    </motion.section>
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
          <HomeContent />
        </div>
      </div>
    </main>
  );
};

export default HomePage;

"use client";
import Image from "next/image";
import React from "react";
import AnimatedRect from "../svgcomponents/AnimatedRect";
import { motion } from "motion/react";
import Link from "next/link";
const projectsData = [
  {
    link: "https://bishraam.com/",
    image: "/bishraam.png",
    title: "Bishraam",
    description:
      "Hotel and trekking booking site with 300+ registered hotels in the country.",
  },
  {
    link: "https://yamburi.com/",
    image: "/yam.png",
    title: "Yamburi",
    description: "Ecommerce based on South Africa.",
  },
  {
    link: "https://www.esquire.co.za/",
    image: "/esquire.png",
    title: "Esquire",
    description: "Ecommerce based on South Africa.",
  },
  {
    link: "#",
    image: "/3hc.png",
    title: "3HC",
    description:
      "High Himalayan Hydro Construction - private construction company mostly focused on hydro power.",
  },
];

export const cardTiltVariants = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      delay: index * 0.09,
      damping: 10,
      stiffness: 200,
    },
  }),
};

const Projects = () => {
  return (
    <div className="w-full h-max p-4">
      <div className="h-max w-full max-w-2xl mx-auto flex flex-col gap-1">
        <h1 className="text-4xl font-bold mt-24">Projects</h1>
        <p className="text-xl">These are the works i have done for clients</p>
        {projectsData.map((project, i) => {
          return <ProjectCard key={project.title} {...project} index={i} />;
        })}
      </div>
    </div>
  );
};

interface ProjectCardProps {
  index: number;
  title: string;
  image: string;
  link: string;
  description: string;
}

const ProjectCard = (props: ProjectCardProps) => {
  return (
    <motion.div
      variants={cardTiltVariants}
      className="w-full h-max relative"
      initial="initial"
      whileInView="animate"
      custom={props.index}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center gap-10 absolute top-1/2 left-1/2 h-[80%] w-[90%]  -translate-x-1/2 -translate-y-1/2 mt-[1rem] overflow-hidden">
        <div className="w-auto h-[240px] py-[0.5rem]">
          <Image
            src={props.image}
            height={1000}
            width={1000}
            alt="project image"
            className="h-full w-auto object-cover object-left rounded-xl"
          />
        </div>
        <div className="right flex flex-col justify-center items-start gap-5 h-full w-full">
          <h3 className="font-bold text-3xl tracking-tight headingFont">
            {props.title}
          </h3>
          <p className="text-lg leading-none">{props.description}</p>
        </div>
      </div>
      <Link target="_blank" href={props.link} className="overlay w-full h-full">
        <AnimatedRect />
      </Link>
    </motion.div>
  );
};
export default Projects;

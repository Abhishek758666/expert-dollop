"use client";
import Image from "next/image";
import React from "react";
import AnimatedRect from "../svgcomponents/AnimatedRect";
import { motion } from "motion/react";
const projectsData = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Mountain Escape",
    description:
      "A peaceful retreat into the mountains with misty peaks and serene landscapes.",
  },
  {
    image: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3",
    title: "Ocean View",
    description:
      "Crystal clear waters with gentle waves crashing on the shore at sunset.",
  },
  {
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    title: "City Lights",
    description:
      "A bustling cityscape illuminated with colorful lights during the night.",
  },
  {
    image: "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6",
    title: "Forest Trail",
    description:
      "A winding path through a dense forest filled with vibrant green trees.",
  },
  {
    image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
    title: "Desert Dunes",
    description:
      "Rolling sand dunes under the blazing sun, creating a mesmerizing pattern.",
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
            className="h-full w-auto object-cover object-center rounded-xl"
          />
        </div>
        <div className="right flex flex-col justify-center items-start gap-5 h-full w-full">
          <h3 className="font-bold text-3xl tracking-tight headingFont">
            {props.title}
          </h3>
          <p className="text-lg leading-none">{props.description}</p>
        </div>
      </div>
      <div className="overlay w-full h-full">
        <AnimatedRect />
      </div>
    </motion.div>
  );
};
export default Projects;

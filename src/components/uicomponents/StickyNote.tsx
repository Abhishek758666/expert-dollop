"use client";
import React, { ReactNode } from "react";
import { motion } from "motion/react";

const colorOptions = {
  1: "#FBFF94",
  2: "#B8FFC6",
  3: "#FFA3A3",
  4: "#94E6FF",
  5: "#FFE5A3",
  6: "#CDA3FF",
};

interface StickyNoteProps {
  child: ReactNode;
  bg: keyof typeof colorOptions;
  isEven: boolean;
}

const cardTiltVariants = {
  inital: {
    y: 50,
  },
  animate: {
    rotate: [50, 0],
    y: 0,
    transition: {
      duration: 10,
      type: "spring",
      damping: 8,
      stiffness: 150,
    },
  },
};

const StickyNote: React.FC<StickyNoteProps> = ({ child, bg, isEven }) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      className="h-max w-max flex justify-center items-center cursor-grab"
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      whileTap={{
        rotate: "10deg",
        transition: {
          duration: 0.5,
          type: "spring",
          stiffness: 250,
          damping: 10,
        },
      }}
    >
      <motion.div
        style={{
          transformOrigin: "top left",
          backgroundColor: colorOptions[bg],
          marginTop: isEven ? "2rem" : "0",
        }}
        variants={cardTiltVariants}
        initial="inital"
        animate="animate"
        className="h-[130px] w-[140px] flex justify-center items-center shadow-lg p-4"
      >
        <span className="text-xl font-bold text-center leading-none">
          {child}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default StickyNote;

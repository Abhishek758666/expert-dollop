"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "../uicomponents/Button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getNotes } from "@/redux/thunks/note.thunk";
import Canvas from "../uicomponents/Canvas";

const RectangleBackground = () => (
  <div className="absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]" />
);

const Transition = {
  duration: 0.5,
  type: "easeInOut",
};

export const noteCardVariants = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: { ...Transition, delay: index * 0.06 },
  }),
};

const Visitors = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.notes?.loading);
  const notes = useAppSelector((state) => state.notes.data);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <div className="w-full h-[99.8vh] py-10 px-5">
      <div className="max-w-[550px] h-max mx-auto relative border rounded-xl border-[#dadada] bg-white overflow-hidden">
        <div className="navbar relative w-full bg-white p-4 z-30 h-max border-b border-[#dadada] flex justify-between">
          <p>{notes?.length ?? 0} Notes</p>
          <Button
            variant="secondary"
            onClick={() => setShowModal(true)}
            className="cursor-pointer bg-black shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)] transition-shadow duration-500 ease-in-out"
          >
            <Plus className="text-white" />
            <span className="text-white ml-3 text-lg">Leave a note</span>
          </Button>
        </div>
        <div className="w-full h-[80vh] relative z-20 bg-transparent">
          <RectangleBackground />
          {!isLoading ? (
            notes?.map((note, i) => {
              const top = `${Math.floor(Math.random() * 70 + 5)}%`;
              const left = `${Math.floor(Math.random() * 70 + 5)}%`;
              const rotate = `${Math.floor(Math.random() * 40 - 20)}deg`;

              return (
                <Card
                  index={i}
                  key={i}
                  top={top}
                  left={left}
                  rotate={rotate}
                  data={note}
                />
              );
            })
          ) : (
            <div className="h-full w-full flex text-xl justify-center items-center">
              <span className="animate-bounce">Loading...</span>
            </div>
          )}
        </div>
      </div>
      {showModal && <Canvas handleClose={() => setShowModal(false)} />}
    </div>
  );
};

interface CardProps {
  index: number;
  top: string;
  left: string;
  rotate: string;
  data: {
    image: string;
    name: string;
    message: string;
  };
}

const Card = ({ top, left, rotate, data, index }: CardProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      style={{
        position: "absolute",
        top,
        left,
        rotate,
        x: position.x,
        y: position.y,
      }}
      variants={noteCardVariants}
      initial="initial"
      animate="animate"
      custom={index}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={(event, info) => {
        setPosition((prev) => ({
          x: prev.x + info.offset.x,
          y: prev.y + info.offset.y,
        }));
      }}
      className="w-[140px] h-max cursor-grab active:cursor-grabbing relative"
    >
      <div className="relative w-full border bg-white rounded-md border-[#dadada]">
        <div className="flex flex-col gap-1 bg-secondary-foreground p-2">
          <Image
            src={data?.image}
            height={125}
            width={140}
            className="w-full rounded-md border h-[125px] object-cover"
            alt="visitor's image"
          />
          <p className="text-zinc-400 capitalize leading-none">{data?.name}</p>
          <p className="text-sm leading-none">{data?.message}</p>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-20"></div>
    </motion.div>
  );
};

export default Visitors;

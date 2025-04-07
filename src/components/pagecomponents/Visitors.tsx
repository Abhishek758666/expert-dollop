"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "../uicomponents/Button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getNotes } from "@/redux/thunks/note.thunk";
import Canvas from "../uicomponents/Canvas";
import { API_BASE_URL_IMAGE } from "@/lib/config";

const RectangleBackground = () => (
  <div className="absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]" />
);

const Visitors = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.notes?.loading);
  const notes = useAppSelector((state) => state.notes.data);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);
  return isLoading ? (
    "Loading..."
  ) : (
    <div className="w-full h-full py-20 px-5">
      <div className="max-w-[550px] h-full mx-auto relative border rounded-xl border-[#dadada] bg-white overflow-hidden">
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
        <div className="w-full h-[70vh] relative z-20 bg-transparent">
          <RectangleBackground />
          {notes?.map((note, i) => (
            <Card
              key={i}
              top={`${Math.floor(Math.random() * 80)}%`}
              left={`${Math.floor(Math.random() * 80)}%`}
              rotate={`${Math.floor(Math.random() * 20)}deg`}
              data={note}
            />
          ))}
        </div>
      </div>
      {showModal && <Canvas handleClose={() => setShowModal(false)} />}
    </div>
  );
};

interface CardProps {
  top: string;
  left: string;
  rotate: string;
  data?: {
    image: string;
    name: string;
    message: string;
  };
}

const Card = ({ top, left, rotate, data }: CardProps) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        top,
        left,
        rotate,
      }}
      drag
      dragMomentum={false}
      whileTap={{ zIndex: 99 }}
      dragElastic={0}
      className="w-[140px] h-max cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-full border bg-white rounded-md border-[#dadada]">
        <div className="flex flex-col gap-1 bg-secondary-foreground p-2">
          <Image
            src={`${data?.image}`}
            height={400}
            width={400}
            className="w-full rounded-md border h-[125px]"
            alt="visitor's image"
          />
          <p className="text-zinc-400 capitalize leading-none">{data?.name}</p>
          <p className="text-sm leading-none">{data?.message}</p>
        </div>
      </div>
      <div className="absolute top-0 left-0 z-30 w-full h-full"></div>
    </motion.div>
  );
};

export default Visitors;

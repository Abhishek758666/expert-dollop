"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Binoculars,
  BotMessageSquare,
  House,
  Mail,
  Pickaxe,
} from "lucide-react";

const socialLinks = [
  { text: "Home", link: "/", icon: <House /> },
  { text: "Visitors", link: "/visitors", icon: <Binoculars /> },
  { text: "Projects", link: "/projects", icon: <Pickaxe /> },
  { text: "Contact", link: "mailto:abhishekkhati39@gmail.com", icon: <Mail /> },
];

const hoverMotion = {
  whileHover: {
    translateY: "-.4rem",
    color: "#474747",
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};

const Tooltip = ({ text }: { text: string }) => (
  <motion.span
    className="customShadow font-sans absolute -top-15 left-1/2 -translate-x-1/2 border border-[#F5F6FF] rounded-2xl bg-white px-2 font-medium text-[#474747] max-w-[900px] w-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    }}
    exit={{ opacity: 0, y: 20 }}
  >
    {text}
  </motion.span>
);

const SocialLinkItem = ({
  text,
  link,
  icon,
  isHovered,
  setIsHovered,
  isActive,
}: {
  text: string;
  link: string;
  icon: React.ReactNode;
  isHovered: string | null;
  setIsHovered: (text: string | null) => void;
  isActive: boolean;
}) => (
  <motion.li
    className="relative"
    onMouseEnter={() => setIsHovered(text)}
    onMouseLeave={() => setIsHovered(null)}
  >
    {isHovered === text && <Tooltip text={text} />}
    <Link href={link}>
      <motion.div
        {...hoverMotion}
        className={`${
          isActive
            ? "border-[#474747] !text-[#474747]"
            : "border-[#F5F6FF] text-[#B8BBD2]"
        } flex items-center gap-2 font-bold p-2 rounded-2xl border-2 text-sm customShadow`}
        aria-label={text}
      >
        {icon}
        <span className="sr-only">{text}</span>
      </motion.div>
    </Link>
  </motion.li>
);

const ChatBotLink = ({
  isHovered,
  setIsHovered,
  isActive,
}: {
  isHovered: string | null;
  setIsHovered: (text: string | null) => void;
  isActive: boolean;
}) => (
  <motion.div
    className="relative"
    onMouseEnter={() => setIsHovered("Chat Bot")}
    onMouseLeave={() => setIsHovered(null)}
  >
    {isHovered === "Chat Bot" && <Tooltip text="Chat Bot" />}
    <Link href={"/chatbot"}>
      <motion.div
        {...hoverMotion}
        className={`${
          isActive
            ? "border-[#474747] !text-[#474747]"
            : "border-[#F5F6FF] text-[#B8BBD2]"
        } flex items-center gap-2 font-bold p-2 rounded-2xl border-2 text-sm customShadow`}
        aria-label="Chat Bot"
      >
        <BotMessageSquare className="animate-bounce" />
      </motion.div>
    </Link>
  </motion.div>
);

const FloatingDoc = () => {
  const pathName = usePathname();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 10,
          stiffness: 200,
        },
      }}
      className="w-max max-w-[650px] h-[4rem] z-50 fixed bottom-5 border border-[#F5F6FF] rounded-2xl customShadow bg-white left-1/2 -translate-x-1/2 flex justify-between items-center px-5"
    >
      <ul className="flex gap-2 md:gap-6 text-md headingFont font-light capitalize">
        {socialLinks.map(({ text, link, icon }) => (
          <SocialLinkItem
            key={text}
            text={text}
            link={link}
            icon={icon}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            isActive={pathName === link}
          />
        ))}
      </ul>

      <div className="h-[50%] w-[2px] bg-[#B8BBD2] rounded-xl mx-4" />

      <ChatBotLink
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        isActive={pathName === "/chatbot"}
      />
    </motion.div>
  );
};

export default FloatingDoc;

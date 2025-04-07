"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Binoculars,
  House,
  Mail,
  MessageCircleMore,
  Pickaxe,
  User,
} from "lucide-react";

interface SocialLink {
  text: string;
  link: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  { text: "Home", link: "/", icon: <House /> },
  { text: "Visitors", link: "/visitors", icon: <Binoculars /> },
  { text: "Projects", link: "/projects", icon: <Pickaxe /> },
  { text: "About", link: "/about", icon: <User /> },
  { text: "Contact", link: "/contact", icon: <Mail /> },
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

const FloatingDoc = () => {
  const pathName = usePathname();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <>
      <div className="w-max max-w-[650px] h-[4rem] z-50 fixed bottom-5 border border-[#F5F6FF] rounded-2xl customShadow bg-white left-1/2 -translate-x-1/2 flex justify-between items-center px-5">
        <ul className="flex gap-2 md:gap-6 text-md headingFont font-light capitalize">
          {socialLinks.map(({ text, link, icon }) => {
            return (
              <li
                key={text}
                className="relative"
                onMouseEnter={() => setIsHovered(text)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {isHovered === text && (
                  <motion.span
                    className="customShadow font-sans absolute -top-15 left-1/2 -translate-x-1/2 border border-[#F5F6FF] rounded-2xl bg-white px-2 font-medium text-[#474747]"
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
                )}
                <Link href={link}>
                  <motion.div
                    {...hoverMotion}
                    className={`${
                      pathName === link
                        ? "border-[#474747] !text-[#474747]"
                        : "border-[#F5F6FF] text-[#B8BBD2]"
                    } flex items-center gap-2 font-bold p-2 rounded-2xl border-2 text-sm customShadow`}
                    aria-label={text}
                  >
                    {icon}
                    <span className="sr-only">{text}</span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="h-[50%] w-[2px] bg-[#B8BBD2] rounded-xl mx-4" />

        <Link href={"#"} target="_blank">
          <motion.div
            {...hoverMotion}
            className="flex items-center gap-2 font-bold border-[#F5F6FF] text-[#B8BBD2] p-2 rounded-2xl border-2 text-sm customShadow"
            aria-label="Chat"
          >
            <MessageCircleMore />
            <span className="sr-only">Chat</span>
          </motion.div>
        </Link>
      </div>
    </>
  );
};

export default FloatingDoc;

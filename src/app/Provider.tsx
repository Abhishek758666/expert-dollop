"use client";
import ArrowSvg, { AnimatedSVG } from "@/components/svgcomponents/ArrowSvg";
import StickyNote from "@/components/uicomponents/StickyNote";
import Image from "next/image";
import React, { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="absolute inset-0 [background-size:30px_30px] [background-image:radial-gradient(#EAEAF1_2px,transparent_2px)] dark:[background-image:radial-gradient(#EAEAF1_2px,transparent_2px)] animate-[background-position_2s_linear_infinite]" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="max-h-screen w-full relative z-20 border overflow-y-hidden">
        <AppLayout>{children}</AppLayout>
      </div>
    </div>
  );
};

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="max-w-[820px] w-full mx-auto px-4 py-20 grid gap-20 grid-cols-[1.5fr_2fr] tracking-tighter leading-none">
      <aside>
        <LayoutAside />
      </aside>
      <div className="page h-[85vh] overflow-y-auto w-full !scrollbar-none">
        {children}
      </div>
    </main>
  );
};

const LayoutAside = () => {
  return (
    <section className="flex-grow-1 w-full h-screen">
      <div className="flex flex-col items-center justify-center">
        <AnimatedSVG />
        <Image
          className="h-[119px] w-[119px] rounded-full border-3 object-cover border-black"
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
      <div className="w-full py-10 grid grid-cols-2 gap-0 space-y-4">
        <StickyNote
          child="1+ year as software developer"
          isEven={false}
          bg={1}
        />
        <StickyNote child="worked in 5+ projects" bg={3} isEven />
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
          bg={2}
          isEven={false}
        />
        <StickyNote child="Available for work" bg={4} isEven />
      </div>
    </section>
  );
};
export default Provider;

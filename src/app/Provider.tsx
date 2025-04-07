"use client";

import store, { persister } from "@/redux/store";
import React from "react";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as ReduxProvider } from "react-redux";
import FloatingDoc from "@/components/uicomponents/FloatingDoc";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <Toaster position="top-center" />
        <div className="fixed top-0 left-0 inset-0 [background-size:30px_30px] [background-image:radial-gradient(#EAEAF1_2px,transparent_2px)] dark:[background-image:radial-gradient(#EAEAF1_2px,transparent_2px)] animate-[background-position_2s_linear_infinite]" />
        <div className="pointer-events-none fixed top-0 inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="h-full w-full relative z-20 border tracking-tighter">
          <FloatingDoc />
          {children}
        </div>
      </PersistGate>
    </ReduxProvider>
  );
};

export default Provider;

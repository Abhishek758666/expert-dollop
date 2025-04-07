// components/DrawingCanvas.tsx
"use client";

import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

export default function DrawingCanvas() {
  return (
    <div className="h-screen w-full">
      <Tldraw />
    </div>
  );
}

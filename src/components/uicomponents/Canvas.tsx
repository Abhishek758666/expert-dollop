import { useRef, useState, useEffect, type ChangeEvent } from "react";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";
import { Dot, Eraser, Pen, Redo, RotateCcw, Undo } from "lucide-react";
import { Button } from "./Button";
import { useAppDispatch } from "@/redux/store";
import { addNotes, getNotes } from "@/redux/thunks/note.thunk";
import { successToast } from "@/lib/toastify";
import Modal from "./Modal";

interface CanvasProps {
  handleClose: () => void;
}

const Canvas = ({ handleClose }: CanvasProps) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [strokeColor, setStrokeColor] = useState("#f51414");
  const [eraseMode, setEraseMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(30);
  const [isStrokeOpen, setIsStrokeOpen] = useState(false);

  const strokeWidthRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) => {
    if (strokeWidthRef.current && !strokeWidthRef.current.contains(e.target)) {
      setIsStrokeOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dispatch = useAppDispatch();
  const [note, setNote] = useState({
    name: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote((note) => ({
      ...note,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const dataURL = await canvasRef.current?.exportImage("png");
      if (!dataURL) return console.error("Failed to export image");

      const imgBlob = await (await fetch(dataURL)).blob();
      const imgFile = new File([imgBlob], "noteImage.png", {
        type: "image/png",
      });

      const formData = new FormData();
      formData.append("name", note.name || "Untitled");
      formData.append("message", note.message || "No message");
      formData.append("noteImage", imgFile);

      await dispatch(
        addNotes({
          data: formData,
          callback: () => {
            successToast("Note added successfully!! wait until verified");
            dispatch(getNotes());
          },
        })
      );
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  // canvas functions
  const handleStrokeColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(event.target.value);
  };

  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleUndoClick = () => {
    canvasRef.current?.undo();
  };

  const handleRedoClick = () => {
    canvasRef.current?.redo();
  };

  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
    setHasDrawing(false);
  };

  // Handle the change in stroke width
  const handleStrokeWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(Number(event.target.value));
  };

  useEffect(() => {
    const checkCanvas = async () => {
      const dataURL = await canvasRef.current?.exportImage("png");
      setHasDrawing(!!dataURL && dataURL !== "data:,");
    };

    const interval = setInterval(checkCanvas, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Modal onClose={handleClose} isOpen={true}>
      <div className="flex flex-col w-[30rem] gap-4 p-4 bg-[#FAFAFA] rounded-md">
        <div className="flex items-center gap-3 w-full">
          <Button
            size="icon"
            type="button"
            onClick={() => colorInputRef.current?.click()}
            style={{ backgroundColor: strokeColor }}
          >
            <input
              type="color"
              ref={colorInputRef}
              className="sr-only"
              value={strokeColor}
              onChange={handleStrokeColorChange}
            />
          </Button>

          <div className="flex items-center gap-3">
            <Button
              size="icon"
              type="button"
              variant="outline"
              disabled={!eraseMode}
              onClick={handlePenClick}
            >
              <Pen size={16} />
            </Button>
            <Button
              size="icon"
              type="button"
              variant="outline"
              disabled={eraseMode}
              onClick={handleEraserClick}
            >
              <Eraser size={16} />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="icon"
              type="button"
              variant="outline"
              onClick={handleUndoClick}
            >
              <Undo size={16} />
            </Button>
            <Button
              size="icon"
              type="button"
              variant="outline"
              onClick={handleRedoClick}
            >
              <Redo size={16} />
            </Button>
            <Button
              size="icon"
              type="button"
              variant="outline"
              onClick={handleClearClick}
            >
              <RotateCcw size={16} />
            </Button>
          </div>
          <div className="relative flex items-center gap-4 ">
            <Button
              size="icon"
              type="button"
              variant="outline"
              onClick={() => setIsStrokeOpen(true)}
            >
              <Dot size={16} />
            </Button>
            {isStrokeOpen && (
              <div
                ref={strokeWidthRef}
                className="border bg-[#fafafa] p-5 absolute w-[10rem] h-[10rem] top-0 right-0 flex flex-col justify-start gap-3 items-center bg-secondary-foreground"
              >
                <input
                  id="strokeWidth"
                  type="range"
                  min="10"
                  max="100"
                  value={strokeWidth}
                  onChange={handleStrokeWidthChange}
                  className="CanvasStrokeWidth"
                />
                <div
                  style={{
                    width: `${strokeWidth}px`,
                    height: `${strokeWidth}px`,
                    backgroundColor: strokeColor,
                    borderRadius: "100%",
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>

        <ReactSketchCanvas
          width="100%"
          height="400px"
          ref={canvasRef}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth} // <-- Set stroke width here
          canvasColor="#c5c5c5"
        />

        <input
          onChange={handleChange}
          type="text"
          value={note?.name}
          name="name"
          placeholder="Enter your name"
          className="input-style"
        />
        <input
          name="message"
          type="text"
          value={note?.message}
          onChange={handleChange}
          className="input-style"
          placeholder="Enter message"
        />
        <div className="flex justify-end gap-5 ">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Close
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            disabled={isLoading || !note.name || !note.message || !hasDrawing}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Canvas;

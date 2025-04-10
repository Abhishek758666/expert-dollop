"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "@/components/uicomponents/Button";
import { addUserMessage, Message } from "@/redux/slice/chat.slice";
import { Ellipsis, Loader, Send, X } from "lucide-react";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { chat } from "@/redux/thunks/chat.thunk";

const RectangleBackground = () => (
  <div className="absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]" />
);

const ChatBot = () => {
  const dispatch = useAppDispatch();

  const messages = useAppSelector((state) => state.chat.data);
  const loading = useAppSelector((state) => state.chat.loading);

  const messagesEndRef = useRef(null);

  const [input, setInput] = useState("");

  const handleSend = () => {
    dispatch(addUserMessage(input));
    dispatch(chat({ prompt: input, history: messages }));
    setInput("");
  };
  return (
    <div className="w-full h-[99.8vh] py-10 px-5">
      <div className="max-w-[550px] h-max mx-auto relative border rounded-xl border-[#dadada] bg-white overflow-hidden">
        <div className="w-full h-[82vh]">
          <RectangleBackground />
          <div className="relative z-20 h-full flex flex-col justify-between gap-0">
            <RenderMessages
              messages={messages}
              loading={loading}
              messagesEndRef={messagesEndRef}
            />
            <RenderChatInput
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface RenderMessagesProps {
  messages: Message[];
  loading: boolean;
  messagesEndRef: any;
}

const RenderMessages = React.memo(
  ({ messages, loading, messagesEndRef }: RenderMessagesProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [autoScroll, setAutoScroll] = useState(true);

    const handleScroll = useCallback(() => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      setAutoScroll(scrollHeight - (scrollTop + clientHeight) < 50);
    }, []);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    useEffect(() => {
      if (autoScroll && messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages, autoScroll]);

    return (
      <div
        ref={containerRef}
        className="flex-1 relative h-full overflow-y-auto customScrollbar p-2 space-y-2 text-xl"
        aria-live="polite"
        aria-atomic="true"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            role="alert"
            className={`px-3 py-1 rounded-xl max-w-[80%] w-fit transition-transform duration-300 ${
              msg.role === "user"
                ? "bg-blue-600 text-white ml-auto rounded-br-none"
                : "bg-gray-100 text-black rounded-bl-none"
            }`}
          >
            {msg?.parts?.[0].text ?? "Couldn't get response"}
          </div>
        ))}
        {loading && (
          <div className="px-3 py-1 rounded-xl max-w-xs w-fit my-2 bg-gray-100 text-black">
            <Ellipsis className="animate-bounce" color="#000" />
          </div>
        )}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>
    );
  }
);

interface RenderChatInputProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  handleSend: () => void;
  loading: boolean;
}

const RenderChatInput = ({
  input,
  setInput,
  handleSend,
  loading,
}: RenderChatInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) handleSend();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border-t p-4 gap-2 h-[80px] w-full bg-white"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-2 border border-[#dadada] rounded-md outline-none text-black text-lg"
        placeholder="Type a message..."
        aria-label="Chat input"
        disabled={loading}
      />
      <Button
        type="submit"
        aria-label="Send message"
        className="border border-[#dadada]"
        disabled={loading || !input.trim()}
        size="icon"
      >
        {loading ? (
          <Loader className="animate-spin" size={18} color="#000" />
        ) : (
          <Send size={18} color="#000" />
        )}
      </Button>
    </form>
  );
};

export default ChatBot;

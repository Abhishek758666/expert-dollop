"use client";
import { Message } from "@/redux/slice/chat.slice";
import { Ellipsis, Loader, Send, X } from "lucide-react";
import { motion } from "framer-motion";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Button } from "./uicomponents/Button";

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
interface RenderMessagesProps {
  messages: Message[];
  loading: boolean;
  messagesEndRef: any;
}

interface ChatbotProps {
  icon: ReactNode;
  text: string;
}

const Chatbot = ({ icon, text }: ChatbotProps) => {
  const [showChat, setShowChat] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div
      onMouseEnter={() => setIsHovered(text)}
      onMouseLeave={() => setIsHovered(null)}
      className="relative"
      role="button"
      aria-label="Open chatbot"
    >
      {isHovered === text && (
        <motion.span
          style={{ fontFamily: "Solway" }}
          className="customShadow min-w-[90px] text-center absolute -top-15 left-1/2 -translate-x-1/2 border border-[#F5F6FF] rounded-2xl bg-white px-2 font-medium text-[#474747]"
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
          role="tooltip"
        >
          {text}
        </motion.span>
      )}
      <motion.div
        onClick={() => setShowChat(true)}
        {...hoverMotion}
        className={`flex items-center gap-2 font-bold p-2 rounded-2xl border-2 border-[#F5F6FF] text-[#B8BBD2] text-sm customShadow`}
        aria-label="Chatbot trigger"
        role="button"
      >
        {icon}
      </motion.div>
      {showChat && (
        <RenderChatWindow
          isOpen={showChat}
          setIsOpen={setShowChat}
          input="ha ha"
          setInput={() => {}}
          handleSend={() => {}}
          loading={false}
          messages={[]}
          messagesEndRef={messagesEndRef}
        />
      )}
    </div>
  );
};

export default Chatbot;

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
        className="flex-1 relative h-[500px] overflow-y-auto p-2 space-y-2 min-h-0"
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
      className="flex items-center border-t border-gray-200 p-2 gap-2"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-2 border rounded-md outline-none text-black"
        placeholder="Type a message..."
        aria-label="Chat input"
        disabled={loading}
      />
      <Button
        type="submit"
        aria-label="Send message"
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

interface RenderChatWindowProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  handleSend: () => void;
  loading: boolean;
  messages: Message[];
  messagesEndRef: any;
}

const RenderChatWindow = React.memo(
  ({
    setIsOpen,
    isOpen,
    input,
    setInput,
    handleSend,
    loading,
    messages,
    messagesEndRef,
  }: RenderChatWindowProps) => {
    const closeChat = useCallback(() => setIsOpen(false), []);

    return (
      <div className="w-full md:w-[30rem] bg-white shadow-lg rounded-lg p-4 flex flex-col h-[600px] max-h-[90vh] absolute bottom-0 left-0 min-h-0">
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full absolute right-2 top-2 z-10"
          onClick={closeChat}
          aria-label="Close chat"
        >
          <X size={20} />
        </Button>

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
    );
  }
);

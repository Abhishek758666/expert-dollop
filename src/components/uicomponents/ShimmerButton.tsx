import React from "react";

const RainbowButton = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`relative overflow-hidden px-8 py-3 rounded-lg text-white font-bold transition-all duration-300 ${className}`}
    >
      {/* Rainbow shadow element */}
      <span className="absolute inset-0 -z-10">
        <span className="absolute inset-0 animate-rainbow-shadow blur-lg"></span>
      </span>

      {/* Button content */}
      <span className="relative z-10 flex gap-1">{children}</span>
    </button>
  );
};

export default RainbowButton;

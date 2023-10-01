"use client";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  full?: boolean;
  isLoading?: boolean;
  bgColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  sm,
  md,
  lg,
  full,
  isLoading,
  bgColor,
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-3xl hover:opacity-70 m-1 transition-all duration-300 ${
        bgColor ? bgColor : "bg-blue-700"
      }  py-2 ${
        isLoading
          ? "bg-gray-800   rounded-full text-gray-800 animate-pulse "
          : ""
      }  ${full ? "w-full text-sm md:text-sm lg:text-lg " : ""} ${
        sm ? "px-6 rounded text-sm" : ""
      }`}
    >
      {" "}
      {label}
    </button>
  );
};

export default Button;

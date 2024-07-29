import React from "react";

interface ButtonProps {
  height?: string;
  width?: string;
  color?: string;
  textColor?: string;
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  height = "py-2.5",
  width = "px-5",
  color = "bg-gradient-to-r from-green-400 via-green-500 to-green-600",
  textColor = "text-white",
  text = "Button",
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`${textColor} ${color} hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm ${width} ${height} text-center me-2 mb-2`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

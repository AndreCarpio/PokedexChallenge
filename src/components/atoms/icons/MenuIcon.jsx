import React from "react";

export const MenuIcon = ({
  size = "1.5rem",
  fill = "currentColor",
  className = "",
}) => {
  return (
    <svg
      className={className}
      height={size}
      width={size}
      fill={fill}
      viewBox="0 -960 960 960"
    >
      <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>
  );
};

import React from "react";

export const CloseIcon = ({
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
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
};

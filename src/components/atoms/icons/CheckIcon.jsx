export const CheckIcon = ({
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
      <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" />
    </svg>
  );
};

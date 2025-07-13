export const NextIcon = ({
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
      <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
    </svg>
  );
};

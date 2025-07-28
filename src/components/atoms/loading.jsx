import "./Loading.css";

const sizeStyles = {
  xs: {
    spinner: { size: "1rem", borderWidth: "0.15rem" },
    text: "loading-text-xs",
  },
  sm: {
    spinner: { size: "1.5rem", borderWidth: "0.2rem" },
    text: "loading-text-sm",
  },
  md: {
    spinner: { size: "2.5rem", borderWidth: "0.4rem" },
    text: "loading-text-md",
  },
  lg: {
    spinner: { size: "3.5rem", borderWidth: "0.5rem" },
    text: "loading-text-lg",
  },
  xl: {
    spinner: { size: "4.5rem", borderWidth: "0.6rem" },
    text: "loading-text-xl",
  },
  "2xl": {
    spinner: { size: "6rem", borderWidth: "0.7rem" },
    text: "loading-text-2xl",
  },
};

export const Loading = ({
  text = "Loading...",
  hideText = false,
  className = "",
  size = "md",
}) => {
  const current = sizeStyles[size] || sizeStyles["md"];

  return (
    <div className={`loading-container ${current.text} ${className}`}>
      <span
        role="status"
        aria-label="Loading spinner"
        className="loading-spinner"
        style={{
          height: current.spinner.size,
          width: current.spinner.size,
          minHeight: current.spinner.size,
          minWidth: current.spinner.size,
          borderWidth: current.spinner.borderWidth,
        }}
      />
      {!hideText && <p>{text}</p>}
    </div>
  );
};

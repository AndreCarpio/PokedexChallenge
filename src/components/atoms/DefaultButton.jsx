import "./DefaultButton.css";

export const DefaultButton = ({
  children,
  onCLick = () => {},
  className = "",
  ...props
}) => {
  return (
    <button
      className={`defaultButton ${className}`}
      onClick={onCLick}
      {...props}
    >
      {children}
    </button>
  );
};

import "./Spinner.css";

export const Spinner = ({ color = "var(--gray-900)", borderWidth = "5px" }) => {
  return (
    <div
      className="spinner"
      style={{
        borderTopColor: color,
        borderLeftColor: color,
        borderRightColor: color,
        borderBottomColor: "transparent",
        borderWidth: borderWidth,
      }}
    ></div>
  );
};

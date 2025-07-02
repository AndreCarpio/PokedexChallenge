import "./Spinner.css";

export const Spinner = ({ color = "black", borderWidth = "5px" }) => {
  return (
    <div
      className="spinner"
      style={{
        borderColor: color,
        borderBottomColor: "transparent",
        borderWidth: borderWidth,
      }}
    ></div>
  );
};

import { useEffect, useState } from "react";
import "./Alert.css";

const classMap = {
  error: {
    containerClass: "alert error",
    bulletClass: "bullet error",
  },
  info: {
    containerClass: "alert info",
    bulletClass: "bullet info",
  },
  success: {
    containerClass: "alert success",
    bulletClass: "bullet success",
  },
  warn: {
    containerClass: "alert warn",
    bulletClass: "bullet warn",
  },
};

export const Alert = ({
  type = "info",
  title = "Default Title",
  description = "",
  list = [],
  visibleTime,
  className = "",
  children,
}) => {
  const [visible, setVisible] = useState(true);
  const classes = classMap[type] ?? classMap["info"];

  useEffect(() => {
    const ms = Number(visibleTime);
    if (ms > 0) {
      const timer = setTimeout(() => setVisible(false), ms);
      return () => clearTimeout(timer);
    }
  }, [visibleTime]);

  if (!visible) return null;

  return (
    <div className={`${classes.containerClass} ${className}`}>
      <div
        className={`alert-content ${
          description !== "" || list.length > 0 ? "align-start" : "align-center"
        }`}
      >
        <p className="alert-title">{title}</p>
        {description && <p className="alert-description">{description}</p>}
        {list.map((element, i) => (
          <p key={`list-option-${i}`} className="alert-list-item">
            <span className={classes.bulletClass}></span>
            {element}
          </p>
        ))}
        {children}
      </div>
    </div>
  );
};

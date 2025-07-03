import { Link, useLocation } from "react-router";
import "./HeaderOption.css";

export const HeaderOption = ({ to, children }) => {
  const lotation = useLocation();
  return (
    <Link
      className={` headerOption  ${lotation.pathname === to && "active"}`}
      to={to}
    >
      {children}
    </Link>
  );
};

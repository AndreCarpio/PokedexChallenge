import { Link, useLocation } from "react-router";
import "./HeaderOption.css";

export const HeaderOption = ({ to, children, onClick = () => {} }) => {
  const lotation = useLocation();
  return (
    <Link
      className={` headerOption  ${lotation.pathname === to && "active"}`}
      to={to}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

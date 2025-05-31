import { Link, useLocation } from "react-router"
import "./HeaderOption.css"

export const HeaderOption = ({ to, children }) => {
    const lotation = useLocation()
    return (
        <Link className=" headerOption " style={{ color: lotation.pathname === to ? "black" : "" }} to={to}>{children}</Link>
    )
}

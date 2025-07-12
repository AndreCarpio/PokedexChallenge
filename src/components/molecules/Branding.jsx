import { Link } from "react-router";
import pokeball from "../../assets/pokeball.svg";
import "./Branding.css";
export const Branding = () => {
  return (
    <>
      <Link to={"/"} className=" branding ">
        <img src={pokeball} className="logo " alt="page logo" />
        <p className="name">Pokédex</p>
      </Link>
    </>
  );
};

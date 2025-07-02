import pokeball from "../../assets/pokeball.svg";
import "./Branding.css";
export const Branding = () => {
  return (
    <>
      <div className=" branding ">
        <img src={pokeball} className="logo " />
        <p className="name">Pokédex</p>
      </div>
    </>
  );
};

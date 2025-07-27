import { HeaderOption } from "../atoms/HeaderOption";
import "./HeaderNav.css";

export const HeaderNav = ({ className = "", onClickOption = () => {} }) => {
  const OPTIONS = [
    { route: "/", name: "Home" },
    { route: "/game", name: "Game" },
    { route: "/pokemons", name: "Pokemons" },
    { route: "/types", name: "Types" },
  ];

  return (
    <div className={`options ${className} `}>
      {OPTIONS.map((option) => {
        return (
          <HeaderOption
            key={option.route}
            to={option.route}
            onClick={onClickOption}
          >
            {option.name}
          </HeaderOption>
        );
      })}
    </div>
  );
};

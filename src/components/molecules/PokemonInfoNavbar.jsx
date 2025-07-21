import "./PokemonInfoNavbar.css";

export const PokemonInfoNavbar = ({
  navbarInfo,
  onChange,
  NAV_OPTIONS = [],
}) => {
  return (
    <div className="navBarInformation">
      {NAV_OPTIONS.map((option) => (
        <button
          key={option}
          className={`option ${navbarInfo === option ? "active" : ""}`}
          onClick={() => onChange(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
};

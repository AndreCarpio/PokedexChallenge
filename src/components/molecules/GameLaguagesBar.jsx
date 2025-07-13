import USA from "../../assets/countryFlags/usa.svg";
import JAPAN from "../../assets/countryFlags/japan.svg";
import SPAIN from "../../assets/countryFlags/spain.svg";
import SOUTH_KOREA from "../../assets/countryFlags/southKorea.svg";
import { CheckIcon } from "../atoms/icons/CheckIcon";
import "./GameLaguagesBar.css";

export const GameLaguagesBar = ({ languageSelected = "" }) => {
  const LANGUAGES = [
    { name: "english", code: "en", image: USA },
    { name: "spanish", code: "es", image: SPAIN },
    { name: "japanese", code: "ja", image: JAPAN },
    { name: "korean", code: "ko", image: SOUTH_KOREA },
  ];

  return (
    <div className="languageBar">
      <p className="label">Select a language</p>

      <div className="containerFlags">
        {LANGUAGES.map((flag, index) => {
          return (
            <div key={index} className="flag">
              <img src={flag.image} alt="flag image" />
              <span
                className={`checkIcon ${languageSelected === flag.name ? "active" : ""}`}
              >
                <CheckIcon size="1.2rem" fill="var(--white-color)" />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

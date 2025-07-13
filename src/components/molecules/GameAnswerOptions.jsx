import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLatter";
import { DefaultButton } from "../atoms/DefaultButton";
import "./GameAnswerOptions.css";

export const GameAnswerOptions = ({
  options = [],
  selectedOption,
  onClick,
  languageCode,
}) => {
  function getOptionButtonClass(option, selectedOption) {
    if (!selectedOption) return "";
    if (option.name === selectedOption.name) {
      return option.answer ? "success" : "danger";
    }
    return "disable";
  }

  function getCorrectName(option) {
    let name = option.names.find((language) => {
      return language.code == languageCode;
    });
    if (name) {
      return name.name;
    }
    return option.name;
  }
  return (
    <div className="gamePokemonOptions">
      {options.map((option, index) => {
        return (
          <DefaultButton
            key={index}
            className={`sizeLg ${getOptionButtonClass(option, selectedOption)}`}
            onCLick={() => {
              onClick(option);
            }}
          >
            {capitalizeFirstLetter(getCorrectName(option))}
          </DefaultButton>
        );
      })}
    </div>
  );
};

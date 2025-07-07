import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLatter";
import { DefaultButton } from "../atoms/DefaultButton";
import "./GameAnswerOptions.css";

export const GameAnswerOptions = ({
  options = [],
  selectedOption,
  onClick,
}) => {
  function getOptionButtonClass(option, selectedOption) {
    if (!selectedOption) return "";
    if (option.name === selectedOption.name) {
      return option.answer ? "success" : "danger";
    }
    return "disable";
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
            {capitalizeFirstLetter(option.name)}
          </DefaultButton>
        );
      })}
    </div>
  );
};

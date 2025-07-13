import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLatter";
import "./GameResultMessage.css";

export const GameResultMessage = ({
  selectedOption,
  correctOptionInfo,
  languageCode = "",
}) => {
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
    <div className="containerResultMessage">
      {selectedOption && (
        <>
          {selectedOption.name === correctOptionInfo.name ? (
            <p className="gameResultMessage correct">Well done!</p>
          ) : (
            <p className="gameResultMessage incorrect">
              Oops, it was{" "}
              {capitalizeFirstLetter(getCorrectName(correctOptionInfo))}...
            </p>
          )}
        </>
      )}
    </div>
  );
};

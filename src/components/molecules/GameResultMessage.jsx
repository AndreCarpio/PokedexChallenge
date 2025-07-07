import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLatter";
import "./GameResultMessage.css";

export const GameResultMessage = ({ selectedOption, correctOptionInfo }) => {
  return (
    <>
      {selectedOption && (
        <>
          {selectedOption.name === correctOptionInfo.name ? (
            <p className="gameResultMessage correct">Well done!</p>
          ) : (
            <p className="gameResultMessage incorrect">
              Oops, it was {capitalizeFirstLetter(correctOptionInfo.name)}...
            </p>
          )}
        </>
      )}
    </>
  );
};

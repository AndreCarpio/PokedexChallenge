import { DefaultButton } from "../atoms/DefaultButton";
import "./FinalScoreMessage.css";

export const FinalScoreMessage = ({ score = 0, restart = () => {} }) => {
  return (
    <div className="finalScoreMessage">
      <div className="message">
        <p className="label">Final Score</p>
        <p className="score">{score}</p>
      </div>
      <div>
        <DefaultButton className="sizeLg roundedLg" onCLick={restart}>
          Restart
        </DefaultButton>
      </div>
    </div>
  );
};

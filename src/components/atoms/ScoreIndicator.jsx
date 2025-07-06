import "./ScoreIndicator.css";

export const ScoreIndicator = ({ score = 0 }) => {
  return (
    <div className="scoreIndicator">
      <p className="scoreLabel">score:</p>
      <p className="score">{score}</p>
    </div>
  );
};

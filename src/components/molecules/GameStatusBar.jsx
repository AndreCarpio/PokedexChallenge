import { LivesIndicator } from "../atoms/LivesIndicator";
import { ScoreIndicator } from "../atoms/ScoreIndicator";
import "./GameStatusBar.css";
export const GameStatusBar = ({ score = 0, lives = 0 }) => {
  return (
    <div className="gameStatusBar">
      <ScoreIndicator score={score} />
      <LivesIndicator lives={lives} />
    </div>
  );
};

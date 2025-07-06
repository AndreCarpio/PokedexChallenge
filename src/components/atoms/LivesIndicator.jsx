import { HeartIcon } from "./icons/HeartIcon";
import "./LivesIndicator.css";
export const LivesIndicator = ({ lives = 0 }) => {
  return (
    <div className="livesIndicator">
      <HeartIcon
        className="iconHeart"
        fill="var(--danger-color)"
        size="1.4rem"
      />
      <p>x</p>
      <p>{lives}</p>
    </div>
  );
};

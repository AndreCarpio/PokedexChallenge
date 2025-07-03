import "./NotFound.css";
import notFoundImage from "../assets/notFoundImage.svg";
import { DefaultButton } from "../components/atoms/DefaultButton";
import { useNavigate } from "react-router";

export const NotFound = () => {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };
  return (
    <div className="pageNotFoundBanner">
      <img
        className="imageNotFound"
        src={notFoundImage}
        alt="Not found image"
      />

      <p>Page not found</p>

      <DefaultButton className="sizeLg btnBackToHome" onCLick={backToHome}>
        Back to home
      </DefaultButton>
    </div>
  );
};

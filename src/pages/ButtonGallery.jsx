import { DefaultButton } from "../components/atoms/DefaultButton";
import { useState } from "react";
import "./ButtonGallery.css";

const buttonVariants = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "disable",
];

const sizes = ["sizeXs", "sizeSm", "sizeBase", "sizeLg", "sizeXl"];
const roundings = [
  "roundedNone",
  "roundedSm",
  "rounded",
  "roundedMd",
  "roundedLg",
  "roundedXl",
  "rounded2xl",
  "rounded3xl",
  "roundedFull",
];
const fonts = ["fontLight", "fontMedium", "fontSemibold", "fontBold"];

export const ButtonGallery = () => {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (classes) => {
    navigator.clipboard.writeText(classes);
    setCopied(classes);
  };

  const renderButton = (label, classList) => (
    <DefaultButton
      key={classList}
      className={classList}
      onClick={() => copyToClipboard(classList)}
    >
      {label}
    </DefaultButton>
  );

  return (
    <div className="galleryContainer">
      <h2>Button Variants</h2>
      <div className="button-row">
        {buttonVariants.map((v) => renderButton(v, ` ${v}`))}
      </div>

      <h2>Sizes</h2>
      <div className="button-row">
        {sizes.map((s) => renderButton(s, `${s}`))}
      </div>

      <h2>Rounded</h2>
      <div className="button-row">
        {roundings.map((r) => renderButton(r, `${r}`))}
      </div>

      <h2>Font Weights</h2>
      <div className="button-row">
        {fonts.map((f) => renderButton(f, `${f}`))}
      </div>
      {copied && (
        <div className="messageClasesCopied">
          <p className="label">Copied to Clipboard: </p>
          <p className="classes">{copied}</p>
        </div>
      )}
    </div>
  );
};

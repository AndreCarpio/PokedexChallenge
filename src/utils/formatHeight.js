export const formatHeight = (heightDecimetres) => {
  if (typeof heightDecimetres !== "number") return "";

  const meters = heightDecimetres / 10;

  const totalInches = meters * 39.3701;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);

  return `${meters.toFixed(1)}m (${feet}′${inches.toString().padStart(2, "0")}″)`;
};

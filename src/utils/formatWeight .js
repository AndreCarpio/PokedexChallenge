export const formatWeight = (weightHectograms) => {
  if (typeof weightHectograms !== "number") return "";

  const kg = weightHectograms / 10;
  const lbs = kg * 2.20462;

  return `${kg.toFixed(1)}kg (${lbs.toFixed(1)} lbs)`;
};

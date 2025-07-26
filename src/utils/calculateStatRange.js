export const calculateStatRange = (baseStat, statName) => {
  const IV = 31;
  const EV = 252;
  const level = 100;

  if (statName === "hp") {
    const min = Math.floor((2 * baseStat * level) / 100 + level + 10);
    const max = Math.floor(
      ((2 * baseStat + IV + Math.floor(EV / 4)) * level) / 100 + level + 10,
    );
    return { min, max };
  } else {
    const min = Math.floor(((2 * baseStat * level) / 100 + 5) * 0.9);
    const max = Math.floor(
      (((2 * baseStat + IV + Math.floor(EV / 4)) * level) / 100 + 5) * 1.1,
    );
    return { min, max };
  }
};

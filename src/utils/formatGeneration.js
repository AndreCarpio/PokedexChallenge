export const formatGeneration = (name) => {
  if (typeof name === "string" && name.includes("-")) {
    const parts = name.split("-");
    const roman = parts[1]?.toUpperCase();

    const romanToNumber = {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 5,
      VI: 6,
      VII: 7,
      VIII: 8,
      IX: 9,
    };

    if (roman && romanToNumber[roman]) {
      return `Generation ${romanToNumber[roman]}`;
    }
  }
  return "";
};

export function capitalizeFirstLetter(str) {
  if (str?.length === 0 && str instanceof String) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

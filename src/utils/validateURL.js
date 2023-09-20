export const isValidURL = (string) => {
  try {
    const newURL = new URL(string);
    return newURL.protocol === "http:" || newURL.protocol === "https:";
  } catch {
    return false;
  }
};

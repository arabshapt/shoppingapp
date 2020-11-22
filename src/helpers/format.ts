export const formatString = (value: string | number): string | number => {
  if (value === "0" || value === null || value === 0) {
    return "--";
  } else {
    return value;
  }
};

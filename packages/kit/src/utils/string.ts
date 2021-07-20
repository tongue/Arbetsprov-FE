export const kebabToCamel = (str: string): string =>
  str
    .split("-")
    .map((item, index) =>
      index
        ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
        : item.toLowerCase()
    )
    .join("");

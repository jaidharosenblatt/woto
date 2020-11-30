export function getOrList(value) {
  if (!Array.isArray(value)) {
    return value;
  }
  let s = "";
  value.forEach((val, index) => {
    if (index === value.length - 2) {
      s += `${val} or `;
    } else if (index === value.length - 1) {
      s += val;
    } else {
      s += `${val}, `;
    }
  });
  return s;
}

export const degTrigger = (deg: string) => {
  return parseInt(deg.replace("deg", "")) * (Math.PI / 180);
};

export const radTrigger = (rad: string) => {
  return parseInt(rad.replace("rad", "")) * (180 / Math.PI);
};

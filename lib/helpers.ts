const addHours = (date: Date, hours: number): Date => {
  const hoursToAdd = hours * 60 * 60 * 1000;
  date.setTime(date.getTime() + hoursToAdd);
  return date;
};

const date = new Date();

export const flashSaleTimerDate = addHours(date, 68);
export const buyNowTimerDate = addHours(date, 8);

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

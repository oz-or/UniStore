//Calculating the date for the flashSaleTimer and for the buyNowTimer (it adds 68 hours and 8 hours respectively to the current date)
function addHours(date: Date, hours: number): Date {
  const hoursToAdd = hours * 60 * 60 * 1000;
  date.setTime(date.getTime() + hoursToAdd);
  return date;
}
const date = new Date();
//TODO: For some reason the timers are not working properly.When setting the dates by adding different hours to the current date, the timer displays the same time for both of them. But when I log them to the console, they work just fine. Anyways, this issue is not that important, because the main goal of this was to make a timer that works. It works but not with the defined time. Maybe, when everything is done, I will try to fix this. The timers were implemented with the react-timer-hook package.
export const flashSaleTimerDate = addHours(date, 68);
export const buyNowTimerDate = addHours(date, 8);

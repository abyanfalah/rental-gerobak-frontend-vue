import bahasaDateTime from "../../helper/indonesian-day-month";

export default function (dateTimeToParse) {
  const dateTime = new Date(dateTimeToParse);
  const date = `${bahasaDateTime.day(
    dateTime.getDay()
  )} ${dateTime.getDate()} ${bahasaDateTime.shortMonth(
    dateTime.getMonth()
  )} ${dateTime.getFullYear()}`;
  const time = `${dateTime.getHours()} : ${dateTime.getMinutes()}`;

  const full = ` ${time}`;

  return {
    date,
    time,
    full: () => `${date} ${time}`,
  };
}

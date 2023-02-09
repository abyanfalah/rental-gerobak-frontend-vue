import bahasaDateTime from "../../helper/indonesian-day-month";

export default {
  getReadableDateTime: (dateTimeToParse) => {
    const dateTime = new Date(dateTimeToParse);

    const date = `${bahasaDateTime.day(
      dateTime.getDay()
    )} ${dateTime.getDate()} ${bahasaDateTime.shortMonth(
      dateTime.getMonth()
    )} ${dateTime.getFullYear()}`;

    const time = `${dateTime.getHours()} : ${dateTime.getMinutes()}`;

    const shortDayDate = `${bahasaDateTime.shortDay(
      dateTime.getDay()
    )} ${dateTime.getDate()} ${bahasaDateTime.shortMonth(
      dateTime.getMonth()
    )} ${dateTime.getFullYear()}`;

    const noDayDate = `${dateTime.getDate()} ${bahasaDateTime.shortMonth(
      dateTime.getMonth()
    )} ${dateTime.getFullYear()}`;

    return {
      date,
      time,
      full: () => `${date} ${time}`,
      shortDayDate,
      noDayDate,
    };
  },

  isToday: (dateTimeToParse) => {
    const dateTime = new Date(dateTimeToParse);

    console.log(dateTime.getDate());
  },
};

import bahasaDateTime from "../../helper/indonesian-day-month";

export default {
  getReadableDateTime: (dateTimeToParse) => {
    const dateTime = new Date(dateTimeToParse);

    const date = `${bahasaDateTime.day(
      dateTime.getDay()
    )} ${dateTime.getDate()} ${bahasaDateTime.shortMonth(
      dateTime.getMonth()
    )} ${dateTime.getFullYear()}`;

    let hour = dateTime.getHours();
    hour = hour < 10 ? "0" + hour : hour;

    let minute = dateTime.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;

    const time = `${hour} : ${minute}`;

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

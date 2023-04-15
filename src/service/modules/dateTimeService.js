import bahasaDateTime from "../../helper/indonesian-day-month";

const bdt = bahasaDateTime;

export default {
  getReadableDateTime: (dateTimeToParse) => {
    const dateTime = new Date(dateTimeToParse);

    let hour = dateTime.getHours();
    hour = hour < 10 ? "0" + hour : hour;

    let minute = dateTime.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;

    console.clear();
    console.log(dateTime.getDate());

    const dateNum = dateTime.getDate();
    const day = bdt.day(dateTime.getDay());
    const shortDay = day.substring(0, 3);
    const month = bdt.month(dateTime.getMonth());
    const shortMonth = month.substring(0, 3);
    const fullYear = dateTime.getFullYear();

    const date = `${day} ${dateNum} ${shortMonth} ${fullYear}`;

    const shortDayDate = `${shortDay} ${dateNum} ${shortMonth} ${fullYear}`;

    const noDayDate = `${dateNum} ${shortMonth} ${fullYear}`;

    const time = `${hour}:${minute}`;

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

const dayList = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jum'at",
  "Sabtu",
  "Minggu",
];

const monthList = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default {
  day: (dayNum) => {
    return dayList[dayNum - 1];
  },

  month: (monthNum) => {
    return monthList[monthNum];
  },

  shortDay: (dayNum) => {
    const result = dayList[dayNum - 1];
    return result.substring(0, 3);
  },

  shortMonth: (monthNum) => {
    const result = monthList[monthNum];
    return result.substring(0, 3);
  },
};

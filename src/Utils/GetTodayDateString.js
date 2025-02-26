export const GetTodayDateString = () => {
  let todayDate = new Date();

  // Extract year, month, and day components
  const year = todayDate.getFullYear();
  // Add 1 to month because getMonth() returns 0-based index (0 for January, 11 for December)
  const month = todayDate.getMonth() + 1;
  const current_day = todayDate.getDate();

  // Format components with leading zeros if necessary
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = current_day < 10 ? `0${current_day}` : current_day;
  const dateString = `${year}-${formattedMonth}-${formattedDay}`;
  return dateString;
};

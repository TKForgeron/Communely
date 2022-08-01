module.exports = {
  checkParseCleanDate,
  addDays,
};

// Adding addDays functionality to Date class
function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

// Function that applies regex and parses datestrings
function checkParseCleanDate(dateString, sep = "-", monthStart = 1, dayStart) {
  const errorMessage =
    "Date passed was not formatted correctly. Please use the following format: YYYY-MM-DD, e.g. 2022-12-31";

  if (dateString.length != 10) {
    throw new Error(errorMessage);
  }

  const regexForDate =
    /^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[01]|0[1-9]|[12][0-9])$/;
  const reMatches = dateString.match(regexForDate);
  if (!reMatches) {
    throw new Error(errorMessage);
  }
  const validDateString = reMatches[dateString.search(regexForDate)];
  const dateStringList = validDateString.split(sep);
  const dateObjUTC0 = new Date(
    Date.UTC(
      dateStringList[0],
      dateStringList[1] - monthStart,
      dateStringList[2] - dayStart,
      0,
      0,
      0,
      0
    )
  );

  return dateObjUTC0;
}

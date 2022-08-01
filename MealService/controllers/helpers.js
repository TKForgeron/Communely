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
function checkParseCleanDate(dateString, sep = "-") {
  const errorMessage =
    "Date passed was not formatted correctly. Please use the following format: DD-MM-YYYY, e.g. 30-07-2022";

  if (dateString.length != 10) {
    throw new Error(errorMessage);
  }

  const regexForDate =
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  const reMatches = dateString.match(regexForDate);
  if (!reMatches) {
    throw new Error(errorMessage);
  }
  const validDateString = reMatches[dateString.search(regexForDate)];
  let dateStringList = validDateString.split(sep);
  dateStringList = dateStringList.reverse();
  console.log(dateStringList);
  const finalDateObj = new Date(dateStringList);
  finalDateObj.setHours(0, 0, 0, 0);

  return finalDateObj;
}

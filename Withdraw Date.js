/**
 * Calculates the expected withdrawal date by adding a specified number of workdays to a given date,
 * excluding weekends and holidays, with the option to reduce or add days.
 *
 * @param {Date} inputDateRange - The range of starting dates.
 * @param {number} numberOfDaysRange - The range of the number of workdays to add to each starting date.
 * @param {number} reduceDaysRange - The range of days to subtract from the result (optional).
 * @param {number} addDaysRange - The range of days to add to the result (optional).
 * @param {Date[]} holidayRange - An array of holiday dates to skip.
 * @return {Array} - An array of resulting dates after adjusting workdays.
 * @customfunction
 */
function EXPECTED_WITHDRAW_DATE(inputDateRange, numberOfDaysRange, reduceDaysRange, addDaysRange, holidayRange) {
  var output = [];

  for (var i = 0; i < inputDateRange.length; i++) {
    var inputDate = new Date(inputDateRange[i][0]);
    var numberOfDays = Number(numberOfDaysRange[i]);
    var reduceDays = Number(reduceDaysRange[i] || 0);
    var addDays = Number(addDaysRange[i] || 0);

    if (isNaN(inputDate) || isNaN(numberOfDays)) {
      output.push([null]);
    } else {
      // Your function code here

      var currentDate = new Date(inputDate);
      var count = 1; // Start count at 1 to include the input date
      var holidays = holidayRange.flat().map(function (date) {
        return new Date(date).toISOString().slice(0, 10);
      });

      while (count < numberOfDays + addDays) {
        currentDate.setDate(currentDate.getDate() + 1);

        // Check if the current day is a weekend (Saturday or Sunday)
        if (currentDate.getDay() == 0 || currentDate.getDay() == 6) {
          continue;
        }

        // Check if the current day is a holiday
        if (holidays.indexOf(currentDate.toISOString().slice(0, 10)) !== -1) {
          continue;
        }

        count++;
      }

      // Apply the reduceDays
      for (var j = 0; j < reduceDays; j++) {
        currentDate.setDate(currentDate.getDate() - 1);
        while (currentDate.getDay() == 0 || currentDate.getDay() == 6) {
          currentDate.setDate(currentDate.getDate() - 1);
        }
      }

      output.push([currentDate]);
    }
  }

  return output;
}

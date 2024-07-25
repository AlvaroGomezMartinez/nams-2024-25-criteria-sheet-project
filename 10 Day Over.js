/**
 * Calculates the expected withdrawal date by adding a variable of the number of assigned days
 * plus a fixed number of workdays (10) to a given date, excluding weekends and holidays.
 *
 * @param {Date} entryDates - An array of entry dates.
 * @param {number[]} assignedDays - An array of assigned days for each entry date.
 * @param {Date[]} holidays - An array of dates to skip.
 * @customfunction
 */
function TEN_DAYS_OVER(entryDates, assignedDays, holidays) {
  if (!entryDates || !Array.isArray(entryDates)) {
    return "Please enter valid dates";
  }

  if (!assignedDays || !Array.isArray(assignedDays)) {
    return "Please enter valid assigned days";
  }

  if (!holidays || !Array.isArray(holidays)) {
    return "Please enter valid holidays";
  }

  var results = [];

  for (var i = 0; i < entryDates.length; i++) {
    var entryDate = new Date(entryDates[i][0]);
    var assignedDay = assignedDays[i][0];

    // Check if entryDate is blank or not a valid date
    if (!entryDate || isNaN(entryDate)) {
      results.push(["Waiting on Start Date"]);
      continue;
    }

    // Check if assignedDay is a valid number
    if (isNaN(assignedDay)) {
      results.push(["Waiting on Assigned Days"]);
      continue;
    }

    var currentDate = new Date(entryDate);
    var daysAdded = 0;

    // Add the fixed 10 days and the variable assigned days
    var numDays = 10 + assignedDay;

    while (daysAdded < numDays) {
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      var dayOfWeek = currentDate.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, etc.)

      // Check if the current day is a weekend (Saturday or Sunday) or a holiday
      if (dayOfWeek === 0 || dayOfWeek === 6 || isHoliday(currentDate, holidays)) {
        continue; // Skip weekends and holidays
      }

      daysAdded++; // Increment the count of business days added
    }

    results.push([currentDate]);
  }

  return results;
}

function isHoliday(date, holidays) {
  var dateToCheck = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Ensure we're comparing dates only

  for (var i = 0; i < holidays.length; i++) {
    var holidayDate = new Date(holidays[i][0]);

    if (dateToCheck.getTime() === holidayDate.getTime()) {
      return true;
    }
  }

  return false;
}

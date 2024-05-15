/**
 * Sorts an array of weekdays according to their order defined in the `weekdayOrder` object.
 * 
 * @param {string[]} weekdays - Array of weekdays to be sorted.
 * @returns {string[]} The sorted array of weekdays.
 * @example
 * // Example of usage:
 * const sortedWeekdays = sortWeekdays(['Wednesday', 'Monday', 'Friday', 'Sunday']);
 * // Returns: ['Monday', 'Wednesday', 'Friday', 'Sunday']
 */

const weekdayOrder = {
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6,
    'Sunday': 7
  };


export const sortWeekdays = (weekdays) => {
    return weekdays.sort((a, b) => {
      return weekdayOrder[a] - weekdayOrder[b];
    });
  };
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
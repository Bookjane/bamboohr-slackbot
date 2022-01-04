const dayjs = require('./dayjs');

module.exports = function verifyDateRange(startDate, endDate) {
  const startDateParse = dayjs(startDate);
  const endDateParse = dayjs(endDate);
  
  return endDateParse.diff(startDateParse) >= 0;
};

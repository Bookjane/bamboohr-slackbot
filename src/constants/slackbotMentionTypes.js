const { BIRTHDAY, ANNIVERSARY, WHOS_OUT } = require('./dateRangeTypes');

const slackbotMentionTypeMap = {
  'birthdays': BIRTHDAY,
  'birthday': BIRTHDAY,
  'anniversary': ANNIVERSARY,
  'anniversaries': ANNIVERSARY,
  'work anniversaries': ANNIVERSARY,
  'work anniversary': ANNIVERSARY,
  'who is out': WHOS_OUT,
  'whos out': WHOS_OUT,
  'who\'s out': WHOS_OUT,
  'who is off': WHOS_OUT,
  'vacations': WHOS_OUT,
  'vacation': WHOS_OUT,
  'time off': WHOS_OUT,
  'leave': WHOS_OUT,
  'on leave': WHOS_OUT,
};

module.exports = {
  slackbotMentionTypeMap
};

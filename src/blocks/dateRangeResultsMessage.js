const { dateRangeTypeMap } = require('../constants/dateRangeTypes');

function dateRangeResultsMessage(id, startDate, endDate, results = []) {
  return [
    {
      'type': 'header',
      'text': {
        'type': 'plain_text',
        'text': startDate === endDate
          ? `${dateRangeTypeMap[id].emoji} ${dateRangeTypeMap[id].title}: [${startDate}]`
          : `${dateRangeTypeMap[id].emoji} ${dateRangeTypeMap[id].title}: [${startDate} to ${endDate}]`,
        'emoji': true
      }
    },
    {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': results.map((result) => `• ${result}`).join('\n')
      }
    },
  ];
}

module.exports = dateRangeResultsMessage;

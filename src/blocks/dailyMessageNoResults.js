const dayjs = require('../utils/dayjs');

function dailyMessageNoResults(channelName) {
  return [
    {
      'type': 'header',
      'text': {
        'type': 'plain_text',
        'text': '🌅 Good Morning'
      }
    },
    {
      'type': 'context',
      'elements': [
        {
          'text': channelName
            ? `*${dayjs().tz('America/New_York').format('MMMM D, YYYY')}* | ${channelName}`
            : `*${dayjs().tz('America/New_York').format('MMMM D, YYYY')}*`,
          'type': 'mrkdwn'
        }
      ]
    },
    {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': 'No birthdays, or work anniversaries. \n*Everyone is in today!*'
      }
    },
  ];
}

module.exports = dailyMessageNoResults;

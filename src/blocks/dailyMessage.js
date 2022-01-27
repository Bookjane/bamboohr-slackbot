const {
  WHOS_OUT,
  BIRTHDAY,
  ANNIVERSARY,
  dateRangeTypeMap,
} = require('../constants/dateRangeTypes');

const dayjs = require('../utils/dayjs');

function dailyMessage(channelName, birthdays, anniversaries, whosOut) {
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
            ? `*${dayjs().tz('America/Toronto').format('MMMM D, YYYY')}* | ${channelName}`
            : `*${dayjs().tz('America/Toronto').format('MMMM D, YYYY')}*`,
          'type': 'mrkdwn'
        }
      ]
    },
    anniversaries.length ? {
      'type': 'divider'
    } : undefined,
    anniversaries.length ? {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': `${dateRangeTypeMap[ANNIVERSARY].emoji} | *${dateRangeTypeMap[ANNIVERSARY].title}* | ${dateRangeTypeMap[ANNIVERSARY].emoji}`
      }
    } : undefined,
    anniversaries.length ? {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': anniversaries.map((result) => `• ${result}`).join('\n')
      }
    } : undefined,
    birthdays.length ? {
      'type': 'divider'
    } : undefined,
    birthdays.length ? {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': `${dateRangeTypeMap[BIRTHDAY].emoji} | *${dateRangeTypeMap[BIRTHDAY].title}* | ${dateRangeTypeMap[BIRTHDAY].emoji}`
      }
    } : undefined,
    birthdays.length ? {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': birthdays.map((result) => `• ${result}`).join('\n')
      }
    } : undefined,
    whosOut.length ? {
      'type': 'divider'
    } : undefined,
    whosOut.length ? {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': `${dateRangeTypeMap[WHOS_OUT].emoji} | *${dateRangeTypeMap[WHOS_OUT].title}* | ${dateRangeTypeMap[WHOS_OUT].emoji}`
      }
    } : undefined,
    whosOut.length ? {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': whosOut.map((result) => `• ${result}`).join('\n')
      }
    } : undefined,
  ].filter((block) => !!block);
}

module.exports = dailyMessage;

const { SLACK_BOT_USER_ID } = require('../config');

function slackbotMentionDateRangeParseErrorMessage() {
  return [
    {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': '*Problem parsing for the query type for the above message ⚠️*'
      }
    },
    {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': `Please take a look at the home page for <@${SLACK_BOT_USER_ID}> to see how to structure a message the slackbot can parse.`
      }
    },
  ];
}

module.exports = slackbotMentionDateRangeParseErrorMessage;

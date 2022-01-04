function errorMessageBamboohr(slackId) {
  return [
    {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': '*Problem connecting to BambooHR API. ⚠️*'
      }
    },
    {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': `Send a message to <@${slackId}> and they will take a look at the issue.`
      }
    },
    {
      type: 'actions',
      block_id: 'dateRangeError_cancel',
      elements: [
        {
          type: 'button',
          action_id: 'dateRange_cancel',
          text: {
            type: 'plain_text',
            emoji: true,
            text: 'Cancel',
          },
          style: 'danger',
        },
      ]
    },
  ];
}

module.exports = errorMessageBamboohr;

const { dateRangeTypeMap } = require('../constants/dateRangeTypes');

function dateRangeNoResultsMessage(id, startDate, endDate) {
  return [
    {
      'type': 'header',
      'text': {
        'type': 'plain_text',
        'text': startDate === endDate
          ? `${dateRangeTypeMap[id].emoji} ${dateRangeTypeMap[id].noneMessage}: [${startDate}]`
          : `${dateRangeTypeMap[id].emoji} ${dateRangeTypeMap[id].noneMessage}: [${startDate} to ${endDate}]`,
        'emoji': true
      }
    },
    {
      type: 'actions',
      block_id: `${id}_dateRangeNoResult_cancel`,
      elements: [
        {
          type: 'button',
          action_id: 'dateRangeNoResult_cancel',
          text: {
            type: 'plain_text',
            emoji: true,
            text: 'Cancel',
          },
          style: 'danger',
        },
      ]
    }
  ];
}

module.exports = dateRangeNoResultsMessage;

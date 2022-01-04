const { dateRangeTypeMap } = require('../constants/dateRangeTypes');

function dateRangePickerMessage(id, startDate, endDate, valid) {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `🗓 Enter a date range to check for ${dateRangeTypeMap[id].description}`,
      },
    },
    {
      type: 'actions',
      block_id: `${id}_dateRange_picker`,
      elements: [
        {
          type: 'datepicker',
          action_id: 'dateRange_picker_startDate',
          initial_date: startDate,
        },
        {
          type: 'datepicker',
          action_id: 'dateRange_picker_endDate',
          initial_date: endDate,
        },
      ],
    },
    valid ? undefined : {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: '⚠️ *Date range not valid*',
        },
      ],
    },
    {
      type: 'actions',
      block_id: `${id}_dateRange_cancelSubmit`,
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
        valid ?
          {
            type: 'button',
            action_id: 'dateRange_submit',
            text: {
              type: 'plain_text',
              emoji: true,
              text: 'Submit',
            },
            style: 'primary',
          } : undefined,
      ].filter((block) => !!block),
    },
  ].filter((block) => !!block);
}

module.exports = dateRangePickerMessage;

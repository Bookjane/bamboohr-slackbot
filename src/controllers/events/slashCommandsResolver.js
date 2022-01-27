const dateRangePickerMessage = require('../../blocks/dateRangePickerMessage');
const dayjs = require('../../utils/dayjs');
const slackApi = require('../../apis/slackApi');

module.exports = function slashCommandsResolver(
  command, trigger_id, channel_id, user_id
) {
  const currentDate = dayjs().tz('America/Toronto').subtract(1, 'day').format('YYYY-MM-DD');
  const twoWeeksFromNow = dayjs().tz('America/Toronto').add(2, 'week').format('YYYY-MM-DD');

  switch (command) {
  case '/birthday-range': {
    const blocks = dateRangePickerMessage(
      'birthday',
      currentDate,
      twoWeeksFromNow,
      true
    );

    slackApi.sendEphemeralMessage(trigger_id, blocks, channel_id, user_id);
    return true;
  }
  case '/whos-out-range': {
    const blocks = dateRangePickerMessage(
      'whos-out',
      currentDate,
      twoWeeksFromNow,
      true
    );

    slackApi.sendEphemeralMessage(trigger_id, blocks, channel_id, user_id);
    return true;
  }
  case '/anniversary-range': {
    const blocks = dateRangePickerMessage(
      'anniversary',
      currentDate,
      twoWeeksFromNow,
      true
    );

    slackApi.sendEphemeralMessage(trigger_id, blocks, channel_id, user_id);
    return true;
  }
  default: {
    return false;
  } 
  }
};
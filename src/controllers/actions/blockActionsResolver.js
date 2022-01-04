const dateRangePickerMessage = require('../../blocks/dateRangePickerMessage');
const dateRangeResultsMessage = require('../../blocks/dateRangeResultsMessage');
const dateRangeNoResultsMessage = require('../../blocks/dateRangeNoResultsMessage');

const slackApi = require('../../apis/slackApi');
const verifyDateRange = require('../../utils/verifyDateRange');

const {
  getWhosOutByChannelIdAndDateRange,
  getAnniversariesByChannelIdAndDateRange,
  getBirthdaysByChannelIdAndDateRange,
} = require('../../services/dateRangeResolvers');

const {
  WHOS_OUT,
  BIRTHDAY,
  ANNIVERSARY,
  dateRangeTypeMap,
} = require('../../constants/dateRangeTypes');
const errorMessageBamboohr = require('../../blocks/errorMessageBamboohr');
const { prepareWhosOutResult, prepareBirthdayResults, prepareWorkAnniversariesResult, prepareNotificationText } = require('../../services/prepareResults');


module.exports = async function blockActionsResolver(
  actionId,
  blockId,
  values,
  responseUrl,
  channelId,
  triggerId,
  messageTs,
  ack
) {
  switch (actionId) {

  // Check date picker change
  case 'dateRange_picker_startDate':
  case 'dateRange_picker_endDate': {
    const {
      dateRange_picker_startDate: { selected_date: startDate },
      dateRange_picker_endDate: { selected_date: endDate },
    } = values[Object.keys(values)[0]];

    const blocks = dateRangePickerMessage(
      blockId.split('_')[0],
      startDate,
      endDate,
      verifyDateRange(startDate, endDate)
    );

    slackApi.replaceEphemeralMessage(blocks, responseUrl);
    ack();
    return true;
  }
  case 'dateRange_cancel':
  case 'dateRangeNoResult_cancel':
  case 'dateRangeError_cancel': {
    slackApi.deleteEphemeralMessage(responseUrl);
    return true;
  }
  case 'dateRange_submit': {
    const {
      dateRange_picker_startDate: { selected_date: startDate },
      dateRange_picker_endDate: { selected_date: endDate },
    } = values[Object.keys(values)[0]];

    const queryType = blockId.split('_')[0];
    let blocks = [];
    let results = [];
    let notificationText;

    try {
      switch (queryType) {
      case WHOS_OUT: {
        const whosOut = await getWhosOutByChannelIdAndDateRange(
          channelId,
          startDate,
          endDate
        );

        results = prepareWhosOutResult(whosOut);
        notificationText = prepareNotificationText(dateRangeTypeMap[WHOS_OUT].title, startDate, endDate);
        blocks = results.length
          ? dateRangeResultsMessage(WHOS_OUT, startDate, endDate, results)
          : dateRangeNoResultsMessage(WHOS_OUT, startDate, endDate);
        break;
      }
      case BIRTHDAY: {
        const birthdays = await getBirthdaysByChannelIdAndDateRange(
          channelId,
          startDate,
          endDate
        );
        results = prepareBirthdayResults(birthdays, startDate, endDate);
        notificationText = prepareNotificationText(dateRangeTypeMap[BIRTHDAY].title, startDate, endDate);
        blocks = results.length
          ? dateRangeResultsMessage(BIRTHDAY, startDate, endDate, results)
          : dateRangeNoResultsMessage(BIRTHDAY, startDate, endDate);
        break;
      }
      case ANNIVERSARY: {
        const anniversaries = await getAnniversariesByChannelIdAndDateRange(
          channelId,
          startDate,
          endDate
        );
        results = prepareWorkAnniversariesResult(anniversaries, startDate, endDate);
        notificationText = prepareNotificationText(dateRangeTypeMap[ANNIVERSARY].title, startDate, endDate);
        blocks = results.length
          ? dateRangeResultsMessage(ANNIVERSARY, startDate, endDate, results)
          : dateRangeNoResultsMessage(ANNIVERSARY, startDate, endDate);
        break;
      }
      default: {
        console.error('Unknown blockId for submit action: ' + actionId);
        blocks = errorMessageBamboohr('matt');
      }
      }
    } catch (e) {
      console.error(e);
      blocks = errorMessageBamboohr('U02EY4XD3HB');
    }

    if (results.length) {
      slackApi.sendMessage(notificationText, blocks, channelId);
      slackApi.deleteEphemeralMessage(responseUrl);
    } else {
      slackApi.replaceEphemeralMessage(blocks, responseUrl);
    }

    return true;
  }
  }
};

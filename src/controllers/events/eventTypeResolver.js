const chrono = require('chrono-node');
const { replyToMessage } = require('../../apis/slackApi');
const slackbotMentionDateRangeParseErrorMessage = require('../../blocks/slackbotMentionDateRangeParseErrorMessage');
const slackbotMentionTypeParseErrorMessage = require('../../blocks/slackbotMentionTypeParseErrorMessage');
const { slackbotMentionTypeMap } = require('../../constants/slackbotMentionTypes');

module.exports = function eventTypeResolver(type, text, messageTimestamp, channelId, userId) {
  if (type === 'app_home_opened') {
    console.log('app_home_opened');
  } else if (type === 'app_mention') {
    // console.log('app_mention');
    // const result = chrono.parse(text);
    // if (result.length === 0) {
    //   replyToMessage('Error parsing date range!', channelId, messageTimestamp, slackbotMentionDateRangeParseErrorMessage());
    //   return;
    // } 

    // const startDate = result[0]?.start;
    // const endDate = result[0]?.end;

    // console.log(startDate.knownValues);
    // console.log(startDate.impliedValues);
    // console.log(endDate.knownValues);
    // console.log(endDate.impliedValues);

    // const queryTypes = Object.keys(slackbotMentionTypeMap)
    //   .filter((type) => text.toLowerCase().includes(type))
    //   .reduce((accum, curr) => accum.add(slackbotMentionTypeMap[curr]), new Set());

    // if (!queryTypes.size) {
    //   replyToMessage('Error parsing query type!', channelId, messageTimestamp, slackbotMentionTypeParseErrorMessage());
    //   return;
    // }
  }
};

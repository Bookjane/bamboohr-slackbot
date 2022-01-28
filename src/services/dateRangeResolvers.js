const { getChatMembersEmail } = require('./slackService');
const {
  getWhosOutByWorkEmailList,
  getBirthdaysByWorkEmailList,
  getAnniversariesByWorkEmailList,
} = require('./bambooHrService');

async function getWhosOutByChannelIdAndDateRange(
  channelId,
  startDate,
  endDate
) {
  const chatMembersEmail = await getChatMembersEmail(channelId);
  console.log(chatMembersEmail);
  const whosOutMap = await getWhosOutByWorkEmailList(Object.keys(chatMembersEmail), startDate, endDate);
  console.log(whosOutMap);

  return Object.keys(whosOutMap).reduce((accum, curr) => ({
    ...accum,
    [chatMembersEmail[curr]]: whosOutMap[curr]
  }), {});
}

async function getBirthdaysByChannelIdAndDateRange(
  channelId,
  startDate,
  endDate
) {
  const chatMembersEmail = await getChatMembersEmail(channelId);
  console.log(chatMembersEmail);
  const birthdaysMap = await getBirthdaysByWorkEmailList(Object.keys(chatMembersEmail), startDate, endDate);
  console.log(birthdaysMap);

  return Object.keys(birthdaysMap).reduce((accum, curr) => ({
    ...accum,
    [chatMembersEmail[curr]]: birthdaysMap[curr]
  }), {});
}

async function getAnniversariesByChannelIdAndDateRange(
  channelId,
  startDate,
  endDate
) {
  const chatMembersEmail = await getChatMembersEmail(channelId);
  console.log(chatMembersEmail);
  const anniversariesMap = await getAnniversariesByWorkEmailList(Object.keys(chatMembersEmail), startDate, endDate);
  console.log(anniversariesMap);

  return Object.keys(anniversariesMap).reduce((accum, curr) => ({
    ...accum,
    [chatMembersEmail[curr]]: anniversariesMap[curr]
  }), {});
}

module.exports = {
  getWhosOutByChannelIdAndDateRange,
  getBirthdaysByChannelIdAndDateRange,
  getAnniversariesByChannelIdAndDateRange
};

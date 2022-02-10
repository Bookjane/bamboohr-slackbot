const dayjs = require('../utils/dayjs');
const { getConversations, sendMessage } = require('../apis/slackApi');
const { getWhosOutByChannelIdAndDateRange, getBirthdaysByChannelIdAndDateRange, getAnniversariesByChannelIdAndDateRange } = require('../services/dateRangeResolvers');
const { prepareWhosOutResult, prepareBirthdayResults, prepareWorkAnniversariesResult } = require('../services/prepareResults');
const dailyMessage = require('../blocks/dailyMessage');
const dailyMessageNoResults = require('../blocks/dailyMessageNoResults');

async function slackDailyUpdates() {
  const conversationsList = await getConversations();
  const channelIdList = conversationsList.data.channels.map((channel) => ({ channelId: channel.id, channelName: channel.name }));

  channelIdList.forEach(async ({ channelId, channelName }) => {
    console.log(channelId, channelName);
    if (!channelName) return;

    const today = dayjs().format('YYYY-MM-DD');
    console.log(today);
    let [whosOut, birthdays, workAnniversaries] = [{}, {}, {}];

    try {
      whosOut = await getWhosOutByChannelIdAndDateRange(channelId, today, today);
      birthdays = await getBirthdaysByChannelIdAndDateRange(channelId, today, today),
      workAnniversaries = await getAnniversariesByChannelIdAndDateRange(channelId, today, today);
    } catch (e) {
      console.log(e);
    }

    console.log(whosOut, birthdays, workAnniversaries);

    let blocks;
    if (Object.keys(whosOut).length || Object.keys(birthdays).length || Object.keys(workAnniversaries).length) {
      const whosOutResult = prepareWhosOutResult(whosOut);
      const birthdaysResult = prepareBirthdayResults(birthdays, today, today);
      const workAnniversariesResult = prepareWorkAnniversariesResult(workAnniversaries, today, today);

      blocks = dailyMessage(channelName, birthdaysResult, workAnniversariesResult, whosOutResult);
    } else {
      blocks = dailyMessageNoResults(channelName);
    }

    console.log(blocks);

    // try {
    //   await sendMessage(`🌅 Good Morning ${dayjs().format('MMMM D, YYYY')}`, blocks, channelId);
    // } catch (e) {
    //   console.log(e);
    // }
  });
}

module.exports = slackDailyUpdates;

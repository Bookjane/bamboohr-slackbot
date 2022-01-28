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

    let today = new Date();
    today = today.toISOString().split('T')[0];
    console.log(today);
    let [whosOut, birthdays, workAnniversaries] = [{}, {}, {}];

    try {
      [whosOut, birthdays, workAnniversaries] = await Promise.all([
        getWhosOutByChannelIdAndDateRange(channelId, today, today),
        getBirthdaysByChannelIdAndDateRange(channelId, today, today),
        getAnniversariesByChannelIdAndDateRange(channelId, today, today)
      ]);
    } catch (e) {
      console.log(e.data);
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

    try {
      await sendMessage(`🌅 Good Morning ${dayjs().format('MMMM D, YYYY')}`, blocks, channelId);
    } catch (e) {
      console.log(e);
    }
  });
}

module.exports = slackDailyUpdates;

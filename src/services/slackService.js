const slackApi = require('../apis/slackApi');

async function getChatMembersEmail(channelId) {
  const {
    data: { members: channelMembers },
  } = await slackApi.getChannelMembers(channelId);

  const channelMembersInfo = await Promise.all(
    channelMembers.map(slackApi.getUserInfo)
  );

  return channelMembersInfo.reduce((accum, curr, index) => {
    const email = curr.data.user.profile.email;
    return email
      ? { ...accum, [email.toLowerCase()]: channelMembers[index] }
      : accum;
  }, {});
}

module.exports = {
  getChatMembersEmail,
};

const axios = require('axios').default;
const qs = require('qs');

const {
  SLACK_BOT_TOKEN,
  SLACK_API_URL
} = require('../config');      

const axiosInstance = axios.create({
  baseURL: SLACK_API_URL,
  headers: {
    Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
  },
});

function sendMessage(notificationText, blocks, channel) {
  const args = {
    text: notificationText,
    blocks: JSON.stringify(blocks),
    channel,
  };

  axiosInstance.post(
    '/chat.postMessage',
    qs.stringify(args)
  );
}

function replyToMessage(notificationText, channel, thread_ts, blocks) {
  const args = {
    text: notificationText,
    channel,
    thread_ts,
    blocks: JSON.stringify(blocks)
  };

  axiosInstance.post('/chat.postMessage', qs.stringify(args));
}

function sendEphemeralMessage(trigger_id, blocks, channel, user) {
  const args = {
    trigger_id: trigger_id,
    blocks: JSON.stringify(blocks),
    channel,
    user
  };

  axiosInstance.post(
    '/chat.postEphemeral',
    qs.stringify(args)
  );
}

function replaceEphemeralMessage(blocks, responseUrl) {
  const args = {
    response_type: 'ephemeral',
    blocks: JSON.stringify(blocks),
    replace_original: true
  };

  axiosInstance.post(responseUrl, args);
}

function deleteEphemeralMessage(responseUrl) {
  const data = {
    response_type: 'ephemeral',
    text: '',
    replace_original: true,
    delete_original: true
  };

  axiosInstance.post(responseUrl, data);
}

async function getChannelMembers(channel) {
  const res = await axiosInstance.get(
    '/conversations.members',
    {
      params: {
        channel
      }
    }
  );

  return res;
}

async function getUserInfo(user) {
  const res = await axiosInstance.get(
    '/users.info',
    {
      params: {
        user
      }
    }
  );

  return res;
}

async function getMessage(channel, latest) {
  const res = await axiosInstance.get(
    '/conversations.history',
    {
      params: {
        channel,
        latest,
        inclusive: true,
        limit: 1,
      }
    }
  );

  return res;
}

async function getConversations() {
  const res = await axiosInstance.get(
    '/users.conversations',
    {
      params: {
        types: 'public_channel,private_channel,mpim,im'
      }
    }
  );

  return res;
}

module.exports = {
  sendMessage,
  replyToMessage,
  sendEphemeralMessage,
  replaceEphemeralMessage,
  deleteEphemeralMessage,
  getChannelMembers,
  getUserInfo,
  getMessage,
  getConversations,
};

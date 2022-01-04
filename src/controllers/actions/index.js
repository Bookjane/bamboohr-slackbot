const blockActionsResolver = require('./blockActionsResolver');

module.exports = function actionsResolver(req, res) {
  const { actions, type, response_url, state, channel, trigger_id, container: { message_ts } } = JSON.parse(req.body.payload);

  if (type === 'block_actions') {
    blockActionsResolver(
      actions[0].action_id,
      actions[0].block_id,
      state.values,
      response_url,
      channel.id,
      trigger_id,
      message_ts,
      () => res.send(),
    );
  }
};
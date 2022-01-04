const verifySignature = require('../../utils/verifySignature');

const slashCommandsResolver = require('./slashCommandsResolver');
const eventTypeResolver = require('./eventTypeResolver');

module.exports = function eventsResolver(req, res) {
  if (req.body.command) {
    const { trigger_id, command, channel_id, user_id } = req.body;
    if (slashCommandsResolver(command, trigger_id, channel_id, user_id))
      res.sendStatus(200);
    else
      res.sendStatus(404);

  } else if (req.body.type) {
    switch (req.body.type) {
    case 'url_verification':
      res.send({ challenge: req.body.challenge });
      return;
    case 'event_callback': 
      if (!verifySignature(req)) {
        res.sendStatus(401);
        return;
      }

      const { type, user, channel, tab, text, subtype } = req.body.event;
      eventTypeResolver(type);
      return;
    default:
      res.send(404);
      return;
    }
  }
};

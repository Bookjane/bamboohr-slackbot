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
      break;
    case 'event_callback': {
      if (!verifySignature(req)) {
        res.sendStatus(401);
        break;
      }

      res.sendStatus(200);

      const { type, user, text, ts, channel } = req.body.event;
      eventTypeResolver(type, text, ts, channel, user);
      break;
    }
    default:
      res.send(404);
      break;
    }
  }
};

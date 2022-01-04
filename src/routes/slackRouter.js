const { Router }= require('express');

const eventsResolver =  require('../controllers/events');
const actionsResolver =  require('../controllers/actions');

const slackRouter = Router();

// Log each endpoint access
slackRouter.use(function endpointLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

slackRouter.post('/actions', actionsResolver);
slackRouter.post('/events', eventsResolver);

module.exports = slackRouter;

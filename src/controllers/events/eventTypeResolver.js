module.exports = function eventTypeResolver(type, text) {
  if (type === 'app_home_opened') {
    console.log('app_home_opened');
  } else if (type === 'app_mention') {
    console.log('app_mention');
  }
};

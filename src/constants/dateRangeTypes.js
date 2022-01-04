const WHOS_OUT = 'whos-out';
const BIRTHDAY = 'birthday';
const ANNIVERSARY = 'anniversary';

const dateRangeTypeMap = {
  [WHOS_OUT]: {
    emoji: '🌴',
    description: 'who is out',
    title: 'Who is Out',
    noneMessage: 'Everyone is in'
  },
  [BIRTHDAY]: {
    emoji: '🎂',
    description: 'birthdays',
    title: 'Birthdays',
    noneMessage: 'No Birthdays'
  },
  [ANNIVERSARY]: {
    emoji: '🎉',
    description: 'work anniversaries',
    title: 'Work Anniversaries',
    noneMessage: 'No Work Anniversaries'
  }
};

module.exports = {
  WHOS_OUT,
  BIRTHDAY,
  ANNIVERSARY,
  dateRangeTypeMap,
};

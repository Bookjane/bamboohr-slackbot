const dayjs = require('../utils/dayjs');

function prepareWhosOutResult(whosOut) {
  return Object.keys(whosOut).reduce((accum, curr) => {
    const outages = whosOut[curr];
    return [
      ...accum,
      `<@${curr}> \n\t • ${outages.map((outage) => dayjs(outage.start).isSame(outage.end)
        ? `\`${outage.start}\``
        : `\`${outage.start}\` to \`${outage.end}\``).join(' \n\t • ')}`
    ];
  }, []);
}

function prepareBirthdayResults(birthdays, startDate, endDate) {
  return Object.keys(birthdays).reduce((accum, curr) => {
    const birthday = birthdays[curr];
    return [
      ...accum,
      `<@${curr}>${dayjs(startDate).isSame(endDate) ? '' : ` \`${birthday}\``}`
    ];
  }, []); 
}

function prepareWorkAnniversariesResult(anniversaries, startDate, endDate) {
  return Object.keys(anniversaries).reduce((accum, curr) => {
    const [, month, date] = anniversaries[curr].split('-');
    return [
      ...accum,
      `<@${curr}>${dayjs(startDate).isSame(endDate) ? '' : ` \`${month}-${date}\``}`
    ];
  }, []); 
}

function prepareNotificationText(title, startDate, endDate) {
  return dayjs(startDate).isSame(endDate)
    ? `${title} [${startDate}]`
    : `${title} [${startDate} to ${endDate}]`;
}

module.exports = {
  prepareNotificationText,
  prepareWhosOutResult,
  prepareBirthdayResults,
  prepareWorkAnniversariesResult,
};

const dayjs = require('../utils/dayjs');
const bamboohrApi = require('../apis/bamboohrApi');

async function getWhosOutByWorkEmailList(
  chatMembersEmail,
  startDate,
  endDate
) {
  const {
    data: { employees: employeesList },
  } = await bamboohrApi.getEmployeeDirectory();

  const membersBambooHrDirectoryMap = employeesList
    .filter((employee) => chatMembersEmail.includes(employee.workEmail?.toLowerCase()))
    .reduce(
      (accum, curr) => ({
        ...accum,
        [curr.id]: curr.workEmail?.toLowerCase(),
      }),
      {}
    );

  return (await bamboohrApi.getWhosOutByDateRange(startDate, endDate)).data
    .filter((out) =>
      Object.keys(membersBambooHrDirectoryMap).includes(`${out.employeeId}`)
    )
    .reduce(
      (accum, curr) => ({
        ...accum,
        [membersBambooHrDirectoryMap[`${curr.employeeId}`]]: [
          ...(accum[membersBambooHrDirectoryMap[`${curr.employeeId}`]] || []),
          {
            type: curr.type,
            start: curr.start,
            end: curr.end,
          },
        ],
      }),
      {}
    );
}

async function getBirthdaysByWorkEmailList(
  chatMembersEmail,
  startDate,
  endDate
) {
  const {
    data: { employees: employeesList },
  } = await bamboohrApi.getEmployeeDirectory();

  const channelMembersBamboohrDirectoryMap = employeesList
    .filter((employee) => chatMembersEmail.includes(employee.workEmail?.toLowerCase()))
    .reduce(
      (accum, curr) => ({
        ...accum,
        [curr.id]: curr.workEmail?.toLowerCase(),
      }),
      {}
    );

  
  let channelMembersBamboohrInfo = [];
  for (const [key] of Object.entries(channelMembersBamboohrDirectoryMap)) {
    const bamboohrInfo = await bamboohrApi.getEmployeeByBambooHRId(key);
    await new Promise(r => setTimeout(r, 1000));
    channelMembersBamboohrInfo.push(bamboohrInfo);
  }

  return channelMembersBamboohrInfo.reduce((accum, curr) => {
    const { workEmail, birthday } = curr.data;
    const [month, date] = birthday.split('-');

    // dayjs: months are zero indexed so offset by one
    return !!birthday && dayjs().tz('America/New_York').month(Number.parseInt(month) - 1).date(Number.parseInt(date)).isBetween(startDate, endDate, 'day', '[]')
      ? { ...accum, [workEmail]: birthday }
      : accum;
  }, {});
}

async function getAnniversariesByWorkEmailList(
  chatMembersEmail,
  startDate,
  endDate
) {
  const {
    data: { employees: employeesList },
  } = await bamboohrApi.getEmployeeDirectory();

  const channelMembersBamboohrDirectoryMap = employeesList
    .filter((employee) => chatMembersEmail.includes(employee.workEmail?.toLowerCase()))
    .reduce(
      (accum, curr) => ({
        ...accum,
        [curr.id]: curr.workEmail?.toLowerCase(),
      }),
      {}
    );
  
  let channelMembersBamboohrInfo = [];
  for (const [key] of Object.entries(channelMembersBamboohrDirectoryMap)) {
    const bamboohrInfo = await bamboohrApi.getEmployeeByBambooHRId(key);
    await new Promise(r => setTimeout(r, 1000));
    channelMembersBamboohrInfo.push(bamboohrInfo);
  }

  return channelMembersBamboohrInfo.reduce((accum, curr) => {
    const { workEmail, hireDate } = curr.data;
    const [, month, date] = hireDate.split('-');

    // dayjs: months are zero indexed so offset by one
    return !!hireDate && dayjs().tz('America/New_York').month(Number.parseInt(month) - 1).date(Number.parseInt(date)).isBetween(startDate, endDate, 'day', '[]')
      ? { ...accum, [workEmail]: hireDate }
      : accum;
  }, {});
}

module.exports = {
  getWhosOutByWorkEmailList,
  getBirthdaysByWorkEmailList,
  getAnniversariesByWorkEmailList,
};

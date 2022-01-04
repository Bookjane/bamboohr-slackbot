const axios = require('axios').default;

const {
  BAMBOOHR_API_URL,
  BAMBOOHR_SUBDOMAIN,
  BAMBOOHR_API_KEY,
} = require('../config');

const EMPLOYEE_FIELDS = ['workEmail', 'birthday', 'hireDate'];

const axiosInstance = axios.create({
  baseURL: `${BAMBOOHR_API_URL}/${BAMBOOHR_SUBDOMAIN}`,
  headers: {
    Accept: 'application/json',
  },
  auth: {
    username: BAMBOOHR_API_KEY,
    password: 'x',
  }
});

async function getEmployeeDirectory() {
  try {
    return await axiosInstance.get('/v1/employees/directory');
  } catch (e) {
    console.error(e);
  }
}

async function getEmployeeByBambooHRId(bambooHRId) {
  try {
    return await axiosInstance.get(`/v1/employees/${bambooHRId}/`, {
      params: {
        fields: EMPLOYEE_FIELDS.join()
      }
    });
  } catch (e) {
    console.error(e);
  }
}

async function getWhosOutByDateRange(start, end) {
  try {
    return await axiosInstance.get('/v1/time_off/whos_out', {
      params: {
        start,
        end,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  getEmployeeDirectory,
  getEmployeeByBambooHRId,
  getWhosOutByDateRange,
};

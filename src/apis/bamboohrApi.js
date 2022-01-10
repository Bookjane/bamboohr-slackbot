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
  return await axiosInstance.get('/v1/employees/directory');
}

async function getEmployeeByBambooHRId(bambooHRId) {
  return await axiosInstance.get(`/v1/employees/${bambooHRId}/`, {
    params: {
      fields: EMPLOYEE_FIELDS.join()
    }
  });
}

async function getWhosOutByDateRange(start, end) {
  return await axiosInstance.get('/v1/time_off/whos_out', {
    params: {
      start,
      end,
    },
  });
}

module.exports = {
  getEmployeeDirectory,
  getEmployeeByBambooHRId,
  getWhosOutByDateRange,
};

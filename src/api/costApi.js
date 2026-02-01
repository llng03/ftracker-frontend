import api from './axios.js'

export const getMonthOverview = (year, month) => {
  return api.get("/costs", {
    params: { year, month },
  });
};

import api from './axios.js'

//GET
export const getMonthOverview = (year, month) => {
  return api.get("/costs", {
    params: { year, month },
  });
};

//POST
export const createFixedCost = fixedCost => {
    return api.post("/costs/fixedCost", fixedCost)
};

export const createMonthsCost = (cost, year, month) => {
    return api.post("/costs/monthCost", cost, {
        params: { year, month }
    })
}
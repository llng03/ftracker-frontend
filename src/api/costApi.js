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

export const addToPots = (year, month, distributeRequest ) => {
    return api.post("/costs/toPots", distributeRequest, {
        params: { year, month }
    })
};

//PATCH
export const updateCost = (updateCostRequest, year, month) => {
    return api.patch("/costs/updateCost", updateCostRequest, {
        params: { year, month }
    })
};

export const updateFixedCost = (updateFixedCostRequest) => {
    return api.patch("/costs/updateFixedCost", updateFixedCostRequest)
};

//DELETE
export const deleteFixedCost = (costId) => {
    return api.delete("/costs/deleteFixedCost", {
        params: {costId}
    })
};

export const deleteCost = (costId, year, month) =>  {
    return api.delete("/costs/deleteCost", {
        params: { costId, year, month }
    })
};
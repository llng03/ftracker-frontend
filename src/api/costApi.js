import api from './axios.js'

//GET
export const getMonthOverview = (year, month) => {
  return api.get("/costs", {
    params: { year, month },
  });
};

export const getFixedCostOverview = (year, month) => {
    return api.get("/costs/fixedCosts", {
        params: { year, month }
    })
}

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

export const changeFixedCost = (changeFixedCostRequest, changeMonth) => {
    return api.post("/costs/changeFixedCost", changeFixedCostRequest, {
        params: {changeMonth}
    })
}

export const addNewCategory = (categoryName) => {
    return api.post("/costs/newCategory",  null, {
        params: {categoryName}
    })
}

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

export const deletePotEntry = (deleteEntryRequest) => {
    return api.delete("/costs/deletePotEntry", { 
        data: deleteEntryRequest
    })
};

export const deleteCateogry = (categoryName) => {
    return api.delete("/costs/deleteCategory", {
        params: {categoryName}
    })
}
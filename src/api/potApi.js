import api from './axios.js'

//GET
export const getPotOverview = () => {
    return api.get("/pots");
};

export const getPotList = () => {
    return api.get("/pots/potList")
}

//POST
export const addPot = (newPotName) => {
    return api.post("/pots/new", null, {
        params: {newPotName}
    });
}
 
export const distribute =  (distributeRequest) => {
    return api.post("/pots/distribute", distributeRequest);
} 

export const takeMoney = (takeMoneyRequest) => {
    return api.post("/pots/takeMoney", takeMoneyRequest);
}

//DELETE
export const deletePot = (potId) => {
    return api.delete("/pots/deletePot", {
        params: {potId}
    })
}
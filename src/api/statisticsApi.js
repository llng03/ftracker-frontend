import api from './axios.js'

//GET
export const getStatisticsOverview = (year, month) => {
    return api.get("/statistics", {
        params: { year, month }
    });
};
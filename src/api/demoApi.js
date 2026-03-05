import api from "./axios.js";

export const startDemo = async () => {
    const res = await api.post("/demo/start");
    return res.data;
}
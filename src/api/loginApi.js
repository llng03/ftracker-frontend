import api from './axios.js'

export const getCurrentUser = () => {
    return api.get("/me");
}



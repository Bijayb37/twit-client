import axios from "axios"

//set jwttoken as axios default auth header 
export function setTokenHeader(token) {
    if(token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common["Authorization"]
    }
}

//apiCall function, that returns promises to make all apiCalls easier
export function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
        return axios[method](path, data)
            .then(res => {
                return resolve(res.data)
            })
            .catch(err => {
                return reject(err.response.data.error)
            })
    })
}
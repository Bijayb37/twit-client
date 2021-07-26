import { apiCall, setTokenHeader } from "../../services/api"
import { SET_CURRENT_USER } from '../actionTypes'
import { addError, removeError} from './error'

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function setAuthorizationToken(token) {
    setTokenHeader(token)
}

export function pingServer() {
    return apiCall("get", "/api/ping")
        .then(res => {})
        .catch(err => console.log(err.message))
}
//logout, remove authorization token, and set current user to a empty object
export function logout() {
    return dispatch => {
        localStorage.clear()
        setAuthorizationToken(false)
        dispatch(setCurrentUser({}))
    }
}
//authorize user, add token
export function authUser(type, userData) {
    return dispatch => {
        //create new promise, so that after user is logged in can be redirected if promise resolves
        return new Promise((resolve, reject) => {
            return apiCall("post", `api/auth/${type}`, userData)
                .then(({ token, ...user }) => {
                    localStorage.setItem("jwtToken", token)
                    setAuthorizationToken(token)
                    dispatch(setCurrentUser(user))
                    dispatch(removeError())
                    resolve()
                })
                .catch(err => {
                    dispatch(addError(err.message))
                    reject(); // indicate the API call failed
                  });
        })
    }
}
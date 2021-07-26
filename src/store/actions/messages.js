import {apiCall} from "../../services/api"
import {addError} from "./error"
import {LOAD_MESSAGES, REMOVE_MESSAGES, UPDATE_LIKES, UPDATE_MESSAGE} from "../actionTypes"

export function loadMessages(messages) {
    return {
        type: LOAD_MESSAGES,
        messages
    }
}

export function removeMessages(id) {
    return {
        type: REMOVE_MESSAGES,
        id
    }
}

export function updateLikes(id,delta) {
    return {
        type: UPDATE_LIKES,
        id,
        delta
    }
}
export function updateMessage(id, text) {
    return {
        type: UPDATE_MESSAGE,
        id,
        text
    }
}

export function patchLikes(id, message_id,likes, delta) {
    return (dispatch, getState) => {
        apiCall("patch", `api/users/${id}/messages/${message_id}`, {likes: likes + delta})
        .then(res => dispatch(updateLikes(message_id, delta)))
        .catch(err => dispatch(addError(err.message)))
    }
}

export function patchText(id, message_id, text) {
    return (dispatch, getState) => {
        apiCall("patch", `api/users/${id}/messages/${message_id}/edit`, {text})
        .then(res => dispatch(updateMessage(message_id, res.text)))
        .catch(err => dispatch(addError(err.message)))
    }
}

export function getMessages() {
    return dispatch => {
        apiCall("get", "api/messages")
        .then(res => dispatch(loadMessages(res)))
        .catch(err => dispatch(addError(err.message)))
    }
}

//api/users/:id/messages
export function postNewMessage(text) {
    return (dispatch, getState) => {
        const {currentUser} = getState()
        const id = currentUser.user.id
        return apiCall("post", `api/users/${id}/messages`, {text})
        .then(res => {})
        .catch(err => dispatch(addError(err.message)))
    }
}

// api/users/:id/messages/:message_id
export function deleteMessage(id, message_id) {
    return (dispatch, getState) => {
        return apiCall("delete", `api/users/${id}/messages/${message_id}`)
        .then(res => dispatch(removeMessages(message_id)))
        .catch(err => dispatch(addError(err.message)))
    }
}
import {LOAD_MESSAGES, REMOVE_MESSAGES, UPDATE_LIKES, UPDATE_MESSAGE} from "../actionTypes"

export default (state =[], action) => {
    switch(action.type) {
        case LOAD_MESSAGES:
            return [...action.messages]
        case REMOVE_MESSAGES:
            const newState = state.filter((msg) => msg._id !== action.id)
            return newState
        case UPDATE_LIKES:
            return state.map(msg => (
                msg._id === action.id ? {...msg, likes: msg.likes + action.delta} : msg
            ))
        case UPDATE_MESSAGE: 
            return state.map(msg => (
                msg._id === action.id ? {...msg, text: action.text} : msg
            ))
        default:
            return state
    }
}
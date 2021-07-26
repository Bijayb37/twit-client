import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'


export function configureStore() {
    //create store and apply thunk middleware
    const store = createStore(rootReducer,
        applyMiddleware(thunk))
        return store
}
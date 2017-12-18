import { createStore } from 'redux'
import counter from '../reducers/Notifications.js'

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter);

export default store;


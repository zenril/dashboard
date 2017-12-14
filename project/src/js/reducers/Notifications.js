import { combineReducers } from 'redux'

let initialState = {
    messages : []
};

let notifications = (state, action) => {

    if(!state){
        state = initialState
    }

    switch (action.type) {
        case 'NOTIFICATION_NEW':
            state.messages = [...state.messages,
                {
                    title    : action.notification.title,
                    message  : action.notification.message,
                    viewed   : 0,
                    type     : action.notification.type || "normal",
                    created  : action.notification.created || new Date().getTime()
                }
            ]

        default:
            return state;
    }
};

export default combineReducers({notifications});
import notificationStore from '../store/Notifications.js'


export default {
    new : (title, message) => {
        notificationStore.dispatch({
            type : 'NOTIFICATION_NEW', 
            notification: {
                title, message
            }
        });
    }
}
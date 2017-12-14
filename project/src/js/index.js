import React from 'react';
import ReactDOM from 'react-dom';
import notificationStore from './store/DashboardStore.js'
import notes from './actions/Notifications.js'

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

const Notifications = ({
    stack
}) => (
    <div>
        {
            stack.map((data) => (
                <div>
                    <h1>{data.title}</h1>
                    <p>{data.message}</p>
                </div>
            ))
        }
    </div>
);

class App extends React.Component
{
    componentDidMount()
    {
        this.unsubscribe = notificationStore.subscribe(() =>
            this.forceUpdate()
        );
    }

    constructor(props){
        super(props);

        this.notification = {
            title : null,
            message : null
        }

        this.handleAdd = this.handleAdd.bind(this);
    }

    componentWillUnmount()
    {
        this.unsubscribe();
    }

    handleAdd()
    {
        notes.new(
            this.notification.title.value,  this.notification.message.value
        );
    }

    render()
    {
        let state = notificationStore.getState();
        console.log(state);
        return (
            <div className='app-main'>
                <Notifications stack={state.notifications.messages}/>

                <div>
                    <input type='text' ref={ node => {
                        this.notification.title = node
                    }}/>

                    <input type='text' ref={ node => {
                        this.notification.message = node
                    }}/>

                    <button onClick={this.handleAdd}>
                        New Notification
                    </button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app")); 
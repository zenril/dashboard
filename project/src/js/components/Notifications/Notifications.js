import React from 'react';
import ReactDOM from 'react-dom';
import notificationStore from './redux/store/Notifications.js'
import notes from './redux/actions/Notifications.js'

import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

export default class App extends React.Component
{
    componentDidMount()
    {
        this.unsubscribe = notificationStore.subscribe(() =>
            this.forceUpdate()
        );

        notes.new(
            "test",  "tes aads ddasd sd"
        );
    }

    constructor(props){
        super(props);
    }

    componentWillUnmount()
    {
        this.unsubscribe();
    }

    render()
    {
        let state = notificationStore.getState();
        return (
            <div>
                {
                    state.notifications.messages.map((data, i) => (
                        <div key={i}>
                            <h1>{data.title}</h1>
                            <p>{data.message}</p>
                        </div>
                    ))
                }
            </div>
        );
    }
}
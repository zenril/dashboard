import React from 'react';
import ReactDOM from 'react-dom';
import Notifications from './components/Notifications/Notifications.js'
import Routing from './Routing.js';


import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';



class App extends React.Component
{
    componentDidMount()
    {
       
    }

    constructor(props){
        super(props);
    }

    componentWillUnmount()
    {
    }

    render()
    {
        return (
            <div className='app-main'>
                <Notifications/>
                <Routing />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app")); 
import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Home from './pages/Home.js';
import Dashboard from './pages/Dashboard.js';


export default () => (
    <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/dash" component={Dashboard}/>
        </div>
    </Router>
)
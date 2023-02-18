import { divide } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import NavBar from './NavBar';
import Home from './Home'
import Top from './Top';
import Register from './Register';
import Login from './Login';
import axios from 'axios';


axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App() {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/top">
                        <Top />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>

    );
}

export default App;

if (document.getElementById('single_app_base')) {
    ReactDOM.render(<App />, document.getElementById('single_app_base'));
}

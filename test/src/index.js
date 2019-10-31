import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './Header';
import {Router,Route,link, browserHistory} from 'react-router'
import Rule from './Rule';
import 'bootstrap/dist/css/bootstrap.min.css';
import Location from './location';

import SearchSticker from './SearchSticker';
import Staff from './Staff';
import Addsticker from './Addsticker';
import login from './login';


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path ="/Event" component={App}/>
        <Route path = "/Rule" component={Rule}/>
        <Route path = "/Location" component={Location}/>
        <Route path = "/SearchSticker" component={SearchSticker}/>
        <Route path = "/Staff" component={Staff}/>
        <Route path = "/Addsticker" component={Addsticker}/>
        <Route path = "/" component={login}/>
    </Router>,
    document.getElementById('root')
);


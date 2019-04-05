import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './Header';
import {Router,Route,link,browserHistory} from 'react-router'
import Rule from './Rule';
import 'bootstrap/dist/css/bootstrap.min.css';
import Area from './Area';

import SearchSticker from './SearchSticker';
import Staff from './Staff';
import Addsticker from './Addsticker';


ReactDOM.render(
    <Router history = {browserHistory}>
        <Route path ="/" component={App}/>
        <Route path = "/Rule" component={Rule}/>
        <Route path = "/Area" component={Area}/>
        
        <Route path = "/SearchSticker" component={SearchSticker}/>
        <Route path = "/Staff" component={Staff}/>
        <Route path = "/Addsticker" component={Addsticker}/>
    </Router>,
    document.getElementById('root')
);


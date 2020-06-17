import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import Reducers from "./store/Reducers/index.js";

import Home from './components/Home/home.jsx';
import Login from './components/Login/login.jsx';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import ForgetPassword from './components/ForgetPassword/forgetPassword.jsx';
import OTP from './components/OTP/otp.jsx';
import FileDetail from './components/FileDetail/fileDetail.jsx';
import ViewSection from './components/ViewSection/viewSection.jsx';
import GetUsers from './components/GetUsers/getUsers.jsx';
import GetClient from './components/deleteClient/deleteClient.jsx';
import CostFormula from './components/CostFormula/costFormula.jsx';

// Tariq
import Scrappers from './components/Insights/Scrappers';


const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true,
            traceLimit: 25
        })) ||
    compose;

const store = createStore(Reducers, composeEnhancers(applyMiddleware(thunk)));


const routing = (
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route exact path="/scrappers" component={Scrappers} />
                <Route path="/forgetpassword" component={ForgetPassword} />
                <Route path="/otp" component={OTP} />
                <Route path="/detail" component={FileDetail} />
                <Route path="/viewsection" component={ViewSection} />
                <Route path="/getusers" component={GetUsers} />
                <Route path="/deleteclient" component={GetClient} />
                <Route path="/costformula" component={CostFormula} />
            </div>
        </Router>
    </Provider>
)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();

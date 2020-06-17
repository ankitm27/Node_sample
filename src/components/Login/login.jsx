import React, {
    Component
} from 'react';

import "./login.css";


import LoginForm from "./../Forms/LoginForm/loginForm.jsx";
import SideBanner from "./../SideBanner/sideBanner.jsx";

class Login extends Component {
    render() {
        return ( 
            <div className="row login">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <SideBanner />
                        </div>
                        <div className="col-md-6 right">
                            <div className="row">
                                <div className="col-md-10 offset-md-1 form">
                                    <div>
                                       <LoginForm />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div> 
            </div> 
        )
    }
}

module.exports = Login;
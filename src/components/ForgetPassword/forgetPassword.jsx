import React, { Component } from 'react';

import SideBanner from './../SideBanner/sideBanner.jsx';
import ForgetPasswordForm from "./../Forms/ForgetPasswordForm/forgetPasswordForm.jsx";

class ForgetPassword extends Component{
    render(){
        return(
            <div className="login row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <SideBanner />
                        </div>
                        <div className="col-md-6 right">
                            <div className="row">
                                <div className="col-md-10 offset-md-1 form">
                                    <ForgetPasswordForm />
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgetPassword;
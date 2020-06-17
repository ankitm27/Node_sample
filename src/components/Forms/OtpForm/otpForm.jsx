import  React, { Component } from 'react';

import { Form, Button } from 'react-bootstrap';

import "./otpForm.css";

import actions from './../../../store/Actions/index.js';
import { connect } from "react-redux";
import { withRouter } from "react-router";

class OtpForm extends Component{
    state = {
        otp:"",
        newPassword:"",
        newConfirmPassword:""
    }

    onSubmit=async(evt) => {
        evt.preventDefault();
        await this.props.optVerify({email:this.props.location.state.email,newPassword:this.state.newPassword,newConfirmPassword:this.state.newConfirmPassword,OTP:this.state.otp});
        if(this.props.auth.success){
            this.props.history.push({
                pathname:"/"
            })
        };
    }

    render(){
        return(
            <div>
               <div className="col-md-12 loginform">
                   <div className="row">
                       <div className="col-md-12 heading">
                           <h1>
                               <span>
                                   OTP
                                </span>
                           </h1>
                           <p>
                               filling the OTP to get access 
                           </p>
                       </div>
                       <div className="col-md-12 mbform">
                           <Form onSubmit={this.onSubmit}>
                               <div className="row">
                                    <div className="col-md-12">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>OTP</Form.Label>
                                            <Form.Control required type="email" placeholder="Enter email" onChange={(evt) => {
                                                this.setState({otp:evt.target.value});
                                            }} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>New Password</Form.Label>
                                            <Form.Control required type="password" placeholder="Enter new password" onChange={(evt) => {
                                                this.setState({newPassword:evt.target.value});
                                            }}></Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Confirm password</Form.Label>
                                            <Form.Control required type="password" placeholder="Enter confirm password" onChange={(evt) => {
                                                this.setState({newConfirmPassword:evt.target.value});
                                            }}></Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12">
                                        <p className="text-danger">
                                            {this.props.auth.msg}
                                        </p>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row">
                                            <span className="col-md-12 text-right mb50">
                                                <Button varient="primary" type="submit" onClick={this.onSubmit.bind(this)}>
                                                    Submit
                                                </Button> 
                                            </span>
                                            
                                        </div>
                                    </div>
                               </div>

                           </Form>
                       </div>
                   </div>
               </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth:state.auth
});

const mapDispatchToProps = dispatch => ({
    optVerify: (v) => dispatch(actions.optVerify(v))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(OtpForm));
import  React, { Component } from 'react';

import { Form, Button } from 'react-bootstrap';

import "./forgetPasswordForm.css";

import actions from './../../../store/Actions/index.js';
import { connect } from "react-redux";
import { withRouter } from "react-router";

class ForgetPasswordForm extends Component{
    state = {
        email:"",
        
    }

    onSubmit=async(evt) => {
        evt.preventDefault();
        await this.props.forgetPassword({email:this.state.email});
        if(this.props.auth.success){
            this.props.history.push({
                pathname:"/otp",
                state:{
                    email:this.state.email
                }
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
                                   Forget Password
                                </span>
                           </h1>
                           <p>
                               Please fill email and you will get OTP over email
                           </p>
                       </div>
                       <div className="col-md-12 mbform">
                           <Form onSubmit={this.onSubmit}>
                               <div className="row">
                                    <div className="col-md-12">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control required type="email" placeholder="Enter email" onChange={(evt) => {
                                                this.setState({email:evt.target.value});
                                            }} />
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
                                                <Button varient="primary" type="submit">
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
    forgetPassword: (v) => dispatch(actions.forgetPassword(v))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ForgetPasswordForm));
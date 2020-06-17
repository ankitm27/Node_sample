import  React, { Component } from 'react';

import { Form, Button } from 'react-bootstrap';

import "./loginForm.css";

import actions from './../../../store/Actions/index.js';
import { connect } from "react-redux";
import { withRouter } from "react-router";

class LoginForm extends Component{
    state = {
        email:"",
        password:""
    }

    onSubmit=async(evt) => {
        evt.preventDefault();
        await this.props.login({email:this.state.email,password:this.state.password});
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
                                   Login Page
                                </span>
                           </h1>
                           <p>
                               filling your details to get access 
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
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control required type="password" placeholder="Password" onChange={(evt) => {
                                                this.setState({password:evt.target.value});
                                            }}>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-12">
                                        <p className="text-danger">
                                            {this.props.auth.msg}
                                        </p>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row">
                                            {/* <span className="col-md-6 text-left mb50">
                                                <Button varient="primary" type="submit" onClick={this.onForgetPassword.bind(this)}>
                                                    Forget Password
                                                </Button> 
                                            </span> */}
                                            <span className="col-md-12 text-right mb50">
                                                <Button varient="primary" type="submit" onKeyPress={this.onSubmit} >
                                                    Login
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
    login: (v) => dispatch(actions.login(v))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoginForm));
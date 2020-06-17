import React,{ Component } from 'react';

import { Form,Button } from 'react-bootstrap';
import actions from "./../../../store/Actions/index.js";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class AddNewUser extends Component{
    state={
        userName:"",
        password:"",
        confirmPassword:""
    }
    onSubmit=async(evt) => {
        evt.preventDefault();
        await this.props.createUser({
            userName:this.state.userName,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword
        });
        if(this.props.auth.auth.success){
           this.props.onSave(); 
        }
    }

    
    render(){
        return(
            <div>
                <Form onSubmit={this.onSubmit}>
                    <div className="col-md-12">
                        <Form.Group>
                            <Form.Label>
                                User Name
                            </Form.Label>    
                            <Form.Control required type="text" placeholder="Add New User" value={this.state.userName} onChange={(evt) => {
                                this.setState({userName:evt.target.value});
                            }}>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-md-12">
                        <Form.Group>
                            <Form.Label>
                                Password
                            </Form.Label>    
                            <Form.Control required type="password" placeholder="Password" value={this.state.password} onChange={(evt) => {
                                this.setState({password:evt.target.value});
                            }}>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-md-12">
                        <Form.Group>
                            <Form.Label>
                                Confirm Password
                            </Form.Label>
                            <Form.Control required type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={(evt) => {
                                this.setState({confirmPassword:evt.target.value});
                            }}>

                            </Form.Control>
                        </Form.Group>
                    </div>    
                    <div className="col-md-12 text-right">
                        <Button varient="primary" type="submit">
                            Submit
                        </Button>    
                    </div>
                    <div className="col-md-12">
                        <p className="text-danger">
                            {this.props.auth.auth.msg}
                        </p>
                    </div>
                    
                </Form>
            </div>
        )
    }
};

const mapStateToProps = state => ({
    dataTypes:state.list.dataTypes,
    auth:state
});

const mapDispatchToProps = dispatch => ({
    createUser:(v) => dispatch(actions.signUp(v))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddNewUser));
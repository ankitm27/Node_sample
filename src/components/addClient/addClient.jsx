import React,{ Component } from 'react';

import { Form,Button } from 'react-bootstrap';
import actions from "./../../store/Actions/index.js";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class AddNewUser extends Component{
    state={
        email:""
    }
    onSubmit=async(evt) => {
        evt.preventDefault();
        await this.props.addClient({
            email:this.state.email
        });
        if(this.props.auth.list.success){
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
                                Email
                            </Form.Label>    
                            <Form.Control required type="text" placeholder="Add Email" value={this.state.email} onChange={(evt) => {
                                this.setState({email:evt.target.value});
                            }}>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-md-12 text-right">
                        <Button varient="primary" type="submit">
                            Submit
                        </Button>    
                    </div>
                    {!this.props.auth.list.success &&<div className="col-md-12">
                        <p className="text-danger">
                            {this.props.auth.list.msg}
                        </p>
                    </div>
                    }
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
    // createUser:(v) => dispatch(actions.signUp(v))
    addClient:(v) => dispatch(actions.addClient(v))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddNewUser));
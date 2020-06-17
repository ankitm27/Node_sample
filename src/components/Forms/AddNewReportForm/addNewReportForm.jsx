import React, { Component } from 'react';

import { Form,Button } from 'react-bootstrap';
import './addNewReportForm.css';

import { connect } from 'react-redux';
import actions from "./../../../store/Actions/index.js";
import { withRouter } from 'react-router';
import Loader from 'react-loader-spinner'

class AddNewReportForm extends Component{
    state={
        fileName:"",
        image:"",
        apiWait:false,
        date:"",
        description:"",
        tag:""

    }
    onSubmit = async(evt) => {
        evt.preventDefault(); 
        this.setState({apiWait:true})
        console.log("this tate description",this.state.description);
        console.log("this state tag",this.state.tag);
        await this.props.addTableOfContent({file:this.state.image,date:this.state.date,description:this.state.description,tag:this.state.tag});
        this.setState({apiWait:false});
        this.props.onSave();
    }
    render(){
        return(
            <div>
                <Form onSubmit={this.onSubmit}>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <Form.Group>
                                    <Form.Label>
                                        Uplaod file
                                    </Form.Label>
                                    <Form.Control required type="file" placeholder="File" accept=".csv" onChange={(evt) =>{ 
                                        this.setState({image:evt.target.files[0]});
                                    }}>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-md-12">
                                <Form.Group>
                                    <Form.Label>
                                        date
                                    </Form.Label>
                                    <Form.Control required type="input" placeholder="Please add data in YYYY-MM formet" onChange={(evt) => {
                                        this.setState({date:evt.target.value});
                                    }}>

                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-md-12">
                                <Form.Group>
                                    <Form.Label>
                                        Description
                                    </Form.Label>
                                    <Form.Control required as="textarea" placeholder="add description" onChange={(evt) =>{ 
                                        this.setState({description:evt.target.value});
                                    }}>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-md-12">
                                <Form.Group>
                                    <Form.Label>
                                        Uplaod file
                                    </Form.Label>
                                    <Form.Control required as="select" placeholder="Tag" value={this.state.tag} onChange={(evt) =>{ 
                                        this.setState({tag:evt.target.value});
                                    }}>
                                    <option>All Industry Verticals</option>
                                    <option>Advanced Materials and Chemicals </option>
                                    <option>Aerospace and Defense </option>
                                    <option>Agriculture and Food Tech </option>
                                    <option>BIS Automotive </option>
                                    <option>BIS Healthcare </option>
                                    <option>Deep Tech Themes </option>
                                    <option>Electronics and Semiconductor </option>
                                    <option>Energy and Sustainability </option>
                                    <option>Other Verticals </option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            

                            {!this.state.apiWait && <div required className="col-md-12 text-right submitbtn">
                                <Button varient="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                            }
                            {this.state.apiWait && <div className="col-md-12 text-right">
                                {/* <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"></img> */}
                                <Loader
                                   type="Oval"
                                   color="#00BFFF"
                                   height={100}
                                   width={100}
                            //    timeout={3000} //3 secs
                            />
                            </div>
                            } 
                        </div>
                    </div>   
                </Form>
            </div>    
        )
    }
}

const mapStateToProps = state => ({
    list:state.list
});

const mapDispatchToProps = dispatch => ({
    // addNewReport: (v) => dispatch(actions.addNewReport(v)),
    addTableOfContent:(v) => dispatch(actions.addTableOfContent(v))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddNewReportForm));
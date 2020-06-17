import React , { Component } from 'react'

import { Form, Button } from 'react-bootstrap';

import actions from './../../store/Actions/index.js';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './addImage.css';

class AddImage extends Component{
    state={
        heading:"",
        description:"",
        image:null,
        source:""
    }
    onSubmit  = async(evt)=>{
        evt.preventDefault();
        await this.props.uploadImage({
            image:this.state.image,
            type:"image"
        });
        console.log("this state ",this.state);
        await this.props.addData({
            reportId:this.props.reportId,
            sectionId:this.props.sectionId,
            dataType:"image",
            heading:this.state.heading,
            description:this.state.description,
            dataObj:this.props.list.list.fileUrl,
            chapterId:this.props.chapterId,
            source:this.state.source
        });
        this.props.onSave();
    }
    render(){
        return(
            <div>
                <Form onSubmit={this.onSubmit}>
                    <div className="col-md-12">
                        <Form.Group>
                            <Form.Label>
                                Heading
                            </Form.Label>
                            <Form.Control type="text" placeholder="Enter text here" value={this.state.heading} onChange={(evt) => {
                                this.setState({heading:evt.target.value});
                            }}>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-md-12">
                        <Form.Group>
                            <Form.Label>
                                Description
                            </Form.Label>
                            <Form.Control as="textarea" placeholder="Enter description here" value={this.state.description} onChange={(evt) => {
                                this.setState({description:evt.target.value});
                            }}>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-md-12">
                        <Form.Group>
                            <Form.Label>
                                Source
                            </Form.Label>
                            <Form.Control as="textarea" placeholder="Enter source here" value={this.state.source} onChange={(evt) => {
                                this.setState({source:evt.target.value});
                            }}>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-md-12">
                        <Form.Group>
                            <Form.Label>
                                Upload Image
                            </Form.Label>
                            <Form.Control required type="file" placeholder="Upload image" accept=".jpeg,.png" onChange={(evt) => {
                                this.setState({image:evt.target.files[0]});
                            }}>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-md-12 text-right">
                        <Button primary="varient" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list:state
});

const mapDispatchToProps = dispatch => ({
    addData:(v) => dispatch(actions.addData(v)),
    uploadImage:(v) => dispatch(actions.uploadImage(v))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddImage))
import React,{ Component } from 'react';

import { Form,Button } from 'react-bootstrap';
import actions from "./../../store/Actions/index.js";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';


class AddText extends Component{
    state={
        heading:"",
        description:""
    }
    onSubmit=async(evt) => {
        evt.preventDefault();
        await this.props.addData({
            reportId:this.props.reportId,
            sectionId:this.props.sectionId,
            dataType:"text",
            heading:this.state.heading,
            description:this.state.description,
            chapterId:this.props.chapterId
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
                            <Form.Control type="text" placeholder="Add heading here" value={this.state.heading} onChange={(evt) => {
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
                            
                            <Form.Control as="textarea" placeholder="Add description here" value={this.state.description} onChange={(evt) => {
                                this.setState({description:evt.target.value});
                            }}>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col-md-12 text-right">
                        <Button varient="primary" type="submit">
                            Submit
                        </Button>    
                    </div>
                </Form>
            </div>
        )
    }
};

const mapStateToProps = state => ({
    dataTypes:state.list.dataTypes
});

const mapDispatchToProps = dispatch => ({
    addData:(v) => dispatch(actions.addData(v))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddText))
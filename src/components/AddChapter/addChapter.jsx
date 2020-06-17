import React, { Component } from 'react';

import { Form ,Button} from 'react-bootstrap';


import actions from './../../store/Actions/index.js';
import { connect } from "react-redux";
import { withRouter } from "react-router";


class AddChapter extends Component{
    state={
        chapterName:"",
        chapterTypes:[
            {_id:1,type:"normal"},
            {_id:2,type:"executive summary"}
        ],
        chapterType:"normal"
    }
    
    onSubmit=async(evt)=>{
        evt.preventDefault();
        document.getElementById("emailerror").innerHTML = "";
        await this.props.addNewChapter({reportId:this.props.reportId,chapterName:this.state.chapterName,chapterType:this.state.chapterType});
        this.props.onSave();
    }
    
    render(){
        return(
            <div>
                <Form onSubmit={this.onSubmit}>
                    <div className="col-md-12">
                        <Form.Group>
                            <Form.Label>
                                Chapter Type
                            </Form.Label>    
                            <Form.Control as="select" value={this.state.chapterType} onChange={(evt) => {
                                this.setState({chapterType:evt.target.value});
                            }}>
                            {this.state && this.state.chapterTypes && this.state.chapterTypes.map((chapter, index) => (
                                <option key={chapter._id}>
                                    {chapter.type}
                                </option>
                            ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Add Chapter
                            </Form.Label>
                            <Form.Control type="text" placeholder="Add Chapter" required onChange={(evt) => {
                                this.setState({chapterName:evt.target.value});
                            }}>
                            </Form.Control>    
                        </Form.Group>
                    </div>
                    <div className="col-md-12">
                        <p id="emailerror" className="text-danger"></p>
                    </div>
                    <div className="col-md-12 text-right">
                        <Button varient="primary" type="submit">
                            Add
                        </Button>
                    </div>
                </Form>
            </div>    
        )
    }
}

const mapStateToProps = state => ({
    detail:state.list.detail
});

const mapDispatchToProps = dispatch => ({
    addNewChapter:(v) => dispatch(actions.addNewChapter(v))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddChapter));
import React, { Component } from 'react';

import { Form, Button } from 'react-bootstrap';
import _ from 'lodash';

import actions from './../../store/Actions/index.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class AddSection extends Component{
    state={
        chapters:[],
        sectionName:"",
        chapterName:"",
        sectionTypes:[
            {_id:1,type:"normal"},
            {_id:2,type:"company profile"}
        ],
        sectionType:"normal",
        chapterId:""
    }
    onSubmit=async(evt) => {
        evt.preventDefault();
        var chapterId = _.find(this.props.chapters,{chapterName:this.state.chapterName})._id;
        this.setState({chapterId:chapterId});
        chapterId = chapterId ? chapterId : this.state.chapterId;
        await this.props.addNewSection({reportId:this.props.reportId,chapterId:chapterId,sectionName:this.state.sectionName,sectionType:this.state.sectionType});
        window.location.reload(true);
    }
    componentDidMount(){
        this.setState({chapters:this.props.chapters}); 
        this.setState({chapterId:this.props.chapters[0]._id})
        this.setState({chapterName:this.props.chapters[0].chapterName});
    }
    
    render(){
        return(
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Label>
                            Section Types
                        </Form.Label>
                        <Form.Control required as="select" value={this.state.sectionType} onChange={(evt) => {
                            this.setState({sectionType:evt.target.value});
                        }}>
                            {this.state && this.state.sectionTypes && this.state.sectionTypes.map((section, index) => (
                                <option key={section._id}>
                                    {section.type}
                                </option>
                            ))}
                        </Form.Control>    
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Chapters
                        </Form.Label>
                        <Form.Control required as="select" value={this.state.chapterName} onChange={(evt) => {
                            this.setState({chapterName:evt.target.value});
                        }}>
                            {this.state && this.state.chapters && this.state.chapters.map((chapter, index) => (
                                <option key={chapter._id}>
                                    {chapter.chapterName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Add Section
                        </Form.Label>
                        <Form.Control required type="text" placeholder="Add Section" onChange={(evt) => {
                            this.setState({sectionName:evt.target.value});
                        }}>
                        </Form.Control>    
                    </Form.Group>
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
    addNewSection:(v) => dispatch(actions.addNewSection(v))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddSection));
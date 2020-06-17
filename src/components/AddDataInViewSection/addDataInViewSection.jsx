import React, { Component } from 'react';

import { Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import actions from './../../store/Actions/index.js';
import _ from 'lodash';

import AddText from './../AddText/addText.jsx';
import AddImage from './../AddImage/addImage.jsx';
import AddGraph from './../AddGraph/addGraph.jsx';
import AddTable from './../AddTable/addTable.jsx';


class AddData extends Component{
    state={
       dataTypes:[], 
       dataType:"",
       chapters:[],
       chapterName:"",
       sections:[],
       sectionName:"",
       showSelect:true,
       shown:true,
       showData:false,
       type:"",
       heading:"",
       description:"",
       file:"" ,
       sectionId:"",
       chapterId:""
    };
    async componentDidMount(){
        await this.props.getDataType();
        this.setState({
            dataTypes:this.props.dataTypes,
            dataType:this.props.dataTypes[0].typeName,
            sectionId:this.props.sectionId,
            chapterId:this.props.chapterId,
            reportId:this.props.reportId
        });
        // this.setState({sectionId:this.state.sections[0]._id});
        // this.setState({sectionName:this.state.sections[0].sectionName});    
        this.setState({chapterName:this.props.chapterName});
        this.setState({sectionName:this.props.sectionName});
    }

    onSubmit = async(evt) => {
        evt.preventDefault();
        this.setState({showSelect:false});
        this.setState({shown:false})
        this.setState({showData:true});
        const type = _.find(this.state.dataTypes,{typeName:this.state.dataType});
        this.setState({type:type.type});
        const sectionId = _.find(this.props.sections,{sectionName:this.state.sectionName});
        this.setState({sectionId:sectionId._id});
    }

    onDataSubmit=async(evt) => {
        evt.preventDefault();
        const sectionId = _.find(this.props.sections,{sectionName:this.state.sectionName});
        this.setState({sectionId:sectionId._id});
    }

    render(){
        return(
            <div>
                {this.state.shown && 
                    <div>
                        <Form onSubmit={this.onSubmit}>
                            <div className="col-md-12">
                                <Form.Group>
                                    <Form.Label>
                                        Data Types
                                    </Form.Label>    
                                    <Form.Control as="select" value={this.state.dataType} onChange={(evt) => {
                                        this.setState({dataType:evt.target.value});
                                    }}>
                                    {this.state && this.state.dataTypes && this.state.dataTypes.map((dataType, index) => (
                                        <option key={dataType._id}>
                                            {dataType.typeName}
                                        </option>
                                    ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-md-12">
                                <Form.Group>
                                    <Form.Label>
                                        Chapter Name
                                    </Form.Label>    
                                    <Form.Control type="text" value={this.props.chapterName} disabled>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-md-12">
                                <Form.Group>
                                    <Form.Label>
                                        Section Name
                                    </Form.Label>    
                                    <Form.Control type="text" value={this.props.sectionName} disabled>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-md-12">
                                <p id="emailerror" className="text-danger"></p>
                            </div>
                            
                            <div className="col-md-12 text-right">
                                <Button varient="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </div>
                }
                {this.state.showData &&
                    <div>
                        { 
                            this.state.dataType === "text" ? <AddText reportId={this.props.reportId} sectionId={this.state.sectionId} chapterId={this.state.chapterId} onSave={this.props.onSave} /> : 
                            this.state.dataType === "image" ? <AddImage reportId={this.props.reportId} sectionId={this.state.sectionId} chapterId={this.state.chapterId} onSave={this.props.onSave} /> : 
                            this.state.dataType === "graph" ? <AddGraph reportId={this.props.reportId} sectionId={this.state.sectionId} chapterId={this.state.chapterId} onSave={this.props.onSave} /> : 
                            this.state.dataType === "table" ? <AddTable reportId={this.props.reportId} sectionId={this.state.sectionId} chapterId={this.state.chapterId} onSave={this.props.onSave} /> : "check"
                        }
                    </div>
                }    
            </div>    
        )
    }
}

const mapStateToProps = state => ({
    dataTypes:state.list.dataTypes
});

const mapDispatchToProps = dispatch => ({
    getDataType:(v) => dispatch(actions.getDataType(v)),
    addData:(v) => dispatch(actions.addData(v))
});

export default withRouter (connect(mapStateToProps,mapDispatchToProps)(AddData));
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
// import { MDBSpinner } from 'mdbreact';
import Loader from 'react-loader-spinner'

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
       chapterId:"",
       PDF:"",
       sectionWisePDF:"",
       apiWait:false
    };
    async componentDidMount(){
        // await this.props.getDataType();
        // this.setState({
        //     dataTypes:this.props.dataTypes,
        //     dataType:this.props.dataTypes[0].typeName,
        //     chapters:this.props.chapters,
        //     chapterName:this.props.chapters[0].chapterName,
        //     chapterId:this.props.chapters[0]._id,
        //     sections:_.filter(this.props.sections,{chapterId:this.props.chapters[0]._id})
        // });
        // this.setState({sectionId:this.state.sections[0]._id});
        // this.setState({sectionName:this.state.sections[0].sectionName});    
        await this.props.dataExist({reportId:this.props.reportId});
        console.log("this props",this.props.state.list.data);
        this.setState({isDataExist : this.props.state.list.data.isDataPresent});
        console.log("this props",this.state.isDataExist);
    }

    onSubmit = async(evt) => {
        evt.preventDefault();
        // document.getElementById("emailerror").innerHTML = "";
        // if(!this.state.dataType){
        //     document.getElementById("emailerror").innerHTML = "Data Type is required";
        // }
        // else if(!this.state.chapterName){
        //     document.getElementById("emailerror").innerHTML = "Chapter Name is required";
        // }
        // else if(!this.state.sectionName){
        //     document.getElementById("emailerror").innerHTML = "Section Name is required";
        // }
        // else{
        //     this.setState({showSelect:false});
        //     this.setState({shown:false})
        //     this.setState({showData:true});
        //     const type = _.find(this.state.dataTypes,{typeName:this.state.dataType});
        //     this.setState({type:type.type});
        //     const sectionId = _.find(this.props.sections,{sectionName:this.state.sectionName});
        //     this.setState({sectionId:sectionId._id});
        // }
    }

    // onChapterChange=async(evt) => {
    //     evt.preventDefault();
    //     this.setState({chapterName:evt.target.value});
    //     const chapterId = _.find(this.state.chapters,{chapterName:evt.target.value});
    //     const sections = _.filter(this.props.sections,{chapterId:chapterId._id});
    //     this.setState({sections:sections,sectionName:sections[0].sectionName,chapterId:chapterId._id});
    // }

    // onDataSubmit=async(evt) => {
    //     evt.preventDefault();
    //     const sectionId = _.find(this.props.sections,{sectionName:this.state.sectionName});
    //     this.setState({sectionId:sectionId._id});
    // }

    onSubmit = async(evt) => {
        evt.preventDefault();
        this.setState({apiWait:true});
        await this.props.addPDF({PDF:this.state.PDF,reportId:this.props.reportId});
        await this.props.addPDFSectionWise({sectionWisePDF:this.state.sectionWisePDF,reportId:this.props.reportId});
        this.setState({apiWait:false});
        this.props.onSave();
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
                                        PDF 
                                    </Form.Label>    
                                    <Form.Control required type="file" accept=".pdf" onChange={(evt) => {
                                        this.setState({PDF:evt.target.files[0]});
                                    }}>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            {/* <div className="col-md-12">
                                <Form.Group>
                                    <Form.Label>
                                        Chapters
                                    </Form.Label>    
                                    <Form.Control as="select" value={this.state.chapter} onChange={this.onChapterChange}>
                                    {this.state && this.state.chapters && this.state.chapters.map((chapter, index) => (
                                        <option key={chapter._id}>
                                            {chapter.chapterName}
                                        </option>
                                    ))}
                                    </Form.Control>
                                </Form.Group>
                            </div> */}
                            {/* <div className="col-md-12">
                                <Form.Group>
                                    <Form.Label>
                                        Sections
                                    </Form.Label>    
                                    <Form.Control as="select" value={this.state.sectionName} onChange={(evt) => {
                                        this.setState({sectionName:evt.target.value});
                                    }}>
                                    {this.state && this.state.sections && this.state.sections.map((section, index) => (
                                        <option key={section._id}>
                                            {section.sectionName}
                                        </option>
                                    ))}
                                    </Form.Control>
                                </Form.Group>
                            </div> */}
                            <div className="col-md-12">
                                <Form.Group>
                                    <Form.Label>
                                        Section Wise PDF
                                    </Form.Label>
                                    <Form.Control required type="file" accept=".pdf" onChange={(evt) => {
                                        this.setState({sectionWisePDF:evt.target.files[0]})
                                    }}>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            {/* <div className="col-md-12">
                                <p id="emailerror" className="text-danger"></p>
                            </div> */}
                            {this.state.isDataExist && <div>
                                <h2>
                                   Data is already submit, if you will upload new file it will update the data
                                </h2>
                            </div>}
                            {!this.state.apiWait && <div className="col-md-12 text-right">
                                <Button varient="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                            }
                            {this.state.apiWait && <div className="col-md-12 text-right">
                            <Loader
                               type="Oval"
                               color="#00BFFF"
                               height={100}
                               width={100}
                            //    timeout={3000} //3 secs
                            />
                            </div>  
                            }
                        </Form>
                    </div>
                }
                {/* {this.state.showData &&
                    <div>
                        { 
                            this.state.dataType === "text" ? <AddText reportId={this.props.reportId} sectionId={this.state.sectionId} chapterId={this.state.chapterId} onSave={this.props.onSave} /> : 
                            this.state.dataType === "image" ? <AddImage reportId={this.props.reportId} sectionId={this.state.sectionId} chapterId={this.state.chapterId} onSave={this.props.onSave} /> : 
                            this.state.dataType === "graph" ? <AddGraph reportId={this.props.reportId} sectionId={this.state.sectionId} chapterId={this.state.chapterId} onSave={this.props.onSave} /> : 
                            this.state.dataType === "table" ? <AddTable reportId={this.props.reportId} sectionId={this.state.sectionId} chapterId={this.state.chapterId} onSave={this.props.onSave} /> : "check"
                        }
                    </div>
                }     */}
            </div>    
        )
    }
}

const mapStateToProps = state => ({
    // dataTypes:state.list.dataTypes
    state:state,
});

const mapDispatchToProps = dispatch => ({
    // getDataType:(v) => dispatch(actions.getDataType(v)),
    // addData:(v) => dispatch(actions.addData(v))
    addPDF:(v) => dispatch(actions.addPDF(v)),
    // addPDF:(v) => dispatch(addPDF(v))
    addPDFSectionWise:(v) => dispatch(actions.addPDFSectionWise(v)),
    dataExist:(v) => dispatch(actions.dataExist(v))
});

export default withRouter (connect(mapStateToProps,mapDispatchToProps)(AddData));
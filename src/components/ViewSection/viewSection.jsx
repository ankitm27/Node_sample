import React, { Component } from 'react';

import Navbar from './../Navbar/navbar.jsx';
import Navigation from './../Navigation/navigation.jsx';

import actions from './../../store/Actions/index.js';
import { connect } from 'react-redux';
import { withRouter } from  'react-router-dom';
import { JsonToTable } from 'react-json-to-table';

import './viewSection.css';

import ShowGraph from './../ShowGraph/showGraph.jsx';
import { isLogin } from './../../utils/authentication.js';
import { Button,Modal } from 'react-bootstrap';
import AddDataInViewSection from './../AddDataInViewSection/addDataInViewSection.jsx';
// import ReactPDF from 'react-pdf';
// import { PDFDownloadLink } from "@react-pdf/renderer";
import { Document,Page } from 'react-pdf';
import axios from "axios";
import { BACKEND_URL } from "./../../config.js"; 

class ViewSection extends Component{
    state = {
        viewSection:[],
        image:"",
        show:false,
        numPages:"",
        pageNumber:"" 
    }
    async componentDidMount(){
        if(!isLogin()){
            this.props.history.push({
                pathname:"/login"
            });
        }
        await this.props.viewSection({sectionId:this.props.location.state.state.sectionId});
        this.setState({url:BACKEND_URL + "/" + this.props.list.list.sectionData.url});
        console.log("this tate url",this.state.url);
    }
    
    
    
    onData= async(evt) => {
        this.props.history.push({
            pathname:"/detail"
        },{
            state:{
                _id:this.props.location.state.state.reportId
            }
        })
    }
    onClose=async(evt) => {
        await this.props.viewSection({sectionId:this.props.location.state.state.sectionId});
        this.setState({viewSection:this.props.list.list.sectionData});
        this.setState({show:false});
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };
    goToPrevPage = () => {
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    };
    goToNextPage = () => {
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
    }
    render(){
        return(
            <div className="home">
                <div className="col-md-12 topbar">
                    <Navbar />
                    <Navigation />
                </div>
                {/* <div className="col-md-3 offset-md-9">
                    <Button varient="primary" type="submit" onClick={this.onData}>
                        Add Data
                    </Button>
                </div> */}
                {/* <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 viewpg">
                            <div>
                                <h1>
                                    Name - {this.props.location.state.state.reportName}
                                </h1>
                            </div>
                            <div>
                                <h2>
                                    Chapter - {this.props.location.state.state.chapterName}
                                </h2>
                            </div>
                            <div>
                                <h4>
                                    Section - {this.props.location.state.state.sectionName}
                                </h4>    
                            </div>    
                            <div>
                                {this.state && this.state.viewSection && this.state.viewSection.map((section, index) => (
                                    <div key={section._id}>
                                        {section.data.title &&<p className="ttlTx">
                                            *{section.data.title}
                                        </p>
                                        }
                                        {
                                            section.dataType === "image"
                                                && <div className="col-md-6 offset-md-2">
                                                    <img src={section.data.dataObj[0]} alt={section.data.dataObj[0]} height="500" width="500" className="imgTx"></img> 
                                                    {section.data.description && <div>
                                                        {section.data.description}
                                                    </div>
                                                    }
                                                    {section.data.source && <div>
                                                        source-{section.data.source}    
                                                    </div>}
                                                </div>
                                        }
                                        <div className="graphDt">
                                            {
                                                section.dataType === "graph"
                                                    && <div className="col-md-6 offset-md-2">
                                                            <ShowGraph graphType={section.subDataType} data={section.data.dataObj} />
                                                        {section.data.description && <div>
                                                            {section.data.description}
                                                        </div>    
                                                        }
                                                        {section.data.source && <div>
                                                            source-{section.data.source}    
                                                        </div>}
                                                    </div> 
                                            }
                                        </div>
                                        <div className="graphDt">
                                            {
                                                section.dataType === "table"
                                                    && <div className="col-md-6 offset-md-2">
                                                        <JsonToTable json={section.data.dataObj} />
                                                        {section.data.description && <div>
                                                            {section.data.description}
                                                        </div>
                                                        }
                                                        {section.data.source && <div>
                                                            source-{section.data.source}
                                                        </div>
                                                        }
                                                    </div>
                                            }
                                        </div>  
                                        <div>
                                            {
                                                section.dataType === "text" && section.data.description &&
                                                <div className="desTx">
                                                    {section.data.description}
                                                </div>     
                                            }
                                        </div>      
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                </div> */}
                <div>
                    {/* <div className="offset-md-2">
                        <Button varient="primary" type="submit" onClick={this.onData}>
                            Back
                        </Button>
                    </div> */}
                    <div className="viewpg">
                        <object data={this.state.url} type="application/pdf" className="pdf offset-md-2"></object>
                    </div>
                </div>
                <Modal show={this.state.show} onHide={this.onClose} className="modal-size" size="lg" style={{"height":"600px"}}>
                    <Modal.Header closeButton>
                        <div className="row col-md-12">
                            <Modal.Title className="col-md-6 heading-details">Add data</Modal.Title>
                        </div>
                    </Modal.Header>
                    <Modal.Body style={{"overflowY":"auto","overflowX":"auto"}}>
                        <AddDataInViewSection chapterId={this.props.location.state.state.chapterId} reportId={this.props.location.state.state.reportId} sectionId={this.props.location.state.state.sectionId} onSave={this.onClose} sectionName={this.props.location.state.state.sectionName} chapterName={this.props.location.state.state.chapterName} /> 
                    </Modal.Body>
                </Modal>
 
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    list:state
});

const mapDispatchToProps = (dispatch) => ({
    viewSection:(v) => dispatch(actions.viewSection(v))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ViewSection));
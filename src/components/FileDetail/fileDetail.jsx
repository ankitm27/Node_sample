import React, { Component } from 'react';

import actions from './../../store/Actions/index.js';
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Navbar from './../Navbar/navbar.jsx';
import Navigation from './../Navigation/navigation.jsx';
import Section from './../Section/section.jsx';
import { Button } from 'react-bootstrap'; 

import { Modal } from 'react-bootstrap';

import AddChapter from './../AddChapter/addChapter.jsx'; 
import AddSection from './../AddSection/addSection.jsx';
import AddData from './../AddData/addData.jsx';

import "./fileDetail.css";

import { isLogin } from './../../utils/authentication.js';
import UpdateChapter from './../UpdateChapter/updateChapter.jsx';

class FileDetail extends Component{
    state={
        detail:"",
        chapters:[],
        chapterName:"",
        show:false,
        showSection:false,
        sections:[],
        isSuperAdmin:false,
        updateChapterShow:false,
        _id:"",
        idNumber:null
    }
    async componentDidMount(){
        if(!isLogin()){
            this.props.history.push({
                pathname:"/login"
            });
        }
        await this.props.fileDetail({_id:this.props.location.state._id ? this.props.location.state._id : this.props.location.state.state._id});
        this.setState({detail:this.props.detail,chapters:this.props.detail.chapters,sections:this.props.detail.sections});
        if(localStorage.getItem("userType") === "superAdmin"){
            this.setState({isSuperAdmin:true});
        }
    }

    onClick=(evt) => {
        evt.preventDefault();
        this.setState({show:true});
    }
    handleClose=() => {
        this.setState({show:false});
    }
    onSection=(evt) => {
        evt.preventDefault();
        this.setState({showSection:true});
    }
    onSectionClose=(evt) => {
        this.setState({showSection:false});
    }
    onData=(evt) => {
        this.setState({showData:true});
    }
    onDataClose=(evt) => {
        this.setState({showData:false});
    }
    onSubmit=async() => {
        await this.props.fileDetail({_id:this.props.location.state._id});
        this.setState({show:false});
        this.setState({detail:this.props.detail,chapters:this.props.detail.chapters,sections:this.props.detail.sections});
    }
    onSectionSubmit=async() => {
        await this.props.fileDetail({_id:this.props.location.state._id});
        this.setState({showSection:false});
        this.setState({detail:this.props.detail,chapters:this.props.detail.chapters,sections:this.props.detail.sections});
    }
    onDataSubmit=async() => {
        this.setState({showData:false});
    }

    onChapterUpdate = (chapterId) => {
        this.setState({updateChapterShow:true});
        this.setState({chapterId:chapterId});
    }

    onChapterUpdateClose = () => {
        this.setState({updateChapterShow:false});
    }

    onChapterDelete = (chapterId) => {
        if(window.confirm('Delete the item?')){
            this.props.onChapterDelete({chapterId:chapterId});
            window.location.reload(true);
        }
    }


    render(){
        return(
            <div>
                <div className="col-md-12">
                    <Navbar />
                    <Navigation />
                </div> 
                <div className="col-md-4 offset-md-8">
                    {/* <span className="addCpBtn">
                        <Button varient="primary" type="submit" onClick={this.onClick}>
                            Add chapter
                        </Button>
                    </span> */}
                    {/* <span className="addStBtn">
                        <Button varient="primary" type="submit" onClick={this.onSection}>
                            Add section
                        </Button>
                    </span>   */}
                    <span className="addDtBtn"> 
                        <Button varient="primary" type="submit" onClick={this.onData}>
                            Add Data
                        </Button>
                    </span>      
                </div>
                <div className="col-md-12 pageBg">
                    <div className="row">
                        <div className="col-md-11 offset-md-1 filename datapg">
                            *{this.state.detail.reportName}
                        </div>
                        <div className="col-md-10 offset-md-2 chaptername">
                            {this.state && this.state.chapters && this.state.chapters.map((chapter, index) => (
                                <div key={chapter._id} >
                                    <div className="row">
                                        <div className="col-md-8">
                                            {index+1}-{chapter.chapterName}
                                        </div>
                                        {this.state.isSuperAdmin && <div className="col-md-2">
                                            <Button varient="primary" type="submit" onClick={this.onChapterUpdate.bind(this,chapter._id)}>
                                                Update Chapter
                                            </Button>
                                        </div>
                                        }
                                        {this.state.isSuperAdmin && <div className="col-md-2">
                                            <Button varient="primary" type="submit" onClick={this.onChapterDelete.bind(this,chapter._id)}>
                                                Delete Chapter
                                            </Button>
                                        </div>
                                        }        
                                    </div>
                                    <Section chapterId={chapter._id} detail={this.state.detail} chapterNumber={index+1} reportId={this.props.location.state._id} chapterName={chapter.chapterName} reportName={this.state.detail.reportName} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Modal size="lg" show={this.state.show} onHide={this.handleClose} className="modal-size">
                    <Modal.Header closeButton>
                        <div className="row col-md-12">
                            <Modal.Title className="col-md-6 heading-details">Add Chapter</Modal.Title>
                        </div>   
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <AddChapter reportId={this.props.detail._id} onSave={this.onSubmit}/>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showSection} onHide={this.onSectionClose} className="modal-size" size="lg">
                    <Modal.Header closeButton>
                        <div className="row col-md-12">
                            <Modal.Title className="col-md-6 heading-details">Add Section</Modal.Title>
                        </div>   
                    </Modal.Header>
                    <Modal.Body className="modal-body" style={{"overflowY":"auto"}}>
                        <AddSection chapters={this.state.chapters} reportId={this.props.detail._id} onSave={this.onSectionSubmit} {...this.state} />
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showData} onHide={this.onDataClose} className="modal-size" size="lg" style={{"height":"600px"}}>
                    <Modal.Header closeButton>
                        <div className="row col-md-12">
                            <Modal.Title className="col-md-6 heading-details">Add data</Modal.Title>
                        </div>
                    </Modal.Header>
                    <Modal.Body style={{"overflowY":"auto","overflowX":"auto"}}>
                        <AddData chapters={this.state.chapters} reportId={this.props.detail._id} sections={this.props.detail.sections} onSave={this.onDataSubmit}/> 
                    </Modal.Body>
                </Modal>
                <Modal size="lg" show={this.state.updateChapterShow} onHide={this.onChapterUpdateClose} className="modal-size">
                    <Modal.Header closeButton>
                        <div className="row col-md-12">
                            <Modal.Title className="col-md-6 heading-details">Add Chapter</Modal.Title>
                        </div>   
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <UpdateChapter chapterId={this.state.chapterId} />
                    </Modal.Body>
                </Modal>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    detail:state.list.detail
});


const mapDispatchToProps = dispatch => ({
    fileDetail:(v) => dispatch(actions.fileDetail(v)),
    onChapterDelete:(v) => dispatch(actions.onChapterDelete(v))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FileDetail));
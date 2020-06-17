import React, { Component } from 'react';

import { Form ,Button} from 'react-bootstrap';
import AddDataManual from './../AddDataManual/addDataManual.jsx';
import actions from './../../store/Actions/index.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import bar from './bar.svg';
import pie from './pie.svg';
import scatter from './scatter.png';
import line from './line.png';
import mixed from './mixed.png';
import bubble from './bubble.png';
import horizontalbar from './horizontalBar.png';
import horizontalStacked from './horizontalStacked.png';
import stacked from './stacked.png';
import radar from './radar.jpeg';
import doughnut from './doughnut.png';
import graphPie from './graphPie.jpeg'
import bartable from './barTable.png';
import twohorizontalbar from './twoHorizontalBar.png';
import twobar from './twoBar.jpeg';

class AddGraph extends Component{
    state={
        heading: "",
        description: "",
        file:null,
        graphType: "",
        show: true,
        columnCount: 0,
        selectedType:"file",
        showForm:true,
        showManual:false,
        showNumberOfColumn:false,
        uploadTypes:[{
           _id:"1",typeName:"file"
        },{
            _id:"2",typeName:"manual"
        }],
        source:""
    }

    onSubmit=async(evt) => {
        evt.preventDefault();
        if(this.state.selectedType === "file"){
            await this.props.uploadImage({
                image:this.state.file,
                type:'graph'
            });
            await this.saveData();
        }else{
            this.setState({showForm:false});
            this.setState({showManual:true});
        }
    }

    handleManualForm = async(data)=> {
        let dataArr = [];
        const keys = data && data.rows && Object.values(data.rows[0]);
        data && data.rows && data.rows.slice(1).forEach((dataObj) => {
            var result = {};
            const valArray = Object.values(dataObj);
            keys.forEach((key, i) => {
                result[key] = valArray[i];
            });
            dataArr.push(result)
        });
        if(dataArr.length >= 1 ){
            await this.saveData(dataArr)
        }
    }

    componentDidMount = async() => {
        await this.props.graphTypes();
        this.setState({graphTypes:this.props.fileUrl.graphTypes});
        this.setState({graphType:this.props.fileUrl.graphTypes[0]})
    }

    saveData=async(data) => {
        await this.props.addData({
            reportId:this.props.reportId,
            sectionId:this.props.sectionId,
            dataType:"graph",
            heading:this.state.heading,
            description:this.state.description,
            dataObj:data ? data : this.props.fileUrl.jsonData,
            subDataType:this.state.graphType,
            chapterId:this.props.chapterId,
            source:this.state.source
        });
        this.props.onSave();
        
    }
    onUploadType = async(evt) => {
        if(evt.target.value === "file"){
            this.setState({selectedType:"file"});
            this.setState({show:true});
            this.setState({showNumberOfColumn:false});
        }else{
            this.setState({selectedType:"manual"});
            this.setState({show:false});
            this.setState({showNumberOfColumn:true});
        }
    }


    
    render(){
        return(
            <div>
                <Form onSubmit={this.onSubmit}>
                    {this.state.showForm&& <div>
                        <div className="col-md-12">
                            <Form.Group>
                                <Form.Label>
                                    Graph type
                                </Form.Label>
                                <Form.Control required as="select" placeholder="Graph type" value={this.state.graphType} onChange={(evt) => {
                                    this.setState({graphType:evt.target.value});
                                }}>
                                {this.state && this.state.graphTypes && this.state.graphTypes.map((graph, index) => (
                                    <option key={graph}>
                                        {graph}
                                    </option>
                                ))}
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="col-md-12 offset-md-8">
                            {this.state.graphType === "bar" && <img src={bar} alt="check" height="100" width="100" className="imgTx"></img> }
                            {this.state.graphType === "pie" && <img src={pie} alt="check" height="100" width="100" className="imgTx"></img> }
                            {this.state.graphType === "scatter" && <img src={scatter} alt="check" height="100" width="100" className="imgTx"></img> }
                            {this.state.graphType === "line" && <img src={line} alt="check" height="100" width="100" className="imgTx"></img> }
                            {this.state.graphType === "mixed" && <img src={mixed} alt="check" height="100" width="100" className="imgTx"></img> }
                            {this.state.graphType === "bubble" && <img src={bubble} alt="check" height="100" width="100" className="imgTx"></img> }
                            {this.state.graphType === "horizontalBar" && <img src={horizontalbar} alt="check" height="100" width="100" className="imgTx"></img> }
                            {this.state.graphType === "stackedBar" && <img src={stacked} alt="check" height="100" width="100" className="imgTx"></img> }
                            {this.state.graphType === "stackedHorizontalBar" && <img src={horizontalStacked} alt="check" height="100" width="100" className="imgTx"></img> }
                            {this.state.graphType === "radar" && <img src={radar} alt="check" height="100" width="100" className="imgTx"></img> }
                            {this.state.graphType === "doughnut" && <img src={doughnut} alt="check" height="100" width="100" className="imgTx"></img> }
                            {this.state.graphType === "graphPie" && <img src={graphPie} alt="check" height="100" width="100" className="imgTx"></img> }
                            {this.state.graphType === "barPie" && <img src={graphPie} alt="check" height="100" width="100" className="imgTx"></img> }
                            {this.state.graphType === "graphTable" && <img src={bartable} alt="check" height="100" width="100" className="imgTx"></img> }
                            {this.state.graphType === "twoHorizontalBar" && <img src={twohorizontalbar} alt="check" height="100" width="100" className="imgTx"></img> } 
                            {this.state.graphType === "twoBar" && <img src={twobar} alt="check" height="100" width="100" className="imgTx"></img> }
                        </div>
                        <div className="col-md-12">
                            <Form.Group>
                                <Form.Label>
                                    Heading
                                </Form.Label>
                                <Form.Control type="text" placeholder="Add heading" value={this.state.heading} onChange={(evt) => {
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
                                <Form.Control autoFocus="textarea" placeholder="Add description" value={this.state.description} onChange={(evt) => {
                                    this.setState({description:evt.target.value});
                                }}>
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="col-md-12">
                            <Form.Group>
                                <Form.Label>
                                    source
                                </Form.Label>
                                <Form.Control as="textarea" placeholder="Add source" value={this.state.source} onChange={(evt) => {
                                    this.setState({source:evt.target.value});
                                }}>

                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="col-md-12">
                            <Form.Group>
                                <Form.Label>
                                    Upload type
                                </Form.Label>
                                <Form.Control as="select" value={this.state.uploadType} onChange={this.onUploadType}>
                                    {this.state && this.state.uploadTypes && this.state.uploadTypes.map((uploadType, index) => (
                                        <option key={uploadType._id}>
                                            {uploadType.typeName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div>    
                            {this.state.show && <div>
                                <Form.Group>
                                    <Form.Label>
                                        Add File
                                    </Form.Label>
                                    <Form.Control required type="file" placeholder="Add File"  accept=".csv" onChange={(evt) => {
                                        this.setState({file:evt.target.files[0]});
                                    }}>
                                    </Form.Control>
                                </Form.Group>
                            </div>}
                        </div>
                        <div>
                            {this.state.showNumberOfColumn && <div>
                                <Form.Group>
                                    <Form.Label>
                                        Numbers of Columns
                                    </Form.Label>
                                    <Form.Control required type="number" pattern="[0-9]*" placeholder="Number of column" value={this.state.columnCount} onChange={(evt) => {
                                        this.setState({columnCount:evt.target.value});
                                    }}>
                                    </Form.Control>
                                </Form.Group>    
                            </div>}
                        </div>
                        <div className="col-md-12 text-right">
                            <Button type="submit" varient="primary">
                                Add Graph
                            </Button>
                        </div>
                        
                    
                </div>}
                { this.state.showManual &&
                    <AddDataManual columnCount={this.state.columnCount} onSubmit={this.handleManualForm} />
                }
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    fileUrl:state.list
});

const mapDispatchToProps = dispatch => ({
    uploadImage:(v) => dispatch(actions.uploadImage(v)),
    addData:(v) => dispatch(actions.addData(v)),
    graphTypes:(v) => dispatch(actions.graphTypes(v))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddGraph));
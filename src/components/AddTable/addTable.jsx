import React, { Component } from 'react';

import { Form,Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import actions from './../../store/Actions/index.js';
import AddDataManual from './../AddDataManual/addDataManual';

class AddTable extends Component{
    state={
        heading:"",
        description:"",
        file:null,
        showManual:false,
        uploadTypes:[{
            _id:"1",typeName:"file",
            }
            ,{
                _id:"2",typeName:"manual"
            }
        ],
        columnCount:"",
        selectedType:"file",
        show:true,
        showForm:true,
        showNumberOfColumn:false,
        source:""
    }
    onSubmit = async(evt) => {
        evt.preventDefault();
        if(this.state.selectedType === "file"){
            await this.props.uploadImage({
                image:this.state.file,
                type:"table"
            });
            await this.saveData();
            this.props.onSave();
        }else{
            this.setState({showForm:false});
            this.setState({showManual:true});
        }
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

    handleManualForm = async(data) => {
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
        if(dataArr.length > 0){
            await this.saveData(dataArr)
        }
    }

    saveData = async(data) => {
        console.log("this state source",this.state.source);
        await this.props.addData({
            reportId:this.props.reportId,
            sectionId:this.props.sectionId,
            dataType:"table",
            heading:this.state.heading,
            description:this.state.description,
            dataObj:this.props.fileUrl.list.jsonData ? this.props.fileUrl.list.jsonData : data,
            chapterId:this.props.chapterId,
            source:this.state.source
        });
        this.props.onSave();
    }
    render(){
        return(
            <div>
                <Form onSubmit={this.onSubmit}>
                    {this.state.showForm && <div>
                        <div>
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
                        <div>
                            <Form.Group>
                                <Form.Label>
                                    Description
                                </Form.Label>    
                                <Form.Control as="textarea" placeholder="Add description" value={this.state.description} onChange={(evt) => {
                                    this.setState({description:evt.target.value});
                                }}>
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group>
                                <Form.Label>
                                    Source
                                </Form.Label>
                                <Form.Control as="textarea" placeholder="Add source" value={this.state.source} onChange={(evt) => {
                                    this.setState({source:evt.target.value});
                                }}>
           
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group>
                                <Form.Label>
                                    Select Upload Type
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
                                        Upload File
                                    </Form.Label>
                                    <Form.Control required type="file" placeholder="Upload image" accept=".csv" onChange={(evt) => {
                                        this.setState({file:evt.target.files[0]});
                                    }}>
                                    </Form.Control>
                                </Form.Group>
                                </div>
                            }
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
                            <Button varient="primary" type="submit">
                                Fill the data
                            </Button>
                        </div>
                    </div>
                    }
                    { this.state.showManual &&
                        <AddDataManual columnCount={this.state.columnCount} onSubmit={this.handleManualForm} />
                    }
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    fileUrl:state
});


const mapDispatchToProps = dispatch => ({
    uploadImage:(v) => dispatch(actions.uploadImage(v)),
    addData:(v) => dispatch(actions.addData(v))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddTable));
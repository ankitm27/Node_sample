import React, {Component} from 'react';
import { Form,Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from './../../store/Actions/index.js';

class AddCost extends Component{
    onSubmit=async(evt) => {
        evt.preventDefault();
        // await this.props.addCost({sectionId:this.props.sectionId,cost:this.state.cost});
        await this.props.addFullCost({reportId:this.props.reportId,cost:this.state.cost});
        this.props.onSave();
    }

    state={
        cost:"",
        cost1:""
    }

    async componentDidMount(){
        await this.props.cost({reportId:this.props.reportId});
        this.setState({cost1:this.props.sections.list.cost});
    }
    
    render(){
        return(
            <div>
                <Form onSubmit={this.onSubmit}>
                <Form.Group>
                        <Form.Label>
                            Cost
                        </Form.Label>
                        <Form.Control type="text" value={this.state.cost1} readOnly>
                        </Form.Control> 
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>
                            Cost
                        </Form.Label>
                        <Form.Control type="text" required value={this.state.cost} onChange={(evt) =>{
                            this.setState({cost:evt.target.value});
                        }}>
                        </Form.Control> 
                    </Form.Group>
                    <Button varient="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    sections:state
});

const mapDispatchToProps = dispatch => ({
    addCost:(v) => dispatch(actions.addCost(v)),
    addFullCost:(v) => dispatch(actions.addFullCost(v)),
    cost:(v) => dispatch(actions.cost(v))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddCost));
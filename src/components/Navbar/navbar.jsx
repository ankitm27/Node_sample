import React, { Component } from 'react';
import Logo from './logo_insightmonk.png'
import { Link } from "react-router-dom";
import './navbar.css';


import { DropdownButton, Dropdown } from 'react-bootstrap';
import { connect } from "react-redux";
import { withRouter } from "react-router";


class Navbar1 extends Component {
    constructor() {
        super();
        this.state = {
            title: 'Admin',
            subTitle: 'Panel',
        };
    }

    showData = async() => {
        
        
    }

    onClick = async() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        this.props.history.push({
            pathname:"/login"
        });
    }

    onBrandClick = () => {
        this.props.history.push({
            pathname:"/"
        })
    };
    
    render() {
        return (
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                <h5 className="my-0 mr-md-auto font-weight-normal" style={{cursor: 'pointer'}} onClick={this.onBrandClick}><img height={50} src={Logo} /></h5>
                <nav className="my-2 my-md-0 mr-md-3">
                    <Link to="/" style={{borderRight: '1px solid #cfcfcf'}} className="p-2 text-dark">Reports</Link>
                    <Link to="/scrappers" className="p-2 text-dark" href="#">Scrappers</Link>
                </nav>
                <DropdownButton alignRight bsPrefix="btn btn-outline-primary" id="dropdown-item-button" title="Action">
                  {/* <Dropdown.Item as="button" onClick={this.showData}>Profile</Dropdown.Item> */}
                  <Dropdown.Item as="button" onClick={this.onClick}>Logout</Dropdown.Item>
                </DropdownButton>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    auth:state.auth
});

export default withRouter(connect(mapStateToProps)(Navbar1));
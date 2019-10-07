import React from 'react';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon
} from "mdbreact";

export default class DepartmentHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            activeItem: '1',
            isOpen: false
        }
    }
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    logout = () => {
        localStorage.clear();
    }

    render() {
        return (
            <MDBNavbar color="default-color" dark expand="md">
                <MDBNavbarBrand>
                    <div className="white-text">Name:
                        {this.props.userDetails ?
                            (this.props.userDetails.fullName ?
                                this.props.userDetails.fullName : '') :
                            ''}
                    </div>
                    <div className="white-text">Department:
                        {this.props.userDetails ?
                            (this.props.userDetails.departmentName ?
                                this.props.userDetails.departmentName : '') :
                            ''}
                    </div>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBNavLink className="waves-effect waves-light" to="#!">
                                <MDBIcon fab icon="twitter" />
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink className="waves-effect waves-light" to="#!">
                                <MDBIcon fab icon="google-plus-g" />
                            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink className="waves-effect waves-light" to="/auth" onClick={this.logout}>
                                {/* <MDBIcon fab icon="google-plus-g" /> */}
                                {/* <MDBIcon icon="user" /> */}
                                <MDBIcon icon="power-off" />
                            </MDBNavLink>
                        </MDBNavItem>
                        {/* <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav>
                                    <MDBIcon icon="user" />
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem> */}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar >

        );
    }
}
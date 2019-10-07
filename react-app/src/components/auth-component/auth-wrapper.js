import React from 'react';
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import 'react-tabs/style/react-tabs.css'
import Login from './login';
import Register from './register';

export default class AuthWrapper extends React.Component {
    constructor() {
        super();
        this.state = {
            activeItem: '1'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    render() {
        const { activeItem } = this.state;
        // const classes = useStyles;
        return (

            <div>

                <MDBContainer style={{ width: "60rem" }}>
                    <div>
                        <MDBNav className="nav-tabs mt-5">
                            <MDBNavItem>
                                <MDBNavLink to="#" active={activeItem === "1"} onClick={this.toggle("1")} role="tab" >
                                    Login
                            </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="#" active={activeItem === "2"} onClick={this.toggle("2")} role="tab" >
                                    Register
                        </MDBNavLink>
                            </MDBNavItem>
                        </MDBNav>
                        <MDBTabContent activeItem={activeItem} >
                            <MDBTabPane tabId="1" role="tabpanel">
                                <p className="mt-2">
                                    <Login />
                                </p>
                            </MDBTabPane>
                            <MDBTabPane tabId="2" role="tabpanel">
                                <p className="mt-2">
                                    <Register />
                                </p>
                            </MDBTabPane>
                        </MDBTabContent>
                    </div>
                </MDBContainer>
            </div>
        )
    }
}

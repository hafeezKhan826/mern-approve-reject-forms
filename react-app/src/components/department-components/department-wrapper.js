import React, { Fragment } from 'react';
import DepartmentHeader from "../commons/header/department-header";
import CardsLayout from "./cards-layout";
import FormModal from './form-modal';
import { Redirect } from 'react-router';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import axios from 'axios';
const port = 'http://localhost:8000/';

export default class DepartmentWrapper extends React.Component {
    constructor() {
        super();
        this.state = {
            routeToAuth: false,
            userDetails: {}
        }
        const userid = localStorage.getItem('userid');
        const token = localStorage.getItem('token');
        if (!(userid && token)) {

            this.setState({
                routeToAuth: true
            })
        }

    }
    componentDidMount() {
        const userid = localStorage.getItem('userid');
        const token = localStorage.getItem('token');

        if (userid && token) {
            axios
                .get(port + 'users/get-users-details', { headers: { token, userid } })
                .then((result) => {
                    this.setState({
                        userDetails: result.data.user
                    })
                })
                .catch((err) => console.log({ err }))
        } else {
            this.setState({
                routeToAuth: true
            })
        }

    }
    render() {
        const { userDetails, routeToAuth } = this.state;
        return (

            <div>
                {routeToAuth ?
                    <Redirect to='/auth' /> :
                    <Fragment>
                        <DepartmentHeader userDetails={userDetails} />
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol size="9">
                                    {userDetails.departmentId ?
                                        <CardsLayout departmentId={userDetails.departmentId} /> :
                                        ''
                                    }
                                </MDBCol>
                                <MDBCol size="3"><FormModal /></MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </Fragment>
                }
            </div>
        )
    }
}
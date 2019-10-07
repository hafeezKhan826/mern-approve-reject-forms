import React, { Fragment } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import axios from 'axios';
// import Dialog from './dialog';

const port = 'http://localhost:8000/';
const Card = (props) => {

    const userid = localStorage.getItem('userid') || '5d83b81f45286b1e90ee4b25';
    const acceptForm = (formId) => {
        const payload = {
            formId,
            acceptStatus: 'accepted',
            showNotification: false
        }
        submitAcceptance(payload);
    }

    const rejectForm = (formId) => {
        const payload = {
            formId,
            acceptStatus: 'rejected'
        }
        submitAcceptance(payload);
    }

    const submitAcceptance = (payload) => {
        if (payload) {
            axios
                .post(port + 'form/accept-reject', payload, { headers: { userid } })
                .then((result) => {
                    console.log(result);
                    alert(result.data.message)
                    window.location.reload();
                    return ''
                })
                .catch((err) => console.log(err))
        }
    }
    const { param } = props;
    return (
        <MDBCard style={{ width: "22rem", margin: '0px 20px 20px 0px' }}>
            <MDBCardBody>

                <MDBCardTitle><h1>{param.title ? param.title : 'Card title'}</h1></MDBCardTitle>
                <MDBCardText>
                    <p>
                        {param.message}
                    </p>
                </MDBCardText>

                <div>
                    <b> Accepted Status </b> : {param.status}
                </div>
                <div>
                    <b> Assigned To </b> : {param.assignedUser}
                </div>
                <div>
                    <b> Created By </b> : {param.createdByUser}
                </div>
                {
                    param.userAssignedTo === userid ?
                        param.status === 'pending' ?
                            <Fragment>
                                <Fragment>
                                    <MDBBtn onClick={() => acceptForm(param._id)}>Accept</MDBBtn>
                                    <MDBBtn onClick={() => rejectForm(param._id)}>Reject</MDBBtn>
                                </Fragment>
                            </Fragment>
                            : '' : ''
                }
            </MDBCardBody>
        </MDBCard >
    )
}

export default Card;
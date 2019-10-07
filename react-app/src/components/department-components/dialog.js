import React, { Fragment } from 'react';
import { MDBBtn, MDBNotification, MDBCard, MDBContainer, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';

let notification = '';
const Dialog = (props) => {

    const { param } = props;
    console.log('Dialog called');
    return (
        <MDBNotification
            show
            fade
            iconClassName="text-primary"
            title="Alerts"
            message={param}
        />
    )
}

export default Dialog;
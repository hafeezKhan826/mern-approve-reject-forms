import React from 'react';
// import $ from 'jquery';
// import axios from 'axios';
// import { Helmet } from "react-helmet";
import Header from '../commons/header/header';
export default class FormWrapper extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Header />
                <h1>Form Wrapper</h1>
                <form onSubmit={this.handleSubmit}>
                </form>
            </div>
        )
    }
}

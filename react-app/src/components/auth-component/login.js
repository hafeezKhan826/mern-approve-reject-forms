import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBBtn, MDBInput } from 'mdbreact';
const port = 'http://localhost:8000/';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            enableRouter: false,
            messages: ''
        }
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        let input = event.target;
        this.setState({ [input.name]: input.value });
    }
    handleLoginSubmit(event) {
        event.preventDefault();
        const { email, password } = this.state;
        axios
            .post(port + 'auth/login', { email, password })
            .then((result) => {
                if (result.data.status == 'success') {
                    localStorage.setItem('userid', result.data.user._id)
                    localStorage.setItem('token', result.data.token)
                    this.setState({
                        enableRouter: true
                    })
                } else if (result.data.status == 'error') {
                    this.setState({
                        messages: result.data.message
                    })
                }
            }).catch((err) => console.log(err))

        setTimeout(() => {
            this.setState({
                messages: ''
            })
        }, 3000);

    }
    render() {
        const { email, password, enableRouter, messages } = this.state;
        return (
            <div>
                <MDBContainer className='d-flex justify-content-center'>
                    <MDBRow>
                        <form onSubmit={this.handleLoginSubmit}>
                            <p className="h5 text-center mb-4">Login in</p>
                            <div className="grey-text">
                                <MDBInput
                                    label="Your email"
                                    icon="envelope"
                                    group
                                    onChange={this.handleChange}
                                    type="email"
                                    value={email}
                                    validate
                                    name='email'
                                    error="wrong"
                                    success="right"
                                    autoFocus={true}
                                />
                                <MDBInput
                                    label="Your password"
                                    icon="lock"
                                    onChange={this.handleChange}
                                    group
                                    value={password}
                                    type="password"
                                    name='password'
                                    validate
                                />
                            </div>
                            <div className="text-center">
                                <MDBBtn color="primary" type='submit'>Login</MDBBtn>
                            </div>
                            <h4><b>{messages}</b></h4>
                        </form>
                    </MDBRow>
                </MDBContainer>
                {enableRouter ?
                    <Redirect to='/department' /> :
                    ""}
            </div>
        )
    }
}

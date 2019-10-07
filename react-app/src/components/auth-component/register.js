import React from 'react';
import {
    MDBContainer, MDBRow, MDBBtn, MDBInput, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle
} from 'mdbreact';
import { Redirect } from 'react-router';
import axios from 'axios';
const port = 'http://localhost:8000/';
export default class Register extends React.Component {
    constructor(props) {
        super();
        this.state = {
            fullName: '',
            role: '',
            email: '',
            departments: [],
            password: '',
            messages: '',
            enableRouter: false,
            dropdownText: 'Select Department'
        }
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isValid = this.isValid.bind(this);
        this.setRole = this.setRole.bind(this);

    }
    handleChange(event) {
        let input = event.target;
        this.setState({ [input.name]: input.value });
    }
    setRole(role, dropdownText) {
        this.setState({ role, dropdownText })
    }
    componentDidMount() {
        axios.get(port + 'department/all-departments')
            .then((result) => {
                const departments = result.data.departments ? result.data.departments : []
                this.setState({ departments })
            })
            .catch(err => console.log(err))
    }
    handleRegisterSubmit(event) {
        event.preventDefault();
        const { email, password, role, fullName, confirmPassword } = this.state;
        const formValues = {
            email, password, departmentId: role, fullName, confirmPassword
        };
        if (this.isValid(formValues)) {
            axios.post(port + 'users/add-user', formValues)
                .then((result) => {
                    console.log('Gettting a reponse', result);
                    localStorage.setItem('userid', result.data.user._id)
                    localStorage.setItem('token', result.data.token)
                    this.setState({
                        messages: result.data.message,
                        enableRouter: true
                    })
                })
                .catch((err) => {
                    console.log('Gettting error', err);
                })
        }
        setTimeout(() => {
            this.setState({
                messages: ''
            })
        }, 3000);
    }

    isValid = (values) => Object.values(values).every(val => val !== '')

    render() {
        const { email, password, fullName, confirmPassword, departments, messages, dropdownText, enableRouter } = this.state;
        return (
            <div>
                {/* <MDBCol>
                    <MDBCard style={{ width: "22rem" }}>
                        <MDBCardBody> */}
                <MDBContainer className='d-flex justify-content-center'>
                    <MDBRow>
                        <form onSubmit={this.handleRegisterSubmit}>
                            <p className="h5 text-center mb-4">Sign up</p>
                            <div className="grey-text">
                                <MDBInput
                                    label="Your Full Name"
                                    icon="user"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                    name="fullName"
                                    onChange={this.handleChange}
                                    value={fullName}
                                    autoFocus={true}
                                />
                                <MDBInput
                                    label="Your email"
                                    icon="envelope"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={email}
                                />
                                <MDBInput
                                    label="Your password"
                                    icon="lock"
                                    group
                                    type="password"
                                    validate
                                    name="password"
                                    onChange={this.handleChange}
                                    value={password}
                                />
                                <MDBInput
                                    label="Confirm password"
                                    icon="lock"
                                    group
                                    type="password"
                                    validate
                                    name="confirmPassword"
                                    onChange={this.handleChange}
                                    value={confirmPassword}
                                />
                                <MDBDropdown>
                                    <MDBDropdownToggle caret color="primary">
                                        {dropdownText}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu basic>
                                        {departments.length > 0 ?
                                            departments.map((dept) => <MDBDropdownItem onClick={() => this.setRole(dept.departmentId, dept.name)} key={dept._id}>{dept.name}</MDBDropdownItem>) : ''}
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </div>
                            <div className="text-center">
                                <MDBBtn color="primary" type='submit'>Register</MDBBtn>
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

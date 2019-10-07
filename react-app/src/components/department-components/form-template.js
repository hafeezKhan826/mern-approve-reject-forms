import React from 'react';
import axios from 'axios';
import {
    MDBContainer, MDBRow, MDBBtn, MDBInput, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle
} from 'mdbreact';
const port = 'http://localhost:8000/';
const userid = localStorage.getItem('userid') || '5d83b81f45286b1e90ee4b25';

export default class FormTemplate extends React.Component {
    constructor(props) {
        super();
        this.state = {
            title: '',
            message: '',
            departmentId: '',
            userAssignedTo: '',
            departments: [],
            users: [],
            usersEnabled: true
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        axios.get(port + 'department/all-departments')
            .then((result) => {
                const departments = result.data.departments ? result.data.departments : []
                this.setState({ departments })
                console.log(result.data.departments);
            })
            .catch(err => console.log(err))
    }

    getUsersFromDept(deptId) {
        this.setState({
            departmentId: deptId
        })
        axios.get(port + 'users/get-users-from-dept?deptId=' + deptId)
            .then((result) => {
                const users = result.data.users ? result.data.users : []
                this.setState({ users })
                console.log(result.data.users);
            })
            .catch(err => console.log(err))
    }
    setUser(userId) {
        this.setState({
            userAssignedTo: userId
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        const { departmentId, userAssignedTo, message, title } = this.state;
        let payload = {
            departmentId,
            userAssignedTo,
            message,
            title,
            createdBy: userid,
            status: 'pending'
        }
        axios.post(port + 'form/submit-form', payload, { headers: { userid } })
            .then((result) => {
                alert(result.data.message);
                window.location.reload();
            })
            .catch((err) => console.log({ err }))
    }
    handleChange(event) {
        let input = event.target;
        this.setState({ [input.name]: input.value });
    }
    render() {
        const { title, message, departments, usersEnabled, users } = this.state;
        return (
            <MDBContainer className='d-flex justify-content-center'>
                <MDBRow>
                    <form onSubmit={this.handleSubmit}>
                        <div className="grey-text">
                            <MDBInput
                                label="Title of the message"
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                name="title"
                                onChange={this.handleChange}
                                value={title}
                                autoFocus={true}
                            />
                            <MDBInput
                                label="Your message"
                                group
                                type="textarea"
                                rows='5'
                                validate
                                error="wrong"
                                success="right"
                                name="message"
                                onChange={this.handleChange}
                                value={message}
                            />

                            <MDBDropdown>
                                <MDBDropdownToggle caret color="default">
                                    Select Department
                                    </MDBDropdownToggle>
                                <MDBDropdownMenu basic>
                                    {departments.length > 0 ?
                                        departments.map((dept) => <MDBDropdownItem onClick={() => this.getUsersFromDept(dept.departmentId)} key={dept._id}>{dept.name}</MDBDropdownItem>) : ''}
                                    {/* <MDBDropdownItem divider />
                                    <MDBDropdownItem active onClick={this.addNewDepartment}>Add New Department</MDBDropdownItem> */}
                                </MDBDropdownMenu>
                            </MDBDropdown>

                            <MDBDropdown disabled={usersEnabled}>
                                <MDBDropdownToggle caret color="default">
                                    Select User
                                    </MDBDropdownToggle>
                                <MDBDropdownMenu basic>
                                    {users.length > 0 ?
                                        users.map((user) => <MDBDropdownItem onClick={() => this.setUser(user._id)} key={user._id}>{user.fullName}</MDBDropdownItem>) : ''}
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </div>
                        <div className="text-center">
                            <MDBBtn type='submit'>Send</MDBBtn>
                        </div>
                    </form>
                </MDBRow>
            </MDBContainer>
        )
    }
}
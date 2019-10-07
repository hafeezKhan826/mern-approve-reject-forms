import React from 'react';
import { MDBRow, MDBContainer } from 'mdbreact';
import axios from 'axios';
import Card from './card';
const port = 'http://localhost:8000/';
const userid = localStorage.getItem('userid');
const token = localStorage.getItem('token');

export default class CardsLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            cards: []
        }
    }
    componentDidMount() {
        const { departmentId } = this.props;
        axios.get(port + 'form/get-all-dept-forms?departmentId=' + departmentId, {
            headers: { userid, token }
        })
            .then((result) => {
                if (result.data.forms) {
                    this.setState({
                        cards: result.data.forms
                    })
                }
            })
            .catch(err => console.log({ err }))

    }

    render() {
        const forms = this.state.cards;
        return (
            <div>
                <MDBContainer>
                    <MDBRow>
                        {forms.length == 0 ?
                            <h1>No Forms found</h1> :
                            (forms.map((form) => <Card param={form} key={form._id} />))
                        }
                    </MDBRow>
                </MDBContainer>
            </div >
        )
    }
}
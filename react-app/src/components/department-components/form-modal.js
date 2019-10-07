import React from 'react';
import { Modal } from 'react-bootstrap'
import FormTemplate from './form-template'

export default class CardsLayout extends React.Component {

    constructor() {
        super();
        this.state = {
            modalOpen: false
        }
    }
    toggle = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    render() {

        return (
            <div>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Add a new form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormTemplate />
                    </Modal.Body>
                </Modal.Dialog>
            </div>)
    }
}
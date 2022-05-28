import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';

export default class InfoModal extends Component {
    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
    }
    
    onClose() {
        this.props.onCloseInfoModal();
    }

    render(){
        const title = this.props.title;
        const text = this.props.text;
        const closeMessage = this.props.closeMessage;

        return (
            <Modal show={this.props.show} centered style={{ whiteSpace: 'break-spaces' }}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {text}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onClose} variant="primary">{closeMessage}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}


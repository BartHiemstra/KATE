import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';
import info_text from './info_text.js';

export default class InfoModal extends Component {
    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);
    }
    
    onClose() {
        this.props.onCloseInfoModel();
    }

    render(){
        return (
            <Modal show={this.props.show} centered>
            <Modal.Header>
                <Modal.Title>{info_text[0].title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{info_text[0].body}</Modal.Body>
            <Modal.Footer>
            <Button onClick={this.onClose} variant="primary">Sluiten</Button>
            </Modal.Footer>
            </Modal>
        )
    }
}


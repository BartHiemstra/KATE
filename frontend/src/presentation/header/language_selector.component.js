import React from 'react';
import i18n from "i18next";
import { Dropdown, DropdownButton } from 'react-bootstrap';

class LanguageSelector extends React.Component {
    constructor(props) {
        super(props);

        this.onSwitchLanguage = this.onSwitchLanguage.bind(this);
    }

    onSwitchLanguage(lng) {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    }

    render() {
        return (
            <div className = 'ddown'>
            <DropdownButton variant='outline-primary' title= 'Language'>
                <Dropdown.Item onClick={() => this.onSwitchLanguage('en')}>EN</Dropdown.Item>
                <Dropdown.Item onClick={() => this.onSwitchLanguage('nl')}>NL</Dropdown.Item>
            </DropdownButton>
            </div>
        );
    }
}

export default LanguageSelector;
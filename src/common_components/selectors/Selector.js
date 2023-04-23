import React, { Component } from 'react';
import './selectors.css';
import Select from 'react-select';

const customStyles = {
    option: (provided) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
    }),
    control: (provided) => ({
        ...provided,
        width: 270,
    }),
    singleValue: (provided) => ({
        ...provided,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
};

class Selector extends Component {
    constructor(props) {
        super(props);

        const defaultValue = this.props.defaultValue;
        this.state = {
            selectedOption: props.options.find(
                (option) => option.value === defaultValue
            ),
        };
        console.log(this.state);
    }

    formatOptionLabel = (option) => (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <span>{option.title}</span>
            </div>
        </div>
    );

    handleOptionChange = (option) => {
        this.setState({ selectedOption: option });
        if (this.props.onSelect) {
            this.props.onSelect(option.value);
        }
    };

    getValue = () => {
        return this.state.selectedOption.value;
    };

    render() {
        const { title, options } = this.props;
        const { selectedOption } = this.state;

        return (
            <div className="custom-selector">
                <span>{title}</span>
                <Select
                    styles={customStyles}
                    value={selectedOption}
                    onChange={this.handleOptionChange}
                    options={options}
                    formatOptionLabel={this.formatOptionLabel}
                />
            </div>
        );
    }
}

export default Selector;
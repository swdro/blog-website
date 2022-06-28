import React from 'react';

const Dropdown = (props) => {

    const options = props.options.map(name => {
        return (
            <option key={name} value={name}>
                {name}
            </option>
        )
    });

    return (
        <>
            <div>
                {props.icon}
            </div>
            <div className="px-2">
                <select className="bg-white/0">
                    {options}
                </select>
            </div>
        </>
    );
};

export default Dropdown;
import React, { useState } from "react";

export default function Dropdown({ options, header, children, label, button, action, onChange, setSelectedItem }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(header);

    return (
        <div className="dropdown-div">
            <p className="dropdown-heading">{children}</p>
            <div className="dropdown">
                {/* Selected Option (Click to Toggle) */}
                <label className="dropdown-label">{label}</label>
                <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                    {selected}
                    <span className={`arrow ${isOpen ? "up" : "down"}`}>▼</span>
                </div>

                {/* Dropdown Options */}
                <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                    {options && options.map((item, index) => (
                        <li
                            key={item._id ? item._id : index}
                            className="dropdown-item"
                            onClick={() => {
                                setSelectedItem && setSelectedItem(item)
                                setSelected(item.name ? item.name : item.partyName);
                                setIsOpen(false);
                            }}
                        >
                            {item.name ? item.name : item.partyName ? item.partyName : item}
                        </li>
                    ))}
                    {button && (
                        <li className="dropdown-item" onClick={() => action()}>{button}</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

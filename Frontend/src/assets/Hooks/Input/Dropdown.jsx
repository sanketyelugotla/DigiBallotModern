import React, { useState } from "react";

export default function Dropdown({ options, header, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(header);

    return (
        <div className="dropdown-div">
            <p className="dropdown-heading">{children}</p>
            <div className="dropdown">
                {/* Selected Option (Click to Toggle) */}
                <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                    {selected}
                    <span className={`arrow ${isOpen ? "up" : "down"}`}>▼</span>
                </div>

                {/* Dropdown Options */}
                <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                    {options.map((item, index) => (
                        <li
                            key={index}
                            className="dropdown-item"
                            onClick={() => {
                                setSelected(item);
                                setIsOpen(false);
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

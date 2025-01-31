import React, { useState } from "react";
import "./MemberCarousel.css";
import data from "../../../Data/Candidates";

export default function CandidateDetails() {
    const [selectedIndex, setSelectedIndex] = useState(2);

    const handleShift = (direction) => {
        setSelectedIndex((prevIndex) => {
            if (direction === "left") {
                return (prevIndex - 1 + data.length) % data.length;
            } else {
                return (prevIndex + 1) % data.length;
            }
        });
    };

    return (
        <div className="carousel-container">
            <div className="carousel">
                {data.slice(0, 5).map((item, index) => {
                    // Position calculation for circular index
                    const position = (index - selectedIndex + 5) % 5; // Ensure position is within 0-4 range

                    return (
                        <div
                            key={item.name}
                            className={`member-circle position-${position}`}
                            onClick={() =>
                                handleShift(position === 0 ? "left" : position === 4 ? "right" : null)
                            }
                        >
                            <img src={item.img} alt={item.name}></img>
                            <p>{item.name}</p>
                        </div>
                    );
                })}
            </div>
            <button onClick={() => handleShift("left")}>Left</button>
            <button onClick={() => handleShift("right")}>Right</button>
        </div>
    );
}

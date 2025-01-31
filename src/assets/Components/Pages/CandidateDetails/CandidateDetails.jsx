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

    function check(position) {
        if (position == 1 || position == 0) {
            handleShift("left");
        } else if (position == 3 || position == 4) {
            handleShift("right")
        }
    }

    return (
        <div className="carousel-container">
            <button onClick={() => handleShift("right")}>Left</button>
            <div className="carousel">
                {data.slice(0, 5).map((item, index) => {
                    const position = (index - selectedIndex + 5) % 5;
                    return (
                        <>
                            <div
                                key={item.name}
                                className={`member-circle position-${position}`}
                                onClick={() => check(position)}
                            >
                                <img src={item.img} alt={item.name}></img>
                            </div>
                        </>
                    );
                })}
            </div>
            <button onClick={() => handleShift("left")}>Right</button>
        </div >
    );
}

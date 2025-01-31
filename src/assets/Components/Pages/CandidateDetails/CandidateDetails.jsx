import React, { useState } from "react";
import "./MemberCarousel.css";
import data from "../../../Data/Candidates"

const members = [
    { id: 1, name: "Member 1", image: "/images/member1.jpg" },
    { id: 2, name: "Member 2", image: "/images/member2.jpg" },
    { id: 3, name: "Member 3", image: "/images/member3.jpg" },
    { id: 4, name: "Member 4", image: "/images/member4.jpg" },
    { id: 5, name: "Member 5", image: "/images/member5.jpg" },
];

export default function CandidateDetails() {
    const [selectedIndex, setSelectedIndex] = useState(2);

    const handleShift = (direction) => {
        setSelectedIndex((prevIndex) => {
            if (direction === "left") {
                return (prevIndex - 1 + members.length) % members.length;
            } else {
                return (prevIndex + 1) % members.length;
            }
        });
    };

    return (
        <div className="carousel-container">
            <div className="carousel">
                {members.map((member, index) => {
                    const position = (index - selectedIndex + members.length) % members.length;
                    return (
                        <div
                            key={member.id}
                            className={`member-circle position-${position}`}
                            onClick={() => handleShift(position === 1 ? "right" : position === 4 ? "left" : null)}
                        >
                            <img src={member.image} alt={member.name} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

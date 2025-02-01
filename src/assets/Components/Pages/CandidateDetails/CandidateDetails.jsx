import React, { useEffect, useState } from "react";
import "./MemberCarousel.css";
import styleVote from "../Vote/Vote.module.css"
import data from "../../../Data/Candidates";
import Button from "../../Button/Button";

export default function CandidateDetails() {
    const [selectedIndex, setSelectedIndex] = useState(2);
    const [selectedData, setSelectedData] = useState(data[0]);

    const handleShift = (direction) => {
        setSelectedIndex((prevIndex) => {
            return direction === "left"
                ? (prevIndex - 1 + data.length) % data.length
                : (prevIndex + 1) % data.length;
        });
    };

    useEffect(() => {
        setSelectedData(data[(selectedIndex + 2) % data.length]);
    }, [selectedIndex]);

    function check(position) {
        if (position === 1 || position === 0) {
            handleShift("left");
        } else if (position === 3 || position === 4) {
            handleShift("right");
        }
    }

    return (
        <div className="candidateDetailsContainer">
            <h2>Members in your constituency</h2>
            <div className="carousel-container">
                <img src="./pics/prev.png" alt="Prev" onClick={() => handleShift("left")} />
                <div className="carousel">
                    {data.map((item, index) => {
                        const position = (index - selectedIndex + data.length) % data.length;
                        return (
                            <div
                                key={item.name}
                                className={`member-circle position-${position}`}
                                onClick={() => check(position)}
                            >
                                <img src={item.img} alt={item.name} />
                            </div>
                        );
                    })}
                    <div className="small_img_div">
                        <img id="small_img" src={selectedData.party_img} alt="" />
                    </div>
                </div>
                <img src="./pics/next.png" alt="Next" onClick={() => handleShift("right")} />
            </div>
            <div className="selected-info">
                <h2>{selectedData.name}</h2>
                <table className={styleVote.table} id="tab">
                    <thead>
                        <tr className={styleVote.row}>
                            <th id={styleVote.col} className={styleVote.col} colSpan="2">Personal Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styleVote.row}>
                            <td className={styleVote.col}>Party</td>
                            <td className={styleVote.col}>{selectedData.party}</td>
                        </tr>
                        <tr className={styleVote.row}>
                            <td className={styleVote.col}>S/O | D/O | W/O</td>
                            <td className={styleVote.col}>{selectedData.details.relation}</td>
                        </tr>
                        <tr className={styleVote.row}>
                            <td className={styleVote.col}>Age</td>
                            <td className={styleVote.col}>{selectedData.details.age}</td>
                        </tr>
                        <tr className={styleVote.row}>
                            <td className={styleVote.col}>Name in voter enrolment</td>
                            <td className={styleVote.col}>{selectedData.details.name_voter}</td>
                        </tr>
                        <tr className={styleVote.row}>
                            <td className={styleVote.col}>Self Profession</td>
                            <td className={styleVote.col}>{selectedData.details.self_profession}</td>
                        </tr>
                        <tr className={styleVote.row}>
                            <td className={styleVote.col}>Spouse Profession</td>
                            <td className={styleVote.col}>{selectedData.details.spouse_profession}</td>
                        </tr>
                        <tr className={styleVote.row}>
                            <td className={styleVote.col}>Assets</td>
                            <td className={styleVote.col}>{selectedData.details.assets}</td>
                        </tr>
                        <tr className={styleVote.row}>
                            <td className={styleVote.col}>Liabilities</td>
                            <td className={styleVote.col}>{selectedData.details.liabilities}</td>
                        </tr>
                        <tr className={styleVote.row}>
                            <td className={styleVote.col}>Education</td>
                            <td className={styleVote.col}>{selectedData.details.educational_details}</td>
                        </tr>
                        <tr className={styleVote.row}>
                            <td className={styleVote.col}>Manifesto</td>
                            <td className={styleVote.col}>
                                <center><a href={selectedData.details.manifesto} target="__blank"><Button>Download</Button></a></center>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

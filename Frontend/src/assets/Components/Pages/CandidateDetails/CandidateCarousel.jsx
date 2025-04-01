import React, { useContext, useEffect, useState } from 'react';
import { databaseContext } from '../../../Hooks/ContextProvider/ContextProvider';

export default function CandidateCarousel({ data, handleShift, selectedIndex, selectedData, check }) {
    const { database_url } = useContext(databaseContext);
    return (
        <div className="carousel-container">
            <img className="pn-btn" src="/pics/prev.png" alt="Prev" onClick={() => handleShift("left")} />
            <div className="carousel">
                {data.map((item, index) => {
                    // console.log(item)
                    let position = (index - selectedIndex + data.length) % data.length;
                    if (data.length === 1) position += 2;
                    else if (data.length === 2) position += 2;
                    else if (data.length === 3) position += 1;
                    return (
                        <div
                            key={item.name}
                            className={`member-circle position-${position}`}
                            onClick={() => check(position)}
                        >
                            <img src={`${database_url}/image/candidate/image/${item.image}`} alt={item.fullName} />
                        </div>
                    );
                })}
                {/* {console.log("Selected", selectedData)} */}
                <div className="small_img_div">
                    {selectedData && (
                        <img id="small_img" src={`${database_url}/image/party/image/${selectedData.partyId}`} alt={selectedData.partyName} />
                    )}
                </div>
            </div>
            <img className="pn-btn" src="/pics/next.png" alt="Next" onClick={() => handleShift("right")} />
        </div>
    );
}

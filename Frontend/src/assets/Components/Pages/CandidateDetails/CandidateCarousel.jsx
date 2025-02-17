import React, { useContext, useEffect, useState } from 'react';
import { databaseContext } from '../../../Hooks/ContextProvider/ContextProvider';

export default function CandidateCarousel({ data, handleShift, selectedIndex, selectedData, check }) {
    const { database_url } = useContext(databaseContext);

    return (
        <div className="carousel-container">
            <img className="pn-btn" src="./pics/prev.png" alt="Prev" onClick={() => handleShift("left")} />
            <div className="carousel">
                {data.map((item, index) => {
                    const position = (index - selectedIndex + data.length) % data.length;
                    return (
                        <div
                            key={item.name}
                            className={`member-circle position-${position}`}
                            onClick={() => check(position)}
                        >
                            <img src={`${database_url}/candidates/image/${item.image}`} alt={item.fullName} />
                        </div>
                    );
                })}
                <div className="small_img_div">
                    {selectedData && (
                        <img id="small_img" src={`${database_url}/party/image/${selectedData.partyId}`} alt="Party" />
                    )}
                </div>
            </div>
            <img className="pn-btn" src="./pics/next.png" alt="Next" onClick={() => handleShift("right")} />
        </div>
    );
}

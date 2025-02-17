import React, { useContext, useEffect, useState } from "react";
import "./MemberCarousel.css";
import { databaseContext } from "../../../Hooks/ContextProvider/ContextProvider";
import CandidateTable from "./CandidateTable";
import CandidateCarousel from "./CandidateCarousel";

export default function CandidateDetails() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [candidatesData, setCandidatesData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const { database_url } = useContext(databaseContext);
    const [party, setParty] = useState(null);

    const handleShift = (direction) => {
        setSelectedIndex((prevIndex) => {
            return direction === "left"
                ? (prevIndex - 1 + candidatesData.length) % candidatesData.length
                : (prevIndex + 1) % candidatesData.length;
        });
    };

    async function fetchCandidates() {
        try {
            const response = await fetch(`${database_url}/candidates`);
            const res = await response.json();
            console.log("Fetched candidates:", res);
            setCandidatesData(res);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    }

    async function fetchParty(partyId) {
        if (!partyId) {
            console.warn("fetchParty called with null partyId");
            return;
        }

        try {
            console.log(`Fetching party for partyId: ${partyId}`);
            const response = await fetch(`${database_url}/party/${partyId}`);
            const res = await response.json();
            console.log("Fetched party:", res);
            setParty(res);
        } catch (error) {
            console.error("Error fetching party:", error);
        }
    }

    useEffect(() => {
        fetchCandidates();
    }, [database_url]);

    useEffect(() => {
        if (candidatesData.length > 0) {
            const selected = candidatesData[(selectedIndex + 2) % candidatesData.length];
            console.log("Selected candidate:", selected);
            setSelectedData(selected);
        }
    }, [selectedIndex, candidatesData]);

    useEffect(() => {
        if (selectedData && selectedData.partyId) {
            fetchParty(selectedData.partyId);
        } else {
            console.warn("No partyId found in selectedData");
        }
    }, [selectedData]);

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
            {candidatesData.length > 0 ? (
                <>
                    <CandidateCarousel
                        data={candidatesData}
                        handleShift={handleShift}
                        selectedIndex={selectedIndex}
                        selectedData={selectedData}
                        check={check}
                    />
                    {selectedData && party ? (
                        <CandidateTable selectedData={selectedData} party={party} />
                    ) : (
                        <p>Loading candidate details...</p>
                    )}
                </>
            ) : (
                <p>Loading candidates...</p>
            )}
        </div>
    );

}



// setSelectedData(candidatesData[(selectedIndex + 2) % candidatesData.length]);
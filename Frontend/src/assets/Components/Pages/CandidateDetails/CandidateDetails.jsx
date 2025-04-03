import React, { useContext, useEffect, useState } from "react";
import "./MemberCarousel.css";
import { databaseContext, electionDetails, loadingContext } from "../../../Hooks/ContextProvider/ContextProvider";
import CandidateTable from "./CandidateTable";
import CandidateCarousel from "./CandidateCarousel";

export default function CandidateDetails() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [candidatesData, setCandidatesData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const { database_url } = useContext(databaseContext);
    const { selectedElection, setSelectedElection } = useContext(electionDetails);
    const [party, setParty] = useState(null);
    const token = localStorage.getItem("authToken");
    const { setLoading } = useContext(loadingContext)

    const handleShift = (direction) => {
        setSelectedIndex((prevIndex) => {
            return direction === "left"
                ? (prevIndex - 1 + candidatesData.length) % candidatesData.length
                : (prevIndex + 1) % candidatesData.length;
        });
    };

    async function fetchCandidates() {
        try {
            setLoading(true);
            const response = await fetch(`${database_url}/candidates/${selectedElection._id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const res = await response.json();
            // console.log("Fetched candidates:", res);
            setCandidatesData(res);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchParty(partyId) {
        setLoading(true);
        if (!partyId) {
            console.warn("fetchParty called with null partyId");
            setLoading(false);
            return;
        }

        try {
            // console.log(`Fetching party for partyId: ${partyId}`);
            const response = await fetch(`${database_url}/party/${partyId}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const res = await response.json();
            // console.log("Fetched party:", res);
            setParty(res);
        } catch (error) {
            console.error("Error fetching party:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCandidates();
    }, [database_url]);

    useEffect(() => {
        if (candidatesData.length > 0) {
            let ind = selectedIndex;
            if (candidatesData.length === 3) ind += 1;
            else if (candidatesData.length > 3) ind += 2;
            let selected = candidatesData[(ind) % candidatesData.length];
            // console.log("Selected candidate:", selected);
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
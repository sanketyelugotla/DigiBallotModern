import React, { useContext, useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell
} from "recharts";
import styleResults from "./Results.module.css";
import { getTotal } from "../../../Data/Results";
import { databaseContext, electionDetails, loadingContext } from "../../../Hooks/ContextProvider/ContextProvider";
import { toast } from "react-toastify";

export default function Results() {
    const colors = ["#1e3a8a", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
    const { database_url } = useContext(databaseContext);
    const { selectedElection } = useContext(electionDetails);
    const [votes, setVotes] = useState([]);
    const token = localStorage.getItem("authToken");
    const { setLoading } = useContext(loadingContext)

    const totalVotes = votes.reduce((acc, curr) => acc + curr.votes, 0);

    async function fetchVotes() {
        try {
            setLoading(true);
            const response = await fetch(`${database_url}/voter/getVotes/${selectedElection._id}`, {
                headers: { "Authorization": `Bearer ${token}` },
                method: "POST",
            });
            const res = await response.json();
            if (res.success) {
                if (!res.votes || res.votes.length === 0) {
                    toast.warn("No votes found")
                    setVotes([]);
                    return;
                }

                // Fetch candidate details for each vote
                const candidatesWithVotes = await Promise.all(
                    res.votes.map(async (vote) => {
                        console.log(vote)
                        const candidateResponse = await fetch(`${database_url}/candidates/get/${vote._id}`, {
                            headers: { "Authorization": `Bearer ${token}` }
                        });
                        const candidateData = await candidateResponse.json();
                        console.log(candidateData)
                        return {
                            name: candidateData.fullName,
                            votes: vote.votes,
                        };
                    })
                );
                setVotes(candidatesWithVotes);
            } else {
                toast.warn("Error fetching votes", res.message);
            }
        } catch (error) {
            toast.error("Error fetching votes:", error.message);
            console.error("Error fetching votes:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (selectedElection) {
            fetchVotes();
        }
    }, [database_url, selectedElection]);

    const formattedData = votes.map((item, index) => ({
        name: item.name,
        votes: item.votes,
        percentage: ((item.votes / totalVotes) * 100).toFixed(1),
    }));

    if (formattedData.length === 0) {
        return <p>No data available to display the chart.</p>;
    }

    // Custom Tooltip
    const CustomTooltip = ({ payload }) => {
        if (!payload || payload.length === 0) return null;
        const { name, votes, percentage } = payload[0].payload;
        return (
            <div className={styleResults.tooltipContainer}>
                <p><strong>{name}</strong></p>
                <p>Votes: {votes}</p>
                <p>Percentage: {percentage}%</p>
            </div>
        );
    };

    // Custom Legend
    const renderLegend = () => {
        return formattedData.map((entry, index) => (
            <div key={`legend-${index}`} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                <div
                    style={{
                        width: "15px",
                        height: "15px",
                        backgroundColor: colors[index % colors.length],
                        marginRight: "8px",
                        borderRadius: "4px",
                    }}
                />
                <span style={{ fontSize: "14px", color: "var(--text_color)" }}>{entry.name}</span>
            </div>
        ));
    };

    return (
        <div className={styleResults.mainDiv}>
            <div className={styleResults.resultsDiv}>
                <div style={{ width: "100%" }}>
                    <ResponsiveContainer width="100%" height={400} style={{ borderRadius: "10px" }}>
                        <BarChart data={formattedData} margin={{ top: 20, right: 100, left: 20, bottom: 5 }} barSize={70}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--grid_color)" />
                            <XAxis dataKey="name" stroke="var(--axis_color)" />
                            <YAxis stroke="var(--axis_color)" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
                                {formattedData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className={styleResults.customLegend}>
                    {renderLegend()}
                </div>
            </div>
        </div>
    );
}

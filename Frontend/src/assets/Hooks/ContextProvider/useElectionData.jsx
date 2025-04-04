import { useEffect, useState, useContext } from "react";
import { databaseContext, loadingContext } from "./ContextProvider";
import { toast } from "react-toastify";

export default function useElectionData() {
    const { database_url } = useContext(databaseContext);
    const { setLoading } = useContext(loadingContext);
    const [elections, setElections] = useState([]);
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${database_url}/election/allDetails`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const res = await response.json();

                if (res.success) {
                    setElections(res.elections);
                } else {
                    toast.warn(res.message || "Failed to fetch elections");
                }
            } catch (error) {
                console.error("Error fetching elections:", error);
                toast.error("Something went wrong while fetching elections");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [database_url, token, setLoading]);

    return { elections };
}

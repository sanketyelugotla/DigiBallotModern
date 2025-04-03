import React, { useContext, useEffect, useState } from "react";
import styleForm from "./CandidateForm.module.css";
import { sectionsContext } from "./SectionsContextProvider";
import { databaseContext, userContext } from "../../../../Hooks/ContextProvider/ContextProvider";
import { Personel, Party, Other, Declaration } from "../Forms";

export default function CandidateForm() {
    const { sections } = useContext(sectionsContext);
    const { database_url } = useContext(databaseContext);
    const { user } = useContext(userContext);
    const token = localStorage.getItem("authToken");
    const [completeData, setCompleteData] = useState();
    const { setLoading } = useContext(loadingContext)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobile: "",
        education: "",
        password: "",
        dob: "",
        gender: "",
        otp: "",
        profession: "",
        image: null,
        party: "",
        state: "",
        manifesto: null,
        spouse: "",
        spouse_profession: "",
        liabilities: "",
        assets: ""
    });

    async function fetchDetails() {
        setLoading(true);
        try {
            const response = await fetch(`${database_url}/candidates/get/user`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const res = await response.json();

            // console.log(res);
            setCompleteData(res);
            if (res) {
                setFormData((prev) => ({
                    ...prev,
                    fullName: res.fullName || "",
                    email: res.email || "",
                    mobile: res.mobile || "",
                    education: res.education || "",
                    password: res.password,
                    dob: res.dob.slice(0, 10) || "",
                    gender: res.gender || "",
                    otp: "",
                    profession: res.self_profession || "",
                    image: res.image || null,
                    manifesto: res.manifesto || null,
                    spouse: res.spouse || "",
                    spouse_profession: res.spouse_profession || "",
                    liabilities: res.liabilities || "",
                    assets: res.assets || "",
                }));
            } else {
                console.error("Error fetching details:", res.message);
            }

        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDetails();
    }, [user])

    // Handle input changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file selection dynamically
    const handleFileSelect = (file, name) => {
        console.log(file)
        console.log(name)
        setFormData((prev) => ({ ...prev, [name]: file }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const formDataObj = new FormData();

        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                formDataObj.append(key, formData[key]); // Append all fields dynamically
            }
        });
        try {
            const response = await fetch(`${database_url}/candidates/updatecandidate`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${token}` },
                body: formDataObj,
            });

            if (response.ok) {
                alert("Candidate registered successfully!");
            } else {
                alert("Submission failed!");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styleForm.full}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Personal Information */}
                <Personel {...{ handleFormChange, handleFileSelect, formData, handleSubmit }} />

                {/* Party Information */}
                <Party {...{ handleFormChange, handleFileSelect, completeData, fetchDetails }} />

                {/* Other Information */}
                <Other {...{ handleFormChange, handleFileSelect, formData, handleSubmit }} />

                {/* Declaration */}
                {/* <Declaration {...{ handleFormChange, handleFileSelect, handleSubmit, formData }} /> */}

            </form>
        </div>
    );
}

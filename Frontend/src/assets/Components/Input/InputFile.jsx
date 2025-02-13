import React, { useRef, useState } from "react";
import { TbCloudUpload } from "react-icons/tb";

export default function InputFile({ title, label, onFileSelect }) {
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            // Check if the file is an image
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!allowedTypes.includes(selectedFile.type)) {
                alert("Only image files (JPG, PNG, GIF) are allowed!");
                return;
            }

            // Check file size (Max 5MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                alert("File size should not exceed 5MB!");
                return;
            }

            setFile(selectedFile);
            onFileSelect(selectedFile); // Pass file to CandidateForm.js
        }
    };

    return (
        <div className="wrapper">
            <form action="#" onClick={handleFileClick}>
                <input
                    className="file-input"
                    type="file"
                    name="file"
                    ref={fileInputRef}
                    accept="image/jpeg, image/png, image/gif" // Only allow image files
                    hidden
                    onChange={handleFileChange}
                />
                <div className="input-wrapper">
                    <TbCloudUpload className="upload-icon" />
                    <div className="input-wrapper2">
                        <p>{title}</p>
                        <span>{label}</span>
                    </div>
                </div>
            </form>

            {/* Uploaded File */}
            {file && (
                <section className="uploaded-area">
                    <div className="row">
                        <div className="content upload">
                            <i className="fas fa-file-alt"></i>
                            <div className="details">
                                <span className="name">{file.name}</span>
                                <span className="size">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                            </div>
                        </div>
                        <i className="fas fa-check"></i>
                    </div>
                </section>
            )}
        </div>
    );
}

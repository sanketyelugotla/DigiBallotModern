import React, { useRef, useState } from "react";
import { TbCloudUpload } from "react-icons/tb";

export default function InputFile({ title, label }) {
    const fileInputRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Check file size (Max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("File size should not exceed 5MB!");
                return;
            }

            let fileName = file.name;
            if (fileName.length >= 12) {
                let splitName = fileName.split(".");
                fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
            }

            uploadFile(file, fileName);
        }
    };

    const uploadFile = (file, fileName) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "php/upload.php");

        xhr.upload.addEventListener("progress", ({ loaded, total }) => {
            let fileLoaded = Math.floor((loaded / total) * 100);
            let fileTotal = Math.floor(total / 1000);
            let fileSize = fileTotal < 1024 ? `${fileTotal} KB` : `${(loaded / (1024 * 1024)).toFixed(2)} MB`;

            setProgress(fileLoaded);

            if (loaded === total) {
                setProgress(0);
                setUploadedFile({ name: fileName, size: fileSize }); // Replace previous file
            }
        });

        const formData = new FormData();
        formData.append("file", file);
        xhr.send(formData);
    };

    return (
        <div className="wrapper">
            <form action="#" onClick={handleFileClick}>
                <input
                    className="file-input"
                    type="file"
                    name="file"
                    ref={fileInputRef}
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

            {/* Progress Bar */}
            {progress > 0 && (
                <section className="progress-area">
                    <div className="row">
                        <i className="fas fa-file-alt"></i>
                        <div className="content">
                            <div className="details">
                                <span className="name">Uploading...</span>
                                <span className="percent">{progress}%</span>
                            </div>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Uploaded File */}
            {uploadedFile && (
                <section className="uploaded-area">
                    <div className="row">
                        <div className="content upload">
                            <i className="fas fa-file-alt"></i>
                            <div className="details">
                                <span className="name">{uploadedFile.name} • Uploaded</span>
                                <span className="size">{uploadedFile.size}</span>
                            </div>
                        </div>
                        <i className="fas fa-check"></i>
                    </div>
                </section>
            )}
        </div>
    );
}

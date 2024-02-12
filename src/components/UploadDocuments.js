import { useState } from "react";
import { storage } from "../Firebase/firebaseconfig";
import './StyleUploadDocument.css';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from 'react-router-dom';

const UploadDocument = () => {

  const navigate = useNavigate()
    // State to store uploaded file
    const [file, setFile] = useState("");

    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload a document first!");
            return;
        }

        const storageRef = ref(storage, `/documents/${file.name}`);
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };

    return (
        <div className="document-updater-container">
            <input type="file" onChange={handleChange} accept=".pdf, .doc, .docx" />
            <button className="save-button" onClick={handleUpload}>Upload Document</button>
            <p>{percent} % done</p>
            <Link to="/AdminHomepage">Back to Admin Homepage</Link>
        </div>
    );
};

export default UploadDocument;

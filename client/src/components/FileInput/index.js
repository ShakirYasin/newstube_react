import { useEffect, useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from "uuid"
import storage from "../../firebase";
// import check from "../../check.png";
import styles from "../../css/fileInput.css";

const FileInput = ({ name, label, value, type, handleInputState, ...rest }) => {
    const inputRef = useRef();
    const [progress, setProgress] = useState(0);
    const [progressShow, setProgressShow] = useState(false);
    const [file, setFile] = useState(null)

    useEffect(() => {
        setFile(value)
    }, [value])

    const handleUpload = () => {
        // setProgressShow(true);
        const fileName = file?.name + v4();
        const storageRef = ref(
            storage,
            type === "audio" ? `/audio/${fileName}` : `/images/${fileName}`
        );
        uploadBytes(storageRef, file).then(() => {
            alert("Image Uploaded")
        })
        // const uploadTask = uploadBytes(storageRef, value);
        // uploadTask.on(
        //     "state_changed",
        //     (snapshot) => {
        //         const uploaded = Math.floor(
        //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //         );
        //         setProgress(uploaded);
        //     },
        //     (error) => {
        //         console.log(error);
        //     },
        //     () => {
        //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        //             handleInputState(name, url);
        //         });
        //     }
        // );
    };

    return (
        <div className={styles.input_container}>
            <input
                type="file"
                ref={inputRef}
                onChange={(e) => handleInputState(name, e.currentTarget.files[0])}
                vlaue={value}
                style={{display: "none"}}
                {...rest}
            />
            <button
                type="button"
                onClick={() => inputRef.current.click()}
                className={styles.button}
            >
                {label}
            </button>
            <button type="button" onClick={handleUpload} className={styles.button}>
                Upload
            </button>
        </div>
    );
};

export default FileInput;
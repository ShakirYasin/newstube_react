import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4} from "uuid"
import storage from "../firebase";

export const fileUpload = (file) => {
    if(file == null) return;
    let fileUrl;
    const imageRef = ref(storage, `/images/${file.name + v4()}`);
    const uploadTask = uploadBytesResumable(imageRef, file);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        },
        (error) => {
            console.log(error);
        },
        () => {
            alert("Upload Complete")
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                fileUrl = url
            });
        }
    );

    return fileUrl
}
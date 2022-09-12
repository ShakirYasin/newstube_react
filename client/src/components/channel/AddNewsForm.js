import React, { useState, useContext, useEffect, useRef } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import axios from '../axios'
// import FileInput from '../FileInput'
import Tag from '../Tag'
import {FiCheck} from 'react-icons/fi'

import UserContext from '../../context/UserContext'
import NewsContext from '../../context/NewsContext'
import { useFileUpload } from '../../hooks/useFileUpload'

const NEWS_URL = '/posts'
const AddNewsForm = () => {

    const tagsRef = useRef(null)
    const { upload } = useFileUpload()
    const {auth} = useContext(UserContext)
    const {setUpdateNews} = useContext(NewsContext)
    // const {setNewUserPost} = useContext(NewsContext)
    const [data, setData] = useState({
        title: "",
        description: "",
        image: null,
        audio: null,
        video: null,
        tags: [],
        categories: []
    });
    const [tempTag, setTempTag] = useState("")
    const [successMsg, setSuccessMsg] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [uploadState, setUploadState] = useState(null)
    const [audioUploadState, setAudioUploadState] = useState(null)
    const [videoUploadState, setVideoUploadState] = useState(null)

    const handleChange = (name, value) => {
        if(name === "audio" || name === "video"){
            if(value.size > 307200){
                alert("file is too big. Please upload below 30mbs")
            }
            else {
                setData(prev => (
                    {
                        ...prev,
                        [name]: value
                    }
                ));
            }
        }
        else {
            setData(prev => (
                {
                    ...prev,
                    [name]: value
                }
            ));
        }
    };

    const handleTag = (key) => {
        if(key === "Enter"){
            if(tempTag.match(/^\w+$/)){
                setData(prev => (
                    {
                        ...prev,
                        tags: [...prev.tags, tempTag]
                    }
                ))
                setTempTag("")
            }
            else {
                alert("Please only add Letters and Numbers")
                setTempTag("")
            }
        }
        if(key === "Backspace"){
            if(tempTag === ""){
                setData(prev => (
                    {
                        ...prev,
                        tags: prev.tags.splice(0, prev.tags.length - 1)
                    }
                ))
            }
        }
    }

    const handleRemoveTag = (tag) => {
        setData(prev => (
            {
                ...prev,
                tags: prev.tags.filter(t => t !== tag)
            }
        ))
    }
    const formHandling = (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            return false
        }
    }


    async function handleSubmit(e){
        e.preventDefault();
        // console.log("Submit")
        try {
            const response = await axios.post(NEWS_URL, 
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }
            )
            console.log(response?.data)
            if(response?.data?.message){
                setErrMsg(response?.data?.message)
                return
            }
            else {
                setUpdateNews(prev => !prev)
                setSuccessMsg('News Uploaded')
                setErrMsg('')
                setData({
                    title: '',
                    description: '',
                    image: '',
                })
            }
        } catch (err) {
            console.log(err?.response)
            setErrMsg('')
            setSuccessMsg('')
            if (!err?.response) {
                setErrMsg('No Server Response')
            }
            else if (err.response?.status === 400) {
                setErrMsg(err?.response?.message)
            }
            else if (err.response?.status === 401) {
                setErrMsg(err?.response?.message)
            }
            else if (err.response?.status === 404) {
                setErrMsg('User not found...')
            }
            else {
                setErrMsg('Login Failed')
            }
        }
    }

    const handleUpload = (file) => {
        upload(file, "images", "image", setData, setUploadState)
    }

    const handleUploadAudio = (file) => {
        upload(file, "audios", "audio", setData, setAudioUploadState)
    }

    const handleUploadVideo = (file) => {
        upload(file, "videos", "video", setData, setVideoUploadState)
    }

    useEffect(() => {
        console.log(data)
    }, [data])


    return (
        <Form onSubmit={(e) => (handleSubmit(e))} onKeyDown={(e) => (formHandling(e))}>
            {
                successMsg &&
                <Alert key='success' variant='success'>
                    {successMsg}
                </Alert>
            }
            {
                errMsg &&
                <Alert key='danger' variant='danger'>
                    {errMsg}
                </Alert>
            }
            <h4 className='mb-3'>New Post</h4>
            <Form.Floating>
                <Form.Control required type='text' value={data.title} id='newsTitle' name='title' placeholder='Title' className='mb-3' onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                <label htmlFor="newsTitle">Title *</label>
            </Form.Floating>
            <Form.Floating>
                <Form.Control as='textarea' value={data.description} required id='newsDescription' name='description' placeholder='Description' className='mb-3' style={{ height: '300px' }} onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                <label htmlFor="newsDescription">Description *</label>
            </Form.Floating>
            <Form.Group>
                <Form.Label>Thumbnail *</Form.Label>
                {/* <FileInput
                    name="image"
                    label="Choose Image"
                    handleInputState={handleInputState}
                    type="image"
                    value={data.img}
                /> */}
                <div className='d-flex gap-5 w-50'>
                    <Form.Control 
                        className='flex-shrink-1'
                        type='file' 
                        required
                        onChange={
                            (e) => (
                                setData((prev) => 
                                    ({...prev, image: e.target.files[0]}))
                            )}
                    />
                    <Button type="button" className='btn_primary d-flex' disabled={uploadState === 100} style={{padding: "0.45rem 1rem"}} onClick={() => (handleUpload(data?.image))}>
                        Upload
                        <span className='ms-2'>
                            {
                                uploadState === null ?
                                <></>
                                :
                                uploadState == 0 ?
                                <Spinner size={20} color="white" />
                                :
                                uploadState == 100 &&
                                <FiCheck size={20} color="white" />
                            }
                        </span>
                    </Button>
                </div>
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Audio *</Form.Label>
                <div className='d-flex gap-5 w-50'>
                    <Form.Control 
                        className='flex-shrink-1'
                        type='file' 
                        accept='audio/*'
                        onChange={
                            (e) => (
                                setData((prev) => 
                                    ({...prev, audio: e.target.files[0]}))
                            )}
                    />
                    <Button type="button" className='btn_primary d-flex' disabled={audioUploadState === 100} style={{padding: "0.45rem 1rem"}} onClick={() => (handleUploadAudio(data?.audio))}>
                        Upload
                        <span className='ms-2'>
                            {
                                audioUploadState === null ?
                                <></>
                                :
                                audioUploadState == 0 ?
                                <Spinner size={20} color="white" />
                                :
                                audioUploadState == 100 &&
                                <FiCheck size={20} color="white" />
                            }
                        </span>
                    </Button>
                </div>
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Video *</Form.Label>
                <div className='d-flex gap-5 w-50'>
                    <Form.Control 
                        className='flex-shrink-1'
                        type='file' 
                        accept='video/*'
                        onChange={
                            (e) => (
                                setData((prev) => 
                                    ({...prev, video: e.target.files[0]}))
                            )}
                    />
                    <Button type="button" className='btn_primary d-flex' disabled={videoUploadState === 100} style={{padding: "0.45rem 1rem"}} onClick={() => (handleUploadVideo(data?.video))}>
                        Upload
                        <span className='ms-2'>
                            {
                                videoUploadState === null ?
                                <></>
                                :
                                videoUploadState == 0 ?
                                <Spinner size={20} color="white" />
                                :
                                videoUploadState == 100 &&
                                <FiCheck size={20} color="white" />
                            }
                        </span>
                    </Button>
                </div>
            </Form.Group>
            
            <Form.Group className="my-3">
                <Form.Label>Tags (optional)</Form.Label>
                <div className='border border-1 d-flex align-items-center flex-wrap w-50 bg-white p-2 radius_15' style={{cursor: "text"}} onClick={() => (tagsRef.current.focus())}>
                    <div className='flex-shrink-0 d-flex align-items-center gap-2 flex-wrap' style={{width: "max-content", maxWidth: "100%"}}>
                        {
                            data?.tags?.map(tag => (
                                <Tag tag={tag} handleRemoveTag={handleRemoveTag} />
                            ))
                        }
                    </div>
                    <div className=''>
                        <Form.Control ref={tagsRef} value={tempTag} onChange={(e) => (setTempTag(e.target.value))} onKeyDown={(e) => (handleTag(e.key))} className="border-0 rounded-0 nostyle-input" />
                    </div>
                </div>
            </Form.Group>
            <Button type='submit' className='btn_primary mt-4'>Submit</Button>
        </Form>
    )
}

export default AddNewsForm
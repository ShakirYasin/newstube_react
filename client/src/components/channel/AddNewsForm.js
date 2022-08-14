import React, { useState, useContext, useEffect } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import axios from '../axios'
// import FileInput from '../FileInput'

import UserContext from '../../context/UserContext'
import NewsContext from '../../context/NewsContext'
import { useFileUpload } from '../../hooks/useFileUpload'

const NEWS_URL = '/posts/'
const AddNewsForm = () => {

    const { upload } = useFileUpload()
    const {auth} = useContext(UserContext)
    const {setNewUserPost} = useContext(NewsContext)
    const [data, setData] = useState({
        title: "",
        description: "",
        image: null,
    });
    const [successMsg, setSuccessMsg] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const handleChange = (name, value) => {
        setData(prev => (
            {
                ...prev,
                [name]: value
            }
        ));
    };

    // const handleInputState = (name, value) => {
    //     setData((prev) => ({ ...prev, [name]: value }));
    // };


    async function handleSubmit(e){
        e.preventDefault();

        try {
            const response = await axios.post(NEWS_URL + auth._id, 
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }
            )
            console.log(response.data)
            setSuccessMsg('News Uploaded')
            setNewUserPost(response.data)
            setErrMsg('')
            setData({
                title: '',
                description: '',
                image: '',
            })
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
        upload(file, "images", "image", setData)
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <Form onSubmit={(e) => (handleSubmit(e))}>
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
                <Form.Control type='text' value={data.title} id='newsTitle' name='title' placeholder='Title' className='mb-3' onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                <label htmlFor="newsTitle">Title</label>
            </Form.Floating>
            <Form.Floating>
                <Form.Control as='textarea' value={data.description} id='newsDescription' name='description' placeholder='Description' className='mb-3' style={{ height: '300px' }} onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                <label htmlFor="newsDescription">Description</label>
            </Form.Floating>
            <Form.Group>
                <Form.Label>Thumbnail</Form.Label>
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
                        onChange={
                            (e) => (
                                setData((prev) => 
                                    ({...prev, image: e.target.files[0]}))
                            )}
                    />
                    <Button type="button" onClick={() => (handleUpload(data?.image))} >Upload</Button>
                </div>
            </Form.Group>
            <Button type='submit' className='btn_primary mt-4'>Submit</Button>
        </Form>
    )
}

export default AddNewsForm
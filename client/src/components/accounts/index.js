import React, { useContext, useEffect, useRef, useState } from 'react'
import { Alert, Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import UserContext from '../../context/UserContext'
import {MdEdit} from 'react-icons/md'
import { BiImageAdd } from 'react-icons/bi'


import '../../css/Accounts.css'
import { useFileUpload } from '../../hooks/useFileUpload'

const url = '/me'

const Accounts = () => {

    const { upload } = useFileUpload()
    const { auth, getMe, updateMe } = useContext(UserContext)
    const [userData, setUserData] = useState(null)
    const [formValues, setFormValues] = useState(null)
    const [editForm, setEditForm] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const profilePictureRef = useRef()
    const coverPhotoRef = useRef()

    useEffect(() => {
        async function fetchData(){
            setUserData(await getMe())
        }

        fetchData()
    }, [auth])
    
    useEffect(() => {
        setFormValues({
            name: userData?.name,
            email: userData?.email,
            profilePicture: userData?.profilePicture,
            coverPhoto: userData?.coverPhoto,
            isACreator: userData?.isACreator,
        })
    }, [userData])

    const handleChange = (name, value) => {
        setFormValues(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const handleSetImage = (ref) => {
        ref.click()
    }

    const handleProfilePictureUpload = (file) => {
        upload(file, "images", "profilePicture", setFormValues)
    }
    const handleCoverPhotoUpload = (file) => {
        upload(file, "images", "coverPhoto", setFormValues)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(false)
        setSuccess(false)
        setErrorMsg('')

        try {
            const response = updateMe(formValues)
            setSuccess(true)
        } catch (error) {
            setError(true)
            setErrorMsg(error)
        }
    }

    useEffect(() => {
        console.log(formValues);
    }, [formValues])


    return formValues && (
        <div className='mt-5'>
            <Container>
                <Row className='justify-content-center'>
                    <Col xs='12' lg='8'>
                        <div className='mt-5 card_box_shadow p-4 radius_15'>
                                <Form className='pt-2' onSubmit={(e) => (handleSubmit(e))}>
                                    {
                                        success &&
                                        <Alert variant='success'>Account Updated SuccessFully</Alert>
                                    }
                                    {
                                        error &&
                                        <Alert variant='danger'>{errorMsg}</Alert>
                                    }
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4 className='pb-3 bold'>Account Settings</h4>
                                        {
                                            editForm ?
                                            <Button type='button' onClick={() => (setEditForm(false))} className='btn_secondary mt-3 py-2 ms-auto'>Cancel</Button>
                                            :
                                            <div className='d-flex align-items-center cursor-pointer py-3' onClick={() => (setEditForm(true))} >
                                                <span className='bold mx-2'>Edit</span>
                                                <MdEdit size={25}/>
                                            </div>
                                        }
                                    </div>
                                    <fieldset disabled={!editForm}>

                                    <div className='channel-settings px-3'>
                                        <h5>Channel Settings</h5>
                                        <hr />
                                        <div>
                                            <Form.Check label='Enable Channel' name="isACreator" checked={formValues?.isACreator || false} onChange={(e) => (handleChange(e.target.name, e.target.checked))} />
                                        </div>
                                    </div>
                                    <div className='channel-settings px-3 mt-4'>
                                        <h5>Profile Settings</h5>
                                        <hr />
                                        <Row className='px-3 pt-3'>
                                            <Col xs="12" sm="6">
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="heading-color bold m-0">Display Name</Form.Label>
                                                    <Form.Control type="text" required className={`nostyle-input form-input-style mt-2 ${!editForm ? 'secondary' : 'primary'}`} name="name" value={formValues?.name || ''} onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="heading-color bold m-0">Email</Form.Label>
                                                    <Form.Control type="text" required className={`nostyle-input form-input-style mt-2 ${!editForm ? 'secondary' : 'primary'}`} name="email" value={formValues?.email || ''} onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                                                </Form.Group>
                                            </Col>
                                            <Col xs="12" sm="6">
                                                <div className='d-flex flex-column align-items-center'>
                                                    {/* Profile Picture */}
                                                    <div className='accounts--profile-picture'>
                                                        <span className={`hover-placeholder ${!editForm ? 'cursor-disabled' : 'cursor-pointer'}`} onClick={() => (handleSetImage(profilePictureRef.current))}>
                                                            <BiImageAdd size={25} color="grey" />
                                                            <Form.Control 
                                                                ref={profilePictureRef}
                                                                className='d-none'
                                                                type='file'
                                                                accept='image/.png, image/.jpeg, image/.jpg' 
                                                                onChange={
                                                                    (e) => (
                                                                        handleProfilePictureUpload(e.target.files[0])
                                                                    )}
                                                            />
                                                        </span>
                                                        <Image src={formValues?.profilePicture} width="101%" height="101%" alt="" style={{objectFit: "cover", objectPosition: "top"}} />
                                                    </div>
                                                    <Form.Label className='bold'>Profile Picture</Form.Label>
                                                </div> 
                                                <div className='d-flex flex-column align-items-center mt-3'>
                                                    {/* Cover Photo */}
                                                    <div className='accounts--cover-photo'>
                                                        <span className={`hover-placeholder ${!editForm ? 'cursor-disabled' : 'cursor-pointer'}`} onClick={() => (handleSetImage(coverPhotoRef.current))}>
                                                            <BiImageAdd size={25} color="grey" />
                                                            <Form.Control 
                                                                ref={coverPhotoRef}
                                                                className='d-none'
                                                                type='file'
                                                                accept='image/.png, image/.jpeg, image/.jpg' 
                                                                onChange={
                                                                    (e) => (
                                                                        handleCoverPhotoUpload(e.target.files[0])
                                                                    )}
                                                            />
                                                        </span>
                                                        <Image src={formValues?.coverPhoto} width="101%" height="101%" alt="" style={{objectFit: "cover", objectPosition: "center"}} />
                                                    </div>
                                                    <Form.Label className='bold'>Cover Photo</Form.Label>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div style={{width: "max-content"}} className="ms-auto">
                                        <Button type='submit' className='btn_primary mt-3 py-2 ms-auto'>Save</Button>
                                    </div>
                                    </fieldset>
                                </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Accounts
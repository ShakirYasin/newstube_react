import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import UserContext from '../../context/UserContext'
import {MdEdit} from 'react-icons/md'
import { BiImageAdd } from 'react-icons/bi'


import '../../css/Accounts.css'
import { useFileUpload } from '../../hooks/useFileUpload'

const url = '/me'

const Accounts = () => {

    const { upload } = useFileUpload()
    const { auth, getMe } = useContext(UserContext)
    const [userData, setUserData] = useState(null)
    const [formValues, setFormValues] = useState(null)
    const [editForm, setEditForm] = useState(false)
    const profilePictureRef = useRef()

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
            role: userData?.role,
            profilePicture: userData?.profilePicture,
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

    const handleSetImage = () => {
        profilePictureRef.current.click()
    }

    const handleUpload = (file) => {
        upload(file, "images", "profilePicture", setFormValues)
    }

    useEffect(() => {
        console.log(formValues?.profilePicture);
    }, [formValues])


    return formValues && (
        <div className='mt-5'>
            <Container>
                <Row className='justify-content-center'>
                    <Col xs='12' lg='8'>
                        <div className='mt-5 card_box_shadow p-4 radius_15'>
                                <Form className='pt-2'>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4 className='pb-3 bold'>Account Settings</h4>
                                        {
                                            editForm ?
                                            <Button type='button' onClick={() => (setEditForm(false))} className='btn_secondary mt-3 py-2 ms-auto'>Cancel</Button>
                                            :
                                            <div className='d-flex align-items-center cursor-pointer' onClick={() => (setEditForm(true))} >
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
                                                    <Form.Control type="text" className="nostyle-input form-input-style mt-2" name="name" value={formValues?.name || ''} onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="heading-color bold m-0">Email</Form.Label>
                                                    <Form.Control type="text" className="nostyle-input form-input-style mt-2" name="email" value={formValues?.email || ''} onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                                                </Form.Group>
                                            </Col>
                                            <Col xs="12" sm="6">
                                                <div className='d-flex flex-column align-items-center'>
                                                    <div className='accounts--profile-picture'>
                                                        <span className="hover-placeholder" onClick={handleSetImage}>
                                                            <BiImageAdd size={25} color="grey" />
                                                            <Form.Control 
                                                                ref={profilePictureRef}
                                                                className='d-none'
                                                                type='file' 
                                                                onChange={
                                                                    (e) => (
                                                                        handleUpload(e.target.files[0])
                                                                    )}
                                                            />
                                                        </span>
                                                        <Image src={formValues?.profilePicture} width="100%" height="100%" alt="" style={{objectFit: "cover"}} />
                                                    </div>
                                                    <Form.Label className='bold'>Profile Picture</Form.Label>
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
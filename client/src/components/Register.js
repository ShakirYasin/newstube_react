import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, ButtonGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from './axios'



const REGISTER_URL = '/users/register'
const Register = () => {

    const nav = useNavigate()
    const [signupData, setSignupData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        isACreator: false,
    })
    const { password, confirmPassword } = signupData
    const [success, setSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [matchPasswords, setMatchPasswords] = useState(false)


    useEffect(() => {
        if (password === confirmPassword) {
            setMatchPasswords(true)
            setErrMsg('')
        }
        else {
            setMatchPasswords(false)
        }
    }, [password, confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { fullname, email, password, isACreator } = signupData
            if (fullname === '' || email === '' || password === '') {
                setErrMsg('Please fill in all fields...')
                return
            }
            if (password.length < 6) {
                setErrMsg('Password must be at least 6 characters long...')
                return
            }
            if (!matchPasswords) {
                setErrMsg('Passwords do not Match!')
                return
            }
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ name: fullname, email, password, isACreator }),
                {
                    headers: { 'Content-Type': 'Application/json' }
                }
            )
            console.log(response.data)
            setErrMsg('')
            setSuccess(true)
            setSuccessMsg('Signup Successful...!')

        } catch (err) {
            setErrMsg('')
            if (!err?.response) {
                setErrMsg('No Server Response')
            }
            else if (err.response?.status == 409) {
                setErrMsg('User already Exists')
            }
            else if (err.response?.status == 400) {
                setErrMsg(err.message)
            }
            else {
                setErrMsg('Registration Failed')
            }
        }
    }

    function handleChange(name, value) {
        setSignupData(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    useEffect(() => {
        setSuccess(false)
        console.log(signupData);
    }, [signupData])

    var timer
    var shortTimer

    const setShortTimer = () => {
        shortTimer = setTimeout(() => {
            setSuccessMsg('Redirecting to Login...')
        }, 1000)
    }
    const setTimer = () => {
        timer = setTimeout(() => {
            nav('/login')
        }, 3000)
    }


    useEffect(() => {
        if (success == true) {
            setShortTimer()
            setTimer()
        }

        return () => {
            clearTimeout(timer)
            clearTimeout(shortTimer)
        }
    }, [success])

    return (
        <Container>
            <Row className='viewport_h-full justify-content-center align-items-center'>
                <Col xs='12' md='6'>
                    <div className='bg-light card_box_shadow p-5 radius_15'>
                        {
                            errMsg != '' &&
                            <div className="alert alert-danger" role="alert">
                                {errMsg}
                            </div>
                        }
                        {
                            success &&
                            <div className="alert alert-success" role="alert">
                                {successMsg}
                            </div>
                        }
                        <h3 className='montserrat_regular text-center mb-3'>Sign Up</h3>
                        <Form onSubmit={(e) => (handleSubmit(e))}>
                            <Form.Group>
                                <Form.Control type='text' name='fullname' className='bg-transparent border-0 border-bottom border-2 rounded-0 box-shadow-none outline_none' placeholder='Full Name *' required onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                            </Form.Group>
                            <Form.Group className='mt-4'>
                                <Form.Control type='email' name='email' className='bg-transparent border-0 border-bottom border-2 rounded-0 box-shadow-none outline_none' placeholder='Email *' required onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                            </Form.Group>
                            <Form.Group className='mt-4'>
                                <Form.Control type='password' name='password' className='bg-transparent border-0 border-bottom border-2 rounded-0 box-shadow-none outline_none' placeholder='Password *' required onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                            </Form.Group>
                            <Form.Group className='mt-4'>
                                <Form.Control type='password' name='confirmPassword' className='bg-transparent border-0 border-bottom border-2 rounded-0 box-shadow-none outline_none' required placeholder='Confirm Password *' onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                            </Form.Group>
                            <Form.Group className='mt-4'>
                                <Form.Check label='Create a channel' className='text-left' name='isACreator' onChange={(e) => (handleChange(e.target.name, e.target.checked))} />
                            </Form.Group>
                            <div className='d-flex'>
                                <Button type='submit' className='mt-5 btn_primary mx-auto'>Sign up</Button>
                            </div>
                        </Form>
                        <Link to='/login'>
                            <p className='color-primary cursor-pointer text-end mt-3 text-decoration-underline'>Already have an account?</p>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Register
import React, { useState, useEffect, useContext } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from './axios'
import UserContext from '../context/UserContext'



const LOGIN_URL = '/users/login'
const Login = () => {

    const nav = useNavigate()
    const { setAuth } = useContext(UserContext)
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const [success, setSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');


    function handleChange(name, value) {
        setLoginData(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email, password } = loginData
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'Application/json' }
                }
            )
            // console.log(response.data)
            const { _id, name, token, isACreator } = response.data
            setErrMsg('')
            setAuth({ _id, name, email, token, isACreator })
            setSuccess(true)
            setSuccessMsg('Login Successful...!')

        } catch (err) {
            setErrMsg('')
            setSuccess(false)
            if (!err?.response) {
                setErrMsg('No Server Response')
            }
            else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password')
            }
            else if (err.response?.status === 401) {
                setErrMsg('Unauthorized')
            }
            else if (err.response?.status === 404) {
                setErrMsg('User not found...')
            }
            else {
                setErrMsg('Login Failed')
            }
        }
    }

    var timer
    var shortTimer

    const setShortTimer = () => {
        shortTimer = setTimeout(() => {
            setSuccessMsg('Redirecting to Dashboard...')
        }, 1000)
    }
    const setTimer = () => {
        timer = setTimeout(() => {
            nav('/dashboard')
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
                        <h3 className='montserrat_regular text-center mb-3'>Login</h3>
                        <Form className='text-center' onSubmit={(e) => (handleSubmit(e))}>
                            <Form.Group>
                                <Form.Control type='email' name='email' className='bg-transparent border-0 border-bottom border-2 rounded-0 box-shadow-none outline_none' placeholder='Email' onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                            </Form.Group>
                            <Form.Group className='mt-4'>
                                <Form.Control type='password' name='password' className='bg-transparent border-0 border-bottom border-2 rounded-0 box-shadow-none outline_none' placeholder='Password' onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                            </Form.Group>
                            <button className='mt-5 btn_primary mx-auto'>Login</button>
                        </Form>
                        <Link to='/signup'>
                            <p className='color-primary cursor-pointer text-end mt-3 text-decoration-underline'>Don&apos;t have an account?</p>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import UserContext from '../../context/UserContext'

const url = '/me'

const Accounts = () => {

    const { isCreator, auth } = useContext(UserContext)
    const [data, setData] = useState(null)

    useEffect(() => {
        setData()
    }, [auth])

    return (
        <div className='mt-5'>
            <Container>
                <Row className='justify-content-center'>
                    <Col xs='12' lg='8'>
                        <div className='mt-5 card_box_shadow p-4 radius_15'>
                                <Form className='pt-2'>
                                    <h4 className='pb-3 bold'>Account Settings</h4>
                                    <div className='channel-settings px-3'>
                                        <h5>Channel Settings</h5>
                                        <hr />
                                        {
                                            isCreator() === false ?
                                                    <div>
                                                        <Form.Check label='Create Channel' />
                                                        <Button type='submit' className='btn_primary mt-3 py-2'>Save</Button>
                                                    </div>
                                                    :
                                                    <></>
                                                }
                                    </div>
                                </Form>
                            <div className='channel-settings px-3 mt-4'>
                                <h5>Profile Settings</h5>
                                <hr />

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Accounts
import React, { useContext } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import UserContext from '../../context/UserContext'

const Accounts = () => {

    const { isCreator } = useContext(UserContext)

    return (
        <div className='mt-5'>
            <Container>
                <Row className='justify-content-center'>
                    <Col xs='12' lg='8'>
                        <div className='mt-5 card_box_shadow p-4 radius_15'>
                            <h4 className='pb-3 bold'>Account Settings</h4>
                            <div className='channel-settings px-3'>
                                <h5>Channel Settings</h5>
                                <hr />
                                {
                                    isCreator() === false ?
                                        <Form className='pt-2'>
                                            <Form.Check label='Create Channel' />
                                            <Button type='submit' className='btn_primary mt-3 py-2'>Save</Button>
                                        </Form>
                                        :
                                        <></>
                                }
                            </div>
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
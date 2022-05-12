import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import users from '../data/Users'
import CardUser from './cards/CardUser'
import { FaBellSlash } from 'react-icons/fa';
import { BiBell } from 'react-icons/bi';
import { IconContext } from 'react-icons';


const Subscriptions = () => {

    const [allUsers, setAllUsers] = useState(users)
    const [showAlert, setShowAlert] = useState(false);
    const [currentUser, setCurrentUser] = useState()
    const [isMute, setIsMute] = useState(false)

    useEffect(() => {
        const timeId = setTimeout(() => {
            setShowAlert(false)
        }, 2000)

        return () => {
            clearTimeout(timeId)
        }
    }, [currentUser, isMute]);

    function handleMuting(user) {
        setCurrentUser(user)
        setShowAlert(true)
    }
    function checkMute(check) {
        setIsMute(check)
    }
    function checkFollow(value, id) {
        !value && setAllUsers(prev => (
            prev.filter(user => (
                user.id != id
            ))
        ))
    }

    return (
        <div className='position-relative my-5'>
            <Container>
                <h2 className='bold montserrat_regular text-center font_48'>Subscriptions</h2>
                <Row>
                    {
                        allUsers.map(user => (
                            <Col key={user.id} xs='12' lg='3' className='mt-5'>
                                <CardUser data={user} orientation='portrait' handleMuting={handleMuting} isMute={checkMute} checkFollow={checkFollow} />
                            </Col>
                        ))
                    }
                </Row>
                <Alert show={showAlert} variant="info" className='card_alert d-flex align-items-center justify-content-between'>
                    <div className='d-flex'>
                        <h5 className='me-3'>{currentUser} {isMute ? 'Muted' : 'Unmuted'}</h5>
                        <IconContext.Provider value={{ size: '25' }}>
                            {
                                isMute ? <FaBellSlash /> : <BiBell />
                            }
                        </IconContext.Provider>
                    </div>
                    {/* <Button onClick={() => setShowAlert(false)} variant='none' >
                        <AiOutlineClose size={20} color='#383838' />
                    </Button> */}
                </Alert>
            </Container>
        </div>
    )
}

export default Subscriptions
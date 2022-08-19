import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import users from '../data/Users'
import CardUser from './cards/CardUser'
import { FaBellSlash } from 'react-icons/fa';
import { BiBell } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import SubscriptionContext from '../context/SubscriptionContext';
import UserContext from '../context/UserContext';


const Subscriptions = () => {

    const { getChannelsSubscribed, channelsSubscribed, subscriptionEvent } = useContext(SubscriptionContext)
    const { auth } = useContext(UserContext)
    const [allUsers, setAllUsers] = useState(users)
    const [showAlert, setShowAlert] = useState(false);
    const [currentUser, setCurrentUser] = useState()
    const [isMute, setIsMute] = useState(false)


    useEffect(() => {
        getChannelsSubscribed()
    }, [auth, subscriptionEvent])

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

    useEffect(() => {
        console.log(channelsSubscribed);
    }, [channelsSubscribed])

    return (
        <div className='position-relative my-5 pt-5'>
            <Container>
                <h2 className='bold montserrat_regular text-center font_48'>Subscriptions</h2>
                {
                    channelsSubscribed.length > 0 ?
                    <>
                        <Row>
                            {
                                channelsSubscribed.map(channel => (
                                    <Col key={channel._id} xs='12' lg='3' className='mt-5'>
                                        <CardUser data={channel.channelSubscribed} orientation='portrait' handleMuting={handleMuting} isMute={checkMute} checkFollow={checkFollow} />
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
                    </>
                    :
                    <div className='mt-3'>
                        <h2 className='text-center font_16'>You haven't subscribe to any one yet</h2>
                    </div>

                }
            </Container>
        </div>
    )
}

export default Subscriptions
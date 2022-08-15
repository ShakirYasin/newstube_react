import React, { useState, useContext, useEffect } from 'react'
import { Col, Container, Row, Nav, Image } from 'react-bootstrap'
import "../../css/channel.css"
import { BsSearch } from 'react-icons/bs';
import { IoMdMore } from 'react-icons/io';
import { IconContext } from 'react-icons';

import HomeContent from './HomeContent'
import CollectionsContent from './CollectionsContent'
import AboutContent from './AboutContent'

import user1 from '../../images/users/user1.jpg'
// import cover_picture from '../../images/users/cover_picture.jpg'
import Content from './Content';

import NewsContext from '../../context/NewsContext'
import UserContext from '../../context/UserContext'
import ChannelContext from '../../context/ChannelContext';
import { useParams } from 'react-router-dom';



const Channel = () => {

    let { id: params } = useParams()
    const { auth, getMe } = useContext(UserContext)
    const { channelData, getUserChannel } = useContext(ChannelContext)
    const [userData, setUserData] = useState(null)
    const { userNews } = useContext(NewsContext)
    const [currentTab, setCurrentTab] = useState('home')
    const [tabs, setTabs] = useState(
        [
            {
                key: 'home',
                name: 'home',
                component: HomeContent,
                userNews: channelData?.news
            },
            {
                key: 'collections',
                name: 'collections',
                component: CollectionsContent,
                userNews: channelData?.news
            },
            {
                key: 'about',
                name: 'about',
                component: AboutContent,
                userInfo: userData
            }
        ]
    )
    const [showAddNewsForm, setShowAddNewsForm] = useState(false)

    const handleTab = (name) => {
        setShowAddNewsForm(false)
        setCurrentTab(name)
    }

    useEffect(() => {
        setTabs(prev => (
            prev.map(tab => {
                if(tab.key === 'home' || tab.key === 'collections'){
                    return {
                        ...tab,
                        userNews: channelData?.news
                    }
                }
                else{
                    return tab
                }
            })
        ))
    }, [userNews])

    useEffect(() => {
        setUserData(channelData?.user)
    }, [channelData?.user])

    // useEffect(() => {
    //     async function getChannel (){
    //         getUserChannel()
    //     }

    //     getChannel()
    // }, [params])

    return (
        <>
            <Row>
                <Col xs='12'>
                    <div className='cover_area'>
                        <Container className='height-100'>
                            <Row className='align-items-end justify-content-start height-100'>
                                <Col xs='6'>
                                    <div className='channel--profile-picture'>
                                        {
                                            userData?.profilePicture ?
                                            <Image src={userData?.profilePicture} alt='channel--profile-picture' width='100%' height='100%' />
                                            :
                                            <span>{userData?.name?.slice(0, 1)}</span>
                                        }
                                    </div>
                                </Col>
                                <Col xs='6'>
                                </Col>
                            </Row>
                        </Container>
                        <div className='channel--nav'>
                            <Container>
                                <Row className='py-3'>
                                    <Col xs='12'>
                                        <Row>
                                            <Col xs='11'>
                                                <Nav defaultActiveKey="/home" as="ul">
                                                    {
                                                        tabs.map(singleTab => (
                                                            <Nav.Item key={singleTab.name} as="li">
                                                                <a role='button' className='nav-link capitalize' name={singleTab.name}
                                                                    onClick={(e) => (handleTab(e.target.name))} >{singleTab.name}</a>
                                                            </Nav.Item>
                                                        ))
                                                    }
                                                </Nav>
                                            </Col>
                                            <Col xs='1'>
                                                <IconContext.Provider value={{ size: '20' }}>
                                                    <BsSearch role='button' />
                                                    <IoMdMore className='ms-3' role='button' />
                                                </IconContext.Provider>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                        <div className='channel--content'>
                            <Container>
                                <Content currentTab={currentTab} tabs={tabs} showAddNewsForm={showAddNewsForm} setShowAddNewsForm={setShowAddNewsForm} />
                            </Container>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Channel
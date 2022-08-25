import React, { useState, useContext, useEffect } from 'react'
import { Col, Container, Row, Nav, Image } from 'react-bootstrap'
import "../../css/Channel.css"
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
import CollectionContext from '../../context/CollectionContext';
import Subscribe from '../Subscribe';



const Channel = () => {

    let { id: params } = useParams()
    const { auth } = useContext(UserContext)
    const { updateChannel } = useContext(CollectionContext)
    const { channelData, getUserChannel } = useContext(ChannelContext)
    const [isCurrentUser, setIsCurrentUser] = useState(false)
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
                userCollections: channelData?.collections
            },
            {
                key: 'about',
                name: 'about',
                component: AboutContent,
                userInfo: channelData?.user
            }
        ]
    )
    const [showAddNewsForm, setShowAddNewsForm] = useState(false)
    const [showAddCollection, setShowAddCollection] = useState(false)
    const [showEditCollection, setShowEditCollection] = useState(false)

    const handleTab = (name) => {
        setShowAddNewsForm(false)
        setShowAddCollection(false)
        setShowEditCollection(false)
        setCurrentTab(name)
    }

    useEffect(() => {
        setTabs(prev => (
            prev.map(tab => {
                if(tab.key === 'home'){
                    return {
                        ...tab,
                        userNews: channelData?.news
                    }
                }
                else if(tab.key === 'collections') {
                    return {
                        ...tab,
                        userCollections: channelData?.collections
                    }
                }
                else{
                    return {
                        ...tab,
                        userInfo: channelData?.user
                    }
                }
            })
        ))
    }, [channelData?.news, channelData?.user, channelData?.collections])

    useEffect(() => {
        async function getChannel (){
            if(params === "me" || params === auth?._id){
                await getUserChannel(auth?._id)
                setIsCurrentUser(true)
            }
            else {
                await getUserChannel(params)
                setIsCurrentUser(false)
            }
        }

        getChannel()
    }, [params, auth?._id, updateChannel, currentTab])

    useEffect(() => {
        setCurrentTab('home')
    }, [params])

    useEffect(() => {
        console.log(channelData);
    }, [channelData])

    return (channelData?.user) && (
        <>
            <Row>
                <Col xs='12'>
                    <div className='cover_area' style={{backgroundImage: `url('${channelData?.user?.coverPhoto}')`}}></div>
                    <div className='channel--nav'>
                        <Container style={{height: "100%", position: "relative"}}>
                            <div className='channel--profile-picture'>
                                {
                                    channelData?.user?.profilePicture ?
                                    <Image src={channelData?.user?.profilePicture} alt='channel--profile-picture' width='100%' height='100%' />
                                    :
                                    <span>{channelData?.user?.name?.slice(0, 1)}</span>
                                }
                            </div>
                            <Row className='py-3'>
                                <Col xs='10' style={{height: "100%"}}>
                                    <div className='d-flex align-items-end' style={{height: "100%"}}>
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
                                    </div>
                                </Col>
                                <Col xs='2'>
                                    <div className='d-flex flex-column align-items-end justify-content-between' style={{height: "100%"}}>
                                        {
                                            !isCurrentUser &&
                                            <Subscribe userTo={channelData?.user?._id} userFrom={auth?._id} />
                                        }
                                        <IconContext.Provider value={{ size: '20' }}>
                                            <div>
                                                <BsSearch role='button' />
                                                <IoMdMore className='ms-3' role='button' />
                                            </div>
                                        </IconContext.Provider>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className='channel--content'>
                        <Container>
                            <Content isCurrentUser={isCurrentUser} channelData={channelData} currentTab={currentTab} tabs={tabs} showAddNewsForm={showAddNewsForm} setShowAddNewsForm={setShowAddNewsForm} showAddCollection={showAddCollection} setShowAddCollection={setShowAddCollection} showEditCollection={showEditCollection} setShowEditCollection={setShowEditCollection} />
                        </Container>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Channel
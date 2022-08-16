import React, { useState, useEffect, useContext } from 'react'
import { Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap'

import { AiFillPlusCircle } from 'react-icons/ai'
import { FiFolderPlus } from 'react-icons/fi'
import UserContext from '../../context/UserContext'
import AddCollectionForm from './AddCollectionForm'
import AddNewsForm from './AddNewsForm'
import EditCollectionForm from './EditCollectionForm'



const Content = ({ channelData, currentTab, tabs, showAddNewsForm, setShowAddNewsForm, showAddCollection, setShowAddCollection, showEditCollection, setShowEditCollections }) => {

    const {isUserAuthenticated, isCreator} = useContext(UserContext)


    useEffect(() => {
        console.log(currentTab)
        console.log(tabs)
    }, [currentTab, tabs])

    return (
        <div className='py-5'>
            {
                showAddNewsForm ?
                    <Row className='justify-content-center'>
                        <Col xs='12' lg='10'>
                            <AddNewsForm />
                        </Col>
                    </Row>
                    :
                showAddCollection ?
                    <Row className='justify-content-center'>
                        <Col xs='12' lg='10'>
                            <AddCollectionForm data={channelData?.news} />
                        </Col>
                    </Row>
                    :
                showEditCollection ?
                    <Row className='justify-content-center'>
                        <Col xs='12' lg='10'>
                            <EditCollectionForm />
                        </Col>
                    </Row>
                    :
                    <>
                        {
                            (isUserAuthenticated() && isCreator()) &&
                            <Row className='justify-content-end align-items-center'>
                                <Col xs='2'>
                                    <Row className='justify-content-end align-items-center'>
                                        <Col xs='3'>
                                            <OverlayTrigger overlay={<Tooltip>Add News</Tooltip>}>
                                                <span className="d-inline-block">
                                                    <AiFillPlusCircle onClick={() => (setShowAddNewsForm(true))} size={40} role='button' />
                                                </span>
                                            </OverlayTrigger>
                                        </Col>
                                        <Col xs='4'>
                                            <OverlayTrigger overlay={<Tooltip>Add Collection</Tooltip>}>
                                                <span className="d-inline-block">
                                                    <FiFolderPlus onClick={() => (setShowAddCollection(true))} size={35} role='button' />
                                                </span>
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        }
                        <Row>
                            <Col xs='12'>
                                {
                                    tabs.map(singleTab => {
                                        if (singleTab.name === currentTab) {
                                            const Tab = singleTab.component
                                            return <Tab key={singleTab.name} data={singleTab.userNews ?? singleTab.userInfo} />
                                        }
                                        else {
                                            return <div key={singleTab.name}></div>
                                        }
                                    })
                                }
                            </Col>
                        </Row>
                    </>
            }


        </div>
    )
}

export default Content
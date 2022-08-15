import React, { useState, useEffect, useContext } from 'react'
import { Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap'

import { AiFillPlusCircle } from 'react-icons/ai'
import { FiFolderPlus } from 'react-icons/fi'
import AddNewsForm from './AddNewsForm'



const Content = ({ currentTab, tabs, showAddNewsForm, setShowAddNewsForm }) => {



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
                    <>
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
                                                <FiFolderPlus onClick={() => (setShowAddNewsForm(true))} size={35} role='button' />
                                            </span>
                                        </OverlayTrigger>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
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
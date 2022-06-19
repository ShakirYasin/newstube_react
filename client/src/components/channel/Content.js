import React, { useState, useEffect, useContext } from 'react'
import { Col, Row } from 'react-bootstrap'

import { AiFillPlusCircle } from 'react-icons/ai'
import AddNewsForm from './AddNewsForm'



const Content = ({ currentTab, tabs }) => {


    const [showAddNewsForm, setShowAddNewsForm] = useState(false)
    useEffect(() => {
        console.log(currentTab)
        console.log(tabs)
    }, [currentTab, tabs])

    return (
        <div>
            {
                showAddNewsForm ?
                    <AddNewsForm />
                    :
                    <>
                        <Row className='justify-content-end align-items-center'>
                            <Col xs='2'>
                                <div className='add-news d-flex align-items-center justify-content-end'>
                                    <p className='m-0'>Add News</p>
                                    <AiFillPlusCircle onClick={() => (setShowAddNewsForm(true))} size={50} role='button' />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='py-5'>
                                {
                                    tabs.map(singleTab => {
                                        if (singleTab.name === currentTab) {
                                            const Tab = singleTab.component
                                            return <Tab key={singleTab.name} data={singleTab.userNews ? singleTab.userNews : singleTab.userInfo} />
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
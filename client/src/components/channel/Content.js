import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'

const Content = ({ currentTab, tabs }) => {

    useEffect(() => {
        console.log(currentTab)
        console.log(tabs)
    }, [currentTab, tabs])

    return (
        <Row>
            <Col className='p-5'>
                {
                    tabs.map(singleTab => {
                        if (singleTab.name === currentTab) {
                            const Tab = singleTab.component
                            return <Tab key={singleTab.name} />
                        }
                        else {
                            return <div key={singleTab.name}></div>
                        }
                    })
                }
            </Col>
        </Row>
    )
}

export default Content
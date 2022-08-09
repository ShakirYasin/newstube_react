import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Tile from '../Tile'

import "../../css/channel.css"



const HomeContent = ({ data }) => {

    const [sortedData, setSortedData] = useState(null)
    useEffect(() => {
        setSortedData(data?.reverse())
    }, [data])


    return (
        <div>
            <Row>
                {
                    sortedData?.map(news => (
                        <Col key={news._id} xs='12' md='6' lg='4' xxl='3' className='mt-5'>
                            <Tile news={news} />
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default HomeContent
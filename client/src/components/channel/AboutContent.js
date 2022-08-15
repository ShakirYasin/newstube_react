import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'

const AboutContent = ({data}) => {

    useEffect(() => {
        console.log(data)
    },[data])

    return (
        <Row>
            <Col>
                <p>{data?.name}</p>
                <p>{data?.email}</p>
                <p>{data?.description}</p>
                <p>{data?.createdAt}</p>
            </Col>
        </Row>
    )
}

export default AboutContent
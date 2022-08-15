import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

const AboutContent = ({data}) => {

    const [date, setDate] = useState()
    useEffect(() => {
        console.log(data)
        let joinedDate = new Date(data?.createdAt);
        let year = joinedDate.getFullYear();
        const monthName = joinedDate.toLocaleString('default', {
            month: 'long',
          });
        let day = joinedDate.getDate();

        setDate(`${monthName},${day} ${year}`);
    },[data])

    return (
        <Row className='justify-content-between'>
            <Col xs={12} sm={8} md={7}>
                <p>{data?.description}</p>
                <hr />
                <h4>Details</h4>
                <span className='d-block mb-2 mt-2'>For business inquiries: <a className='heading-color' href={`mailto:${data?.email}`}>{data?.email}</a></span>
                <span className='d-block'>Location {data?.location}</span>
            </Col>
            <Col xs={12} sm={8} md={4}>
                <h4 className='mb-2'>Stats</h4>
                <small>Joined on {date}</small>
            </Col>
            <Col xs={12} className='mt-5'>
                <h4 className='mb-2'>Links</h4>
                <a href="#" className='mb-2 d-block heading-color'>Facebook</a>
                <a href="#" className='mb-2 d-block heading-color'>Twitter</a>
                <a href="#" className='mb-2 d-block heading-color'>LinkedIn</a>
            </Col>
        </Row>
    )
}

export default AboutContent
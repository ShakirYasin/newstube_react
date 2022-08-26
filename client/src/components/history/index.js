import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import UserContext from '../../context/UserContext'
import Tile from '../Tile'
import axios from '../axios'
import { Link } from 'react-router-dom'

const History = () => {

    const {auth} = useContext(UserContext)
    const [entireHistory, setEntireHistory] = useState(null)

    useEffect(() => {

        async function getHistory(){
            try {
                const response = await axios.get('/history', 
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `Bearer ${auth?.token}`
                        }
                    }
                )

                setEntireHistory(response?.data[0])
            } catch (error) {
                console.log(error)
            }
        }

        getHistory()
    }, [auth])

    useEffect(() => {
        console.log(entireHistory)
    }, [entireHistory])

  return (
        <div className='position-relative my-5 pt-5'>
            <Container>
                <h2 className='bold montserrat_regular text-center font_48'>History</h2>
                <h6 className='text-center font_16 mt-3'>Recently visited news'</h6>

                {
                    entireHistory?.watchHistory?.length > 0 ?
                    <Row className='mt-5'>
                        {
                            entireHistory?.watchHistory?.map(item => (
                                <Col key={item?._id} xs={12} md={4} lg={3}>
                                    <Link to={`/news/${item.post._id}`}>
                                        <Tile data={item.post} />
                                    </Link>
                                </Col>        
                            ))
                        }
                    </Row>
                    :
                    <div className='mt-3'>
                        <h2 className='text-center font_16'>You haven't visited any news yet...</h2>
                    </div>

                }
            </Container>
        </div>
  )
}

export default History
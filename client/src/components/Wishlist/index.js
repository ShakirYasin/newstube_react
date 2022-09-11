import React, { useContext, useEffect } from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import NewsContext from '../../context/NewsContext'
import Tile from '../Tile/'
import { Link } from 'react-router-dom'


const Wishlist = () => {

    const {news} = useContext(NewsContext)

    const setWishlist = (id) => {

    }

    useEffect(() => {
        console.log(news);
    }, [news])

  return (
    <div>
        <Container className='pt-3'>
            <div className='mt-3'>
                <h4 className='capitalize bold'>All News</h4>
                <Row className='mt-3'>
                {
                    news?.map(item => (
                    <Col xs={12} md={3} className="mb-5">
                        <Tile data={item} />
                    </Col>
                    ))
                }
                </Row>
            </div>
        </Container>
    </div>
  )
}

export default Wishlist
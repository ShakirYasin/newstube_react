import React, { useContext, useEffect } from 'react'
import NewsGroup from '../NewsGroup'
import News from '../../data/News'
import Users from '../../data/Users'
import { Container, Row, Col } from 'react-bootstrap'
import NewsContext from '../../context/NewsContext'
import Tile from '../Tile/'
import { Link } from 'react-router-dom'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'


const Home = () => {

  const {news} = useContext(NewsContext)

  return (
    <div className='m-5'>
      <Container>
        <div className='mt-5 pt-5'>
          <h4 className='capitalize bold'># For you</h4>
          <NewsGroup news={News} users={Users} />
        </div>
        <div className='mt-5'>
          <h4 className='capitalize bold'># Recommended</h4>
          <NewsGroup news={News} users={Users} />
        </div>
        <div className='mt-5'>
          <h4 className='capitalize bold'># Top Picks</h4>
          <NewsGroup news={News} users={Users} />
        </div>
        <div className='mt-5'>
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
      </Container >
    </div >
  )
}

export default Home
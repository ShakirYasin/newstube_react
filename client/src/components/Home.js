import React from 'react'
import NewsGroup from './NewsGroup'
import News from '../data/News'
import { Container } from 'react-bootstrap'


const Home = () => {
  return (
    <div className='m-5'>
      <Container>
        <NewsGroup data={News} />
      </Container>
    </div>
  )
}

export default Home
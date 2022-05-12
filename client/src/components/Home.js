import React from 'react'
import NewsGroup from './NewsGroup'
import News from '../data/News'
import Users from '../data/Users'
import { Container } from 'react-bootstrap'


const Home = () => {
  return (
    <div className='m-5'>
      <Container>
        <div className='mt-5'>
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
      </Container >
    </div >
  )
}

export default Home
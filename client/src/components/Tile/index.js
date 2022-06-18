import React from 'react'
import { Image } from 'react-bootstrap'
import '../../css/tile.css'
import user1 from '../images/users/user1.jpg'


const Tile = () => {
    return (
        <div className='tile'>
            <Image src={user1} alt='thumbnail' width='100%' height='50%' />
        </div>
    )
}

export default Tile
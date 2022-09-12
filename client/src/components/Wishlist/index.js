import React, { useContext, useEffect, useState } from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import NewsContext from '../../context/NewsContext'
import Tile from '../Tile/'
import { Link } from 'react-router-dom'
import WishlistContext from '../../context/WishListContext'


const Wishlist = () => {

    const {getUserWishlist} = useContext(WishlistContext)
    const [data, setData] = useState(null)

    useEffect(() => {
        async function getData(){
            let info = await getUserWishlist()
            setData(info?.wishlist)
        }

        getData()
    }, [])

    useEffect(() => {
        console.log(data);
    }, [data])

  return (
    <div>
        <Container className='pt-5'>
            <div className='mt-3'>
                <h4 className='capitalize bold'>My WishList</h4>
                <Row className='mt-5'>
                {
                    data?.length > 0 &&
                    data?.map(item => (
                    <Col xs={12} md={3} className="mb-5">
                        <Tile data={item.post} />
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
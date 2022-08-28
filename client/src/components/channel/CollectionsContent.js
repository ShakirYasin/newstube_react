import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CollectionContext from '../../context/CollectionContext'
import Tile from '../Tile'
// import '../../css/Channel.css'


const CollectionsContent = ({data}) => {

  // const { getAllCollections } = useContext(CollectionContext)

  const [allCollections, setAllCollections] = useState(null)


  useEffect(() => {
    

    console.log("Collections: ", data)
  }, [data])

  // console.log(allCollections)

  return (
    <div>
      <h3 className="mb-5">All Collections</h3>
      <Row>
        {
          data?.map(collection => (
            <Col key={collection?._id} xs={12} md={3} className="mb-5">
              <Link to={`/collection/${collection?._id}`}>
                <div className='collections--tile'>
                  <div className='content card_box_shadow'>
                    <Tile data={collection} />
                  </div>
                  <span className='layer1 card_box_shadow'></span>
                  <span className='layer2 card_box_shadow'></span>
                </div>
              </Link>
            </Col>
          ))
        }
      </Row>
      {/* <Row key={item?._id}>
        <Col xs={9} md={10}>
          <ListGroup.Item className='d-flex align-items-center gap-3 mb-2 py-3'>
            <Form.Check />
            {
              item?.thumbnail && 
              <Image src={item?.thumbnail} width="60px" height="60px" alt="" />
            }
            {item?.title}
          </ListGroup.Item>
        </Col>
        <Col xs={3} md={2}>
          <div className='d-flex justify-content-center align-items-center'>
            <Button type="button" className='btn_primary'>Edit</Button>
          </div>
        </Col>
      </Row> */}
    </div>
  )
}

export default CollectionsContent
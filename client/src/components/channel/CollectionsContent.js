import React, { useContext, useEffect, useState } from 'react'
import CollectionContext from '../../context/CollectionContext'

const CollectionsContent = ({data}) => {

  const { getAllCollections } = useContext(CollectionContext)

  const [allCollections, setAllCollections] = useState(null)


  useEffect(() => {
    


  }, [getAllCollections()])

  console.log(allCollections)

  return (
    <div>
      <h3 className="mb-4">All Collections</h3>
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
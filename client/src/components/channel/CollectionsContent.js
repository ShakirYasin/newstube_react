import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Dropdown, Row } from 'react-bootstrap'
import { IoMdMore } from 'react-icons/io'
import { Link } from 'react-router-dom'
import CollectionContext from '../../context/CollectionContext'
import UserContext from '../../context/UserContext'
import Tile from '../Tile'
// import '../../css/Channel.css'


const CollectionsContent = ({data, isCurrentUser, handleEdit}) => {

  const [allCollections, setAllCollections] = useState(null)
  const {DeleteACollection, DeleteAllCollections} = useContext(CollectionContext)
  const {isCreator, isUserAuthenticated} = useContext(UserContext)


  // useEffect(() => {
  //   console.log("Collections: ", data)
  // }, [data])


  const deleteCollection = async (id) => {
      const confirm = window.confirm("Confirm Delete?")
      
      if(confirm){
          await DeleteACollection(id)
      }
  }

  const deleteAllCollections = async () => {
      const confirm = window.confirm("Confirm Delete?")
      
      if(confirm){
          await DeleteAllCollections()
      }
  }

  return (
    <div>
      <h3 className="mb-5">All Collections</h3>
      {
        (data?.length > 0 && isCreator() && isUserAuthenticated() && isCurrentUser) &&
        <Row className="justify-content-end mb-5">
          <Col xs={2} className="text-end">
            <Button className="btn_primary" onClick={() => (deleteAllCollections())}>Delete All</Button>
          </Col>
        </Row>
      }
      <Row>
        {
          data?.map(collection => (
            <Col key={collection?._id} xs={12} md={3} className="mb-5">
              <div className='custom-card-wrapper'>
                <Link to={`/collection/${collection?._id}`}>
                  <div className='collections--tile'>
                    <div className='content card_box_shadow'>
                      <Tile dataFor="collection" data={collection} />
                    </div>
                    <span className='layer1 card_box_shadow'></span>
                    <span className='layer2 card_box_shadow'></span>
                  </div>
                </Link>
                <div className="more-icon">
                      <Dropdown className='more-icon-dropdown'>
                          <Dropdown.Toggle>
                              <IoMdMore size={20} role='button' />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                              <Dropdown.Item onClick={() => (handleEdit(collection?._id))}>Edit</Dropdown.Item>
                              <Dropdown.Item onClick={() => (deleteCollection(collection?._id))}>Delete</Dropdown.Item>
                          </Dropdown.Menu>
                      </Dropdown>
                  </div>
              </div>
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
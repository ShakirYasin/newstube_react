import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import CollectionContext from '../../context/CollectionContext'
import UserContext from '../../context/UserContext'
import SingleNews from './SingleNews'
import {IoIosArrowForward} from "react-icons/io"

const SingleCollection = () => {

    let { id: params } = useParams()
    const {auth} = useContext(UserContext)
    const {getSingleCollection} = useContext(CollectionContext)
    const [currentPost, setCurrentPost] = useState(null)

    const [currentCollection, setCurrentCollection] = useState()
    
    const handlePostSelection = (id) => {
        setCurrentPost(id)
    }
    
    useEffect(() => {
        if(params){
            async function fetchData(){
                setCurrentCollection(await getSingleCollection(params))
            }
    
            fetchData()
        }
    }, [params])

    useEffect(() => {
        console.log(currentCollection);
        setCurrentPost(currentCollection?.posts[0]?.postId?._id)
    }, [currentCollection])


  return (
    <Container>
        <Row className="pt-5 justify-content-between">
            <Col xs={12} md={8}>
                <SingleNews postId={currentPost} />
            </Col>
            <Col xs={12} md={3}>
                <div className='pt-5 mt-5 d-flex align-items-center justify-content-end'>
                    <div className='card_box_shadow radius_11 w-100 pt-4 bg-white'>
                        <div className='px-4'>
                            <h3>Collection Queue</h3>
                        </div>
                        <hr />
                        <div className='pb-4'>
                            {
                                currentCollection?.posts?.map(item => (
                                    <div className='d-flex align-items-center justify-content-between hover-light p-3 px-4 cursor-pointer' style={{maxHeight: "80px"}} onClick={() => (handlePostSelection(item?.postId?._id))}>
                                        <div className='d-flex align-items-center gap-3'>
                                            <Image src={item?.postId?.image} width="50px" height="40px" style={{borderRadius: "6px", objectFit: "cover", objectPosition: "top"}} />
                                            <div>
                                                <h6 className="bold">{item?.postId?.title}</h6>
                                                <p className='font_12'>{item?.postId?.description}</p>
                                            </div>
                                        </div>
                                        <div style={{flexShrink: 0}}>
                                            <IoIosArrowForward />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default SingleCollection
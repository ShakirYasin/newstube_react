import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Image, Card, Form, Button } from 'react-bootstrap'
import NewsContext from '../../context/NewsContext'
import UserContext from '../../context/UserContext'
import {FaFacebookF} from 'react-icons/fa'
import {BsTwitter, BsLinkedin, BsCheck2} from 'react-icons/bs'
import {AiFillLike, AiFillBell} from 'react-icons/ai'
import {MdModeComment} from 'react-icons/md'
import {RiShareForwardFill} from 'react-icons/ri'
import { IconContext } from 'react-icons/lib'

import user from "../../images/users/user1.jpg";

import '../../css/News.css'
import { useParams } from 'react-router-dom'
import Subscribe from '../Subscribe'
import SubscriptionContext from '../../context/SubscriptionContext'

const SingleNews = () => {

    let { id: params } = useParams()
    const { auth } = useContext(UserContext);
    const { getSingleNews } = useContext(NewsContext);
    const [currentNewsData, setCurrentNewsData] = useState(null)
    
    useEffect(() => {
        async function fetchData(){
            // #For Farhan
            // -----------------
            setCurrentNewsData(await getSingleNews(params))
            // currentNewsData state is set here
            // it contains an object with 2 more objects
            // they can be accessed by currentNewsData.user & currentNewsData.news
            // these information can be handled and displayed below in JSX (eg: currentNewsData?.user?.name) accordingly 
            // For author and for the news itself

        }

        fetchData()
    }, [params])

    const [date, setDate] = useState()

    useEffect(()=>{

        let joinedDate = new Date(currentNewsData?.news?.createdAt);
        let year = joinedDate.getFullYear();
        const monthName = joinedDate.toLocaleString('default', {
            month: 'long',
        });
        let day = joinedDate.getDate();

        setDate(`${monthName},${day} ${year}`);
    }, [currentNewsData])

  return (
    <Container>
         
        <Row className="my-5 align-items-center">
            <Col xs={12} sm={8} md={8}>
               <Row className="my-5">
                    <Col xs={12} sm={8} md={1}>
                        {
                            currentNewsData?.user?.profilePicture ?
                            <Image src={currentNewsData?.user?.profilePicture} alt="Thumbnail" width="50" height="50" roundedCircle/>
                            :
                            <Image src="https://www.grids-hub.com/new_images/Avatars/Abdullah.png" alt="Thumbnail" width="50" height="50" roundedCircle/>
                        }
                    </Col>
                    <Col xs={12} sm={8} md={11}>
                        <p className='bold'>{currentNewsData?.user?.name}</p>
                        <span>{date}</span> <span>.</span> <p className='d-inline'>7 min read</p>
                    </Col>
               </Row>
            </Col>
            <Col xs={12} sm={8} md={2} className='text-end'>
                <IconContext.Provider value={{ size: 20, color: "#787878" }} >
                    <FaFacebookF className='me-3'/>
                    <BsTwitter className='me-3' />
                    <BsLinkedin className='me-3' />
                </IconContext.Provider>
            </Col>
            <Col xs={12} sm={8} md={2} className='text-end'>
                <Subscribe userTo={currentNewsData?.user?._id} userFrom={auth?._id} />
            </Col>
        </Row>

        <Row className='my-5'>
            <Col sm={12}>
                <h1>{currentNewsData?.news?.title}</h1>
                {
                    currentNewsData?.news?.image ?
                    <Image className='my-3' src={currentNewsData?.news?.image} height="" width="100%" alt="" />
                    :
                    ""
                }
            </Col>
            <Col sm={12}>
                <p className='justify-text mt-3'>{currentNewsData?.news?.description}</p>
            </Col>

            <Col xs={12}>
            {
                currentNewsData?.news?.audio ?
                <audio style={{backgroundColor: "#060b26", width: "100%"}} className="radius_15 my-5" controls>
                    <source src={currentNewsData?.news?.audio} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                </audio>
            :
            ""
            }

             {
                currentNewsData?.news?.video ?
                <video style={{width: "100%"}} className="radius_15 my-5" controls>
                    <source src={currentNewsData?.news?.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video> 
                :
                ""
             } 
            </Col>
        </Row>

        <Row className='my-5'>
            <Col sm={12}>
                <Card className='radius_15'>
                    <Card.Body>
                        <IconContext.Provider value={{ size: 25, color: "#787878" }} >
                            <AiFillLike /> <span className='me-3'>(128 Likes)</span>
                            <MdModeComment className='me-3' />
                            <RiShareForwardFill />
                        </IconContext.Provider>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={12} className="mt-3">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control className='radius_15 p-3' as="textarea" placeholder="Leave a comment here" style={{ height: '200px' }}
                        />
                    </Form.Group>
                    <Button className='btn_primary' type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>

        <Row className='my-3'>
            <Col sm={12}>
                <Card className='mt-3 radius_15'>
                    <Card.Body>
                        <Row className='align-items-center'>
                            <Col xs={12} sm={8} md={1} className='pe-0' >
                                <Image src="https://miro.medium.com/fit/c/48/48/1*RN7jBa57oDtGv-30-1HMPA.png" alt="Thumbnail" width="70" height="70" roundedCircle/>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                                <span><small className="font-weight-bold text-primary">james_olesenn</small></span>
                            </Col>
                            <Col xs={12} sm={12} md={9}>
                                <small className="font-weight-bold">Hmm, This poster looks cool</small>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card className='mt-3 radius_15'>
                    <Card.Body>
                        <Row className='align-items-center'>
                            <Col xs={12} sm={8} md={1} className='pe-0' >
                                <Image src="https://miro.medium.com/fit/c/48/48/1*RN7jBa57oDtGv-30-1HMPA.png" alt="Thumbnail" width="70" height="70" roundedCircle/>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                                <span><small className="font-weight-bold text-primary">james_olesenn</small></span>
                            </Col>
                            <Col xs={12} sm={12} md={9}>
                                <small className="font-weight-bold">Hmm, This poster looks cool</small>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card className='mt-3 radius_15'>
                    <Card.Body>
                        <Row className='align-items-center'>
                            <Col xs={12} sm={8} md={1} className='pe-0' >
                                <Image src="https://miro.medium.com/fit/c/48/48/1*RN7jBa57oDtGv-30-1HMPA.png" alt="Thumbnail" width="70" height="70" roundedCircle/>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                                <span><small className="font-weight-bold text-primary">james_olesenn</small></span>
                            </Col>
                            <Col xs={12} sm={12} md={9}>
                                <small className="font-weight-bold">Hmm, This poster looks cool</small>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default SingleNews
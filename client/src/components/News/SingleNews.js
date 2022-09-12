import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Container, Row, Image, Card, Form, Button } from 'react-bootstrap'
import NewsContext from '../../context/NewsContext'
import UserContext from '../../context/UserContext'
import {FaFacebookF} from 'react-icons/fa'
import {BsTwitter, BsLinkedin, BsCheck2, BsReply} from 'react-icons/bs'
import {AiFillLike, AiFillBell, AiOutlineLike} from 'react-icons/ai'
import {MdModeComment} from 'react-icons/md'
import {RiShareForwardFill} from 'react-icons/ri'
import { IconContext } from 'react-icons/lib'
import {CgMoreVerticalAlt} from 'react-icons/cg'

import user from "../../images/users/user1.jpg";

import '../../css/News.css'
import { useParams } from 'react-router-dom'
import Subscribe from '../Subscribe'
import SubscriptionContext from '../../context/SubscriptionContext'
import CommentContext from '../../context/CommentContext'
import SingleComment from './SingleComment'
import axios from '../axios'


const SingleNews = ({postId}) => {

    let { id: params } = useParams()
    const { auth } = useContext(UserContext);
    const { getSingleNews } = useContext(NewsContext);
    const {setComment, getAllComments, count, deleteSingleComment} = useContext(CommentContext)
    const [currentNewsData, setCurrentNewsData] = useState(null)
    const [formValues, setFormValues] = useState({
        parentCommentId: "",
        comment: ""
    })
    const [allComments, setAllComments] = useState(null)
    const [showMainComment, setShowMainContent] = useState(false)
    const scrollRef = useRef()
    
    function handleChange(name, value){
        setFormValues(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!formValues.parentCommentId){
            setComment({
                postId: currentNewsData?.news?._id,
                comment: formValues.comment,  
            })
        }
        else {
            setComment({
                postId: currentNewsData?.news?._id,
                comment: formValues.comment,  
                parentCommentId: formValues.parentCommentId
            })
        }
    }

    function deleteComment(id){
        deleteSingleComment(id)
    }

    useEffect(() => {

        setFormValues({
            parentCommentId: "",
            comment: ""
        })

        async function fetchData(id){
            setCurrentNewsData(await getSingleNews(id))
        }

        if(postId){
            fetchData(postId)
        }
        else {
            fetchData(params)
        }
    }, [params, postId])

    useEffect(() => {
        if(currentNewsData?.news?._id === params){
            async function setHistory(){
                try {
                    const response = await axios.post('/history', 
                        JSON.stringify({postId: currentNewsData?.news?._id}),
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: `Bearer ${auth?.token}`
                            }
                        }
                    )
                } catch (error) {
                    console.log(error?.message)
                }
            }
    
            setHistory()
        }
    }, [currentNewsData?.news?._id])

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

    useEffect(() => {
        async function getComments() {
            setAllComments(await getAllComments(currentNewsData?.news?._id))
        }

        getComments()
    }, [currentNewsData?.news, count])

    // useEffect(() => {
    //     if(count != 0){
    //         scrollRef.current?.scrollIntoView({behavior: "smooth"})
    //     }
    // }, [count])

    // useEffect(() => {
    //     console.log(allComments)
    // }, [allComments])

  return (
    <Container>
         
        <Row className="my-5 align-items-center">
            <Col xs={12} sm={8} md={postId ? 7 : 8}>
               <Row className="my-5">
                    <Col xs={12} sm={8} md={postId ? 2 : 1}>
                        {
                            currentNewsData?.user?.profilePicture ?
                            <Image src={currentNewsData?.user?.profilePicture} alt="Thumbnail" width="50" height="50" roundedCircle/>
                            :
                            <Image src="/avatar.jpg" alt="Thumbnail" width="50" height="50" roundedCircle/>
                        }
                    </Col>
                    <Col xs={12} sm={8} md={postId ? 10 : 11}>
                        <p className='bold'>{currentNewsData?.user?.name}</p>
                        <span>{date}</span> <span>.</span>
                        {/* <p className='d-inline'>7 min read</p> */}
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
            <Col xs={12} sm={8} md={postId ? 3 : 2} className='text-end'>
                {
                    auth?._id === currentNewsData?.user?._id ?
                    <></>
                    :
                    <Subscribe userTo={currentNewsData?.user?._id} userFrom={auth?._id} />
                }
            </Col>
        </Row>

        <Row className='my-5'>
            <Col sm={12}>
                <h1>{currentNewsData?.news?.title}</h1>
                {
                    currentNewsData?.news?.image ?
                    <Image className='my-3' src={currentNewsData?.news?.image} height="" width="100%" alt="" />
                    :
                    <></>
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
                            {/* <AiFillLike /> <span className='me-3'>(128 Likes)</span> */}
                            <MdModeComment className='me-3' onClick={() => (setShowMainContent(prev => !prev))} />
                            {/* <RiShareForwardFill /> */}
                        </IconContext.Provider>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={12} className="mt-3">
                {
                    showMainComment &&
                    <Form onSubmit={(e) => (handleSubmit(e))}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Comment *</Form.Label>
                            <Form.Control className='radius_15 p-3' required as="textarea" name="comment" value={formValues.comment} onChange={(e) => (handleChange(e.target.name, e.target.value)) } placeholder="Leave a comment here" style={{ height: '200px' }}
                            />
                        </Form.Group>
                        <Button className='btn_primary' type="submit">
                            Submit
                        </Button>
                    </Form>
                }
            </Col>
        </Row>


        {/* Comments */}
        <Row className='my-3'>
            <Col sm={12}>
                <h3>Comments</h3>
                <hr className='mb-5' />
                {
                    allComments?.map(comment => (
                        <div key={comment?._id}>
                            <SingleComment comment={comment?.comment} postId={currentNewsData?.news?._id} user={comment?.user} parentComment={comment?._id} data={comment} deleteComment={deleteComment} />
                            {
                                comment?.children.length > 0 &&
                                comment?.children?.map(childComment => (
                                    <SingleComment key={childComment?._id} comment={childComment?.comment?.comment} postId={currentNewsData?.news?._id} user={childComment?.comment?.user} parentComment={comment?._id} data={childComment} deleteComment={deleteComment} />
                                ))
                            }
                        </div>
                    ))
                }
            </Col>
        </Row>
        <div ref={scrollRef} style={{height: "100px", width: "100%"}} />
    </Container>
  )
}

export default SingleNews
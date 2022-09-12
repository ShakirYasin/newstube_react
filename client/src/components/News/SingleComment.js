import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, Row } from 'react-bootstrap'
import { AiOutlineLike } from 'react-icons/ai'
import { BsReply } from 'react-icons/bs'
import { CgMoreVerticalAlt } from 'react-icons/cg'
import CommentContext from '../../context/CommentContext'

const SingleComment = ({comment, user, parentComment, postId, data}) => {

    const [enableReply, setEnableReply] = useState(false)
    const [formValues, setFormValues] = useState({
        comment: ""
    })
    const {setComment} = useContext(CommentContext)


    const handleEnableReply = () => {
        setFormValues({
            comment: ""
        })
        setEnableReply(true)
    }

    const handleDisableReply = () => {
        setFormValues({
            comment: ""
        })
        setEnableReply(false)
    }

    const handleChange = (name, value) => {
        setFormValues(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    function handleSubmit(e){
        e.preventDefault()
        handleDisableReply()
        setComment({
            postId: postId,
            comment: formValues.comment,  
            parentCommentId: parentComment
        })
    }


  return (
    <>
        <Card className={`${!data?.children ? 'childComment' : ''} mt-3 radius_15 ms-auto`}>
            <Card.Body>
                <Row>
                    <Col xs={12} sm={8} md={11} className='pe-0' >
                        <div className="d-flex gap-4">
                            {
                                user?.profilePicture ?
                                <Image src={user?.profilePicture} alt="Thumbnail" width="50" height="50" roundedCircle/>
                                :
                                <Image src="/avatar.jpg" title="user icons" alt="Thumbnail" width="50" height="50" roundedCircle/>
                            }
                            <div className='d-flex flex-column'>
                                <p><small className="fw-bold primary-2">{user?.name}</small></p>
                                <p><small className="secondary">{comment}</small></p>
                                <div className='d-flex mt-2 gap-3'>
                                    {/* <div className='d-flex align-items-center cursor-pointer'>
                                        <AiOutlineLike />
                                        <span className='font_12 mt-1'>Like</span>
                                    </div> */}
                                    <div className='d-flex align-items-center cursor-pointer' onClick={handleEnableReply}>
                                        <BsReply />
                                        <span className='font_12 mt-1'>Reply</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={1}>
                        <div className='text-end'>
                            <CgMoreVerticalAlt size={20} className="cursor-pointer" />
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        {
            enableReply &&
            <Form onSubmit={(e) => (handleSubmit(e))} className="childComment ms-auto mt-3">
                <Form.Group>
                    <Form.Control className='radius_15 p-3' as="textarea" name="comment" value={formValues.comment} onChange={(e) => (handleChange(e.target.name, e.target.value)) } placeholder="Leave a comment here" style={{ height: '100px' }}
                    />
                </Form.Group>
                <div className='d-flex gap-4 ms-3'>
                    <Button className='btn_secondary mt-3' type="button" onClick={handleDisableReply}>
                        Cancel
                    </Button>
                    <Button className='btn_primary mt-3' type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        }
    </>
  )
}

export default SingleComment
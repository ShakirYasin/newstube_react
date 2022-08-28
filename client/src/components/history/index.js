import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { IoMdMore } from 'react-icons/io'
import UserContext from '../../context/UserContext'
import Tile from '../Tile'
import axios from '../axios'
import { Link } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'

const History = () => {

    const {auth} = useContext(UserContext)
    const [entireHistory, setEntireHistory] = useState(null)
    const [updateHistory, setUpdateHistory] = useState(null)

    useEffect(() => {

        async function getHistory(){
            try {
                const response = await axios.get('/history', 
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `Bearer ${auth?.token}`
                        }
                    }
                )

                setEntireHistory(response?.data[0])
                console.log(response?.data[0]);
            } catch (error) {
                console.log(error)
            }
        }

        getHistory()
    }, [auth, updateHistory])

    const deleteHistory = async (id) => {
        setUpdateHistory(null)
        const confirm = window.confirm("Confirm Delete?")
        
        if(confirm){
            try {
                const response = await axios.delete(`/history/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `Bearer ${auth?.token}`
                        }
                    }
                )
                setUpdateHistory(response?.data)
            } catch (error) {
                setUpdateHistory(null)
            }
        }
    }

    const deleteEntireHistory = async () => {
        setUpdateHistory(null)
        const confirm = window.confirm("Confirm Delete Entire History?")
        
        if(confirm){
            try {
                const response = await axios.delete('/history',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `Bearer ${auth?.token}`
                        }
                    }
                )
                setUpdateHistory(response?.data)
            } catch (error) {
                setUpdateHistory(null)
            }
        }
    }

    useEffect(() => {
        console.log(entireHistory)
    }, [entireHistory])

  return (
        <div className='position-relative my-5 pt-5'>
            <Container>
                <h2 className='bold montserrat_regular text-center font_48'>History</h2>
                <h6 className='text-center font_16 mt-3'>Recently visited news'</h6>
                {
                    entireHistory?.watchHistory?.length > 0 &&
                    <Row className="justify-content-end">
                        <Col xs={1}>
                            <div className='ms-auto' style={{width: "max-content"}}>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>Clear History</Tooltip>}
                                    >
                                    <div className='border border-2 border-dark p-2' style={{borderRadius: "50%"}}>
                                        <MdDelete role="button" size={30} onClick={deleteEntireHistory} />
                                    </div>
                                </OverlayTrigger>
                            </div>
                        </Col>
                    </Row>
                }

                {
                    entireHistory?.watchHistory?.length > 0 ?
                    <Row className='mt-5'>
                        {
                            entireHistory?.watchHistory?.map(item => (
                                <Col key={item?._id} xs={12} md={4} lg={3} className="mb-4">
                                    <div className='custom-card-wrapper'>
                                        <Link to={`/news/${item.post._id}`}>
                                            <Tile data={item.post} />
                                        </Link>
                                        <div className="more-icon">
                                            <Dropdown className='more-icon-dropdown'>
                                                <Dropdown.Toggle>
                                                    <IoMdMore size={20} role='button' />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => (deleteHistory(item.post._id))}>Delete</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </Col>        
                            ))
                        }
                    </Row>
                    :
                    <div className='mt-3'>
                        <h2 className='text-center font_16'>You haven't visited any news yet...</h2>
                    </div>

                }
            </Container>
        </div>
  )
}

export default History
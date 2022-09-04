import React, { useContext, useEffect, useState } from 'react'
import { Col, Dropdown, Row } from 'react-bootstrap'
import Tile from '../Tile'

import "../../css/Channel.css"
import { Link } from 'react-router-dom'
import { IoMdMore } from 'react-icons/io'
import NewsContext from '../../context/NewsContext'



const HomeContent = ({ data, handleEdit }) => {

    const {DeleteAPost} = useContext(NewsContext)

    const [sortedData, setSortedData] = useState(null)
    useEffect(() => {
        setSortedData(data)
    }, [data])

    const deletePost = async (id) => {
        const confirm = window.confirm("Confirm Delete?")
        
        if(confirm){
            await DeleteAPost(id)
        }
    }


    return (
        <div>
            <Row>
                {
                    sortedData?.map(news => (
                        <Col key={news._id} xs='12' md='6' lg='4' xxl='3' className='mt-5'>
                            <div className='custom-card-wrapper'>
                                <Link to={`/news/${news?._id}`}>
                                    <Tile data={news} />
                                </Link>
                                <div className="more-icon">
                                    <Dropdown className='more-icon-dropdown'>
                                        <Dropdown.Toggle>
                                            <IoMdMore size={20} role='button' />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => (handleEdit(news?._id))}>Edit</Dropdown.Item>
                                            <Dropdown.Item onClick={() => (deletePost(news?._id))}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default HomeContent
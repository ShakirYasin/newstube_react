import { useEffect, useState } from 'react';
import {Col, Image, Row} from 'react-bootstrap'
import { IoIosShareAlt } from 'react-icons/io';
import '../../css/Cards.css'

const CardHorzLarge = ({data}) => {


    const wholeText = data.description
    var excerpt = '';

    if(wholeText.length > 200){
        excerpt = wholeText.substring(0,150) + "..."
    }

  return (
    <div className='p-3 bg-white radius_15'>
        <Row>
            <Col xs='12' xl='6'>
                <Image src={data.thumbnail} alt={data.authorName} className='horz_large_thumb' />
            </Col>
            <Col xs='12' xl='6' className='p-3 pb-0'>
                <h3 className='pb-3 primary bold montserrat_regular'>
                    {data.title}
                </h3>
                <p className='secondary font_15'>
                    {excerpt}
                </p>
                <div className='d-flex align-items-center'>
                    <Image src={data.channelThumbnail} alt={data.authorName} width={50} height={50} className='avatar'/>
                    <div className='px-3'>
                        <p className='font_15 bold primary m-0'>{data.authorName}</p>
                        <p className='font_14  secondary m-0'>{data.date}</p>
                    </div>
                    <IoIosShareAlt size={20} role='button' className='flex-grow-1 secondary'/>
                </div> 
            </Col>
        </Row>
    </div>
  )
}

export default CardHorzLarge
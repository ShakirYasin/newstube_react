// import { useEffect, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap'
import { IoIosShareAlt } from 'react-icons/io';

const CardHorzLarge = ({ data, orientation }) => {


    const wholeText = data.description
    const wholeTitle = data.title
    var excerpt = '';
    var titleExcerpt = '';

    if (wholeText.length > 200) {
        excerpt = orientation === 'horzLg' ? wholeText.substring(0, 150) + "..." : wholeText.substring(0, 60) + "..."
    }
    if (wholeTitle.length > 10) {
        titleExcerpt = wholeTitle.substring(0, 150) + "...";
    }

    return (
        <div className='p-3 bg-white radius_15 card_box_shadow'>
            <Row className='align-items-center'>
                <Col xs='12' xl={`${orientation === 'horzLg' ? '6' : orientation === 'vertLg' && '12'}`}>
                    <Image src={data.thumbnail} alt={data.authorName} className={orientation === 'horzLg' ? 'horz_large_thumb' : orientation === 'vertLg' && 'vert_thumb'} />
                </Col>
                <Col xs='12' xl={`${orientation === 'horzLg' ? '6' : orientation === 'vertLg' && '12'}`} className='p-3 pb-0'>
                    <h3 className={`${orientation === 'horzLg' ? 'font_28' : orientation === 'vertLg' && 'font_22 py-2'} pb-3 primary bold montserrat_regular`}>
                        {
                            orientation === 'vertLg' ? titleExcerpt : data.title
                        }
                    </h3>
                    {
                        // orientation === 'horzLg' &&
                        <p className='secondary font_15'>
                            {excerpt}
                        </p>
                    }
                    <div className='py-2 pt-3 d-flex align-items-center'>
                        <Image src={data.channelThumbnail} alt={data.authorName} width={50} height={50} className='avatar' />
                        <div className='px-3'>
                            <p className='font_15 bold primary m-0'>{data.authorName}</p>
                            <p className='font_14  secondary m-0'>{data.date}</p>
                        </div>
                        {
                            orientation === 'horzLg' && <IoIosShareAlt size={20} role='button' className='flex-grow-1 secondary' />
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default CardHorzLarge
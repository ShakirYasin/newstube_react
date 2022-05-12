import { Col, Image, Row } from "react-bootstrap"
import { BsPlayCircle, BsFillEyeFill } from 'react-icons/bs';

const CardVideoOnly = ({ data }) => {

    const title = data.title
    var excerpt = '';

    if (title.length > 10) {
        excerpt = title.substring(0, 25) + "..."
    }
    return (
        <div className='p-2 bg-white radius_15 card_box_shadow'>
            <Row className="align-items-center">
                <Col xs='12' xl='6'>
                    <Image src={data.thumbnail} alt={data.authorName} className='video_card_thumbnail' />
                </Col>
                <Col xs='12' xl='6' className='p-3'>
                    <BsPlayCircle size={25} color='#5474FF' />
                    <h3 className='primary bold montserrat_regular font_22 pt-3'>
                        {excerpt}
                    </h3>
                    <p className='secondary font_15 mt-2'>
                        <BsFillEyeFill size={20} color='grey' /> {data.views}
                    </p>
                </Col>
            </Row>
        </div>
    )
}

export default CardVideoOnly
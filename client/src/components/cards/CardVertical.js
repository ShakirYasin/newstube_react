import { Col, Image, Row } from 'react-bootstrap'

const CardVertical = ({ data }) => {

    const title = data.title
    var excerpt = '';

    if (title.length > 10) {
        excerpt = title.substring(0, 30) + "..."
    }

    return (
        <div className='p-3 bg-white radius_15 card_box_shadow'>
            <Row>
                <Col xs='12' xl='12'>
                    <Image src={data.thumbnail} alt={data.authorName} className='vert_thumb' />
                </Col>
                <Col xs='12' xl='12' className='p-3 pb-0'>
                    <h3 className='font_22 py-2 pb-3 primary bold montserrat_regular'>
                        {excerpt}
                    </h3>
                    {/* {

                        <p className='secondary font_15'>
                            {excerpt}
                        </p>
                    } */}

                </Col>
            </Row>
        </div>
    )
}

export default CardVertical
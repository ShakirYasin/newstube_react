import React from 'react'
import { Col, Row } from 'react-bootstrap'

const CardTextOnly = ({ data }) => {

    const wholeText = data.description
    const wholeTitle = data.title
    var excerpt = '';
    var titleExcerpt = '';

    if (wholeText.length > 200) {
        excerpt = wholeText.substring(0, 120) + "..."
    }
    if (wholeTitle.length > 10) {
        titleExcerpt = wholeTitle.substring(0, 60) + "...";
    }
    return (
        <div className='p-4 bg-white radius_15 card_box_shadow'>
            <Row>
                <Col xs='12'>
                    <h3 className='pb-3 primary bold montserrat_regular font_22'>
                        {titleExcerpt}
                    </h3>
                    <p className='secondary font_15'>
                        {excerpt}
                    </p>
                </Col>
            </Row>
        </div>
    )
}

export default CardTextOnly
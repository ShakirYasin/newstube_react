import React from 'react'
import { Image, Card, Placeholder, Button } from 'react-bootstrap'
import '../../css/tile.css'


const Tile = ({ news }) => {

    return (
        <div className='tile'>
            <Card className='custom-card card_box_shadow'>
                {
                    news?.image ?
                        <Card.Img variant='top' width='100%' height='50%' style={{height: "200px", objectFit: "cover"}} src={news?.image} />
                        :
                        <Card.Img variant='top' src='/placeholder_image.png' width='100%' height='50%' />
                }
                <Card.Body>
                    {
                        news?.title ?
                            <Card.Title>{news?.title}</Card.Title>
                            :
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                    }
                    {
                        news?.description ?
                            <Card.Text>{news?.description}</Card.Text>
                            :
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export default Tile
import React from 'react'
import { Image, Card, Placeholder, Button } from 'react-bootstrap'
import '../../css/tile.css'


const Tile = ({ data }) => {

    return (
        <div className='tile'>
            <Card className='custom-card card_box_shadow'>
                {
                    data?.image || data?.thumbnail ?
                        <Card.Img variant='top' width='100%' height='50%' style={{height: "200px", objectFit: "cover", objectPosition: "top"}} src={data?.image || data?.thumbnail} />
                        :
                        <Card.Img variant='top' src='/placeholder_image.png' width='100%' height='50%' />
                }
                <Card.Body>
                    {
                        data?.title ?
                            <Card.Title>{data?.title}</Card.Title>
                            :
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                    }
                    {
                        data?.description ?
                            <Card.Text>{data?.description}</Card.Text>
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
import { useState } from "react"
import { Col, Row } from "react-bootstrap"
import CardHorzLarge from "./cards/CardHorzLarge"



const NewsGroup = ({data}) => {


    const [horzLarge, setHorzLarge] = useState(data[0])
    const [vertical, setVertical] = useState(data[1])
    const [horzsmall, setHorzSmall] = useState(data[2])
    const [horzTiny, setHorzTiny] = useState(data[3])
    


  return (
    <>
        <Row className="justify-content-between">
            <Col xs='12' md='6' lg='6' xl='9'>
                <CardHorzLarge data={horzLarge} />
            </Col>
            <Col xs='12' md='6' lg='6' xl='2'>
                {/* Categories filter Element */}
            </Col>
        </Row>
        <Row>
            <Col md='6' lg='6' xl='3'>
                {/* vertical news */}
            </Col>
            <Col md='6' lg='6' xl='8' >
                {/* Rest of Elements */}
            </Col>
        </Row>
    </>
  )
}

export default NewsGroup
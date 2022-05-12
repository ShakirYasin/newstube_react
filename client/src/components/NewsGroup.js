import { useState } from "react"
import { Col, Row } from "react-bootstrap"
import CardUser from "./cards/CardUser"
import CardHorzLarge from "./cards/CardHorzLarge"
import CardTextOnly from "./cards/CardTextOnly"
import CardVideoOnly from "./cards/CardVideoOnly"
import CardVertical from "./cards/CardVertical"
import NextButton from "./NextButton"
import PrevButton from "./PrevButton"

import '../css/Cards.css'



const NewsGroup = ({ news, users }) => {


    const [allNews, setAllNews] = useState({
        news1: news[0],
        news2: news[1],
        news3: news[2],
        news4: news[4],
    })
    const [highlightedUser, setHighlightedUser] = useState(users[0])


    function randomNews() {
        for (let singleNews in allNews) {
            let index = news.indexOf(news[Math.floor(Math.random() * news.length)]);
            setAllNews(prev => (
                {
                    ...prev,
                    [singleNews]: news[index]
                }
            ))
        }
    }
    function randomUser() {
        let index = users.indexOf(users[Math.floor(Math.random() * users.length)]);
        setHighlightedUser(users[index])
    }

    function handleNext() {
        randomNews()
        randomUser()
    }


    return (
        <>
            <Row className="justify-content-between mt-3">
                <Col xs='12' md='6' lg='6' xl='9'>
                    <CardHorzLarge data={allNews.news1} orientation='horzLg' />
                </Col>
                <Col xs='12' md='6' lg='6' xl='3'>
                    {/* Categories filter Element */}
                    <CardVertical data={allNews.news3} />
                </Col>
            </Row>
            <Row className="mt-5 justify-content-between">
                <Col md='6' lg='6' xl='3'>
                    {/* vertical news */}
                    <CardHorzLarge data={allNews.news2} orientation='vertLg' />
                </Col>
                <Col md='6' lg='6' xl='9' >
                    {/* Rest of Elements */}
                    <Row className="justify-content-between align-items-center">
                        <Col xs='12' xl='6' className="ms-5">
                            <CardTextOnly data={allNews.news2} />
                        </Col>
                        <Col xs='12' xl='5'>
                            <CardVideoOnly data={allNews.news4} />
                        </Col>
                    </Row>
                    <Row className="justify-content-between mt-5 align-items-center">
                        <Col xs='12' xl='7' className="ms-5">
                            <CardUser data={highlightedUser} />
                        </Col>
                        <Col xs='12' xl='4'>
                            <div className="d-flex align-items-center justify-content-evenly">
                                <PrevButton onClick={handleNext}/>
                                <NextButton onClick={handleNext} />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default NewsGroup
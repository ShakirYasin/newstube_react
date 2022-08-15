import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Image, Card, Form, Button } from 'react-bootstrap'
import NewsContext from '../../context/NewsContext'
import UserContext from '../../context/UserContext'
import {FaFacebookF} from 'react-icons/fa'
import {BsTwitter, BsLinkedin, BsCheck2} from 'react-icons/bs'
import {AiFillLike, AiFillBell} from 'react-icons/ai'
import {MdModeComment} from 'react-icons/md'
import {RiShareForwardFill} from 'react-icons/ri'
import { IconContext } from 'react-icons/lib'



import '../../css/News.css'

const SingleNews = () => {

    const { auth, getMe } = useContext(UserContext);
    const { news } = useContext(NewsContext);
    const [isSubscribed, setIsSubscribed] = useState(false);
    
    const handleSubscribe = () => {
        setIsSubscribed(prev => !prev)
    }

    
    useEffect(() => {
        async function fetchData(){
            // setUserData(await getMe())
        }

        fetchData()
    }, [auth])

  return (
    <Container>
         
        <Row className="my-5 align-items-center">
            <Col xs={12} sm={8} md={8}>
               <Row className="my-5">
                    <Col xs={12} sm={8} md={1}>
                        <Image src="https://miro.medium.com/fit/c/48/48/1*RN7jBa57oDtGv-30-1HMPA.png" alt="Thumbnail" width="50" height="50" roundedCircle/>
                    </Col>
                    <Col xs={12} sm={8} md={11}>
                        <p>Author Name</p>
                        <date>Aug, 11 2022</date> <span>.</span> <p className='d-inline'>7 min read</p>
                    </Col>
               </Row>
            </Col>
            <Col xs={12} sm={8} md={2} className='text-end'>
                <IconContext.Provider value={{ size: 20, color: "#787878" }} >
                    <FaFacebookF className='me-3'/>
                    <BsTwitter className='me-3' />
                    <BsLinkedin className='me-3' />
                </IconContext.Provider>
            </Col>
            <Col xs={12} sm={8} md={2} className='text-end'>
                <IconContext.Provider value={{ size: 20, color: "#FFFFFF" }} >
                    <button className={`${isSubscribed ? 'subscribed' : 'btn_primary'}`} onClick={handleSubscribe}>
                        {isSubscribed ? "Subscribed" : "Subscribe"}
                        {
                            isSubscribed ?
                            <BsCheck2 className='ms-2' />
                            :
                            <AiFillBell className='ms-2'/>
                        } 
                    </button>
                </IconContext.Provider>
            </Col>
        </Row>

        <Row className='my-5'>
            <Col sm={12}>
                <h1>Title goes here...</h1>
                <Image className='my-3' src="https://static.toiimg.com/photo/84475061.cms" height="" width="100%" alt=""/>
            </Col>
            <Col sm={12}>
                <p className='justify-text mt-3'>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec diam ante. Quisque vitae ante sit amet diam fermentum sollicitudin. Fusce non purus at erat eleifend euismod. Pellentesque vitae purus massa. Nunc fringilla nisi libero, pharetra accumsan metus porta dapibus. Phasellus facilisis dolor at magna malesuada viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam mollis eleifend magna, eget varius arcu bibendum eget. Nullam eget convallis enim, non ornare dui. Suspendisse sed sem ac erat dignissim tincidunt eu id diam. Donec eget quam ac velit finibus faucibus. Maecenas at lorem odio. Vivamus sagittis vitae sem in ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus nec libero cursus massa vulputate blandit.

In bibendum dapibus tellus, et posuere nisl ultrices ac. In scelerisque euismod volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et augue sit amet metus dapibus commodo. Fusce scelerisque at ligula eu congue. In posuere, dolor non posuere imperdiet, dolor orci rutrum sem, non congue odio enim nec eros. Integer id ante erat. Fusce in mauris convallis, finibus augue quis, finibus enim. Praesent non cursus nisl, nec vulputate elit. Fusce sed suscipit lectus. Integer vehicula, dolor eu accumsan vestibulum, dolor nisi pellentesque elit, a pulvinar turpis mi ut sapien. Integer sit amet odio a erat accumsan ultrices gravida vel nisl. Etiam varius maximus consectetur. Etiam ultrices, erat vitae eleifend tincidunt, nulla orci pellentesque risus, id lobortis dui risus a ante. Aliquam in dapibus orci, sed pulvinar nulla.

Mauris tincidunt neque in diam commodo facilisis. Nam ullamcorper mauris ac justo egestas, at convallis nibh sollicitudin. Phasellus eget ante in urna accumsan posuere. Morbi finibus eros eget purus mollis, nec mattis nunc commodo. Etiam suscipit tincidunt iaculis. Integer hendrerit ante eget egestas vehicula. Quisque vel nisl id nisi ullamcorper vulputate. Vestibulum scelerisque est posuere interdum elementum. Phasellus pharetra ligula eget purus ultricies, non rhoncus sapien imperdiet.

Nunc posuere enim dolor, ut blandit urna scelerisque in. Etiam eu purus mattis, condimentum urna quis, interdum justo. Nunc orci sapien, efficitur sit amet sollicitudin in, commodo vel libero. In hac habitasse platea dictumst. In ipsum leo, posuere in tortor vestibulum, condimentum lacinia est. Etiam sollicitudin ex nec lectus auctor, ut viverra risus commodo. Nullam mattis scelerisque lacus ac sagittis. Donec tortor est, vestibulum a gravida non, eleifend vel est. Nam molestie mauris non orci vulputate fringilla. Phasellus et blandit diam. Mauris id semper arcu. Suspendisse congue tellus id bibendum dictum. In vitae hendrerit felis, lacinia consectetur velit. Praesent lobortis pellentesque neque sit amet suscipit. Proin tristique arcu a rutrum interdum.

Maecenas eget imperdiet tortor, non porta eros. Morbi urna orci, vestibulum id lacus non, bibendum hendrerit augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam at leo vitae tortor porttitor viverra at nec sem. Aliquam erat volutpat. Fusce et turpis ac diam tincidunt aliquam. Donec vel lorem ultricies, scelerisque lacus vitae, lobortis ex. Duis luctus iaculis accumsan. Aliquam feugiat justo quis semper iaculis. Etiam consequat vitae sem ut blandit. Donec at tempor lectus. Suspendisse luctus sem at erat finibus, at sagittis lectus sodales. Fusce rhoncus volutpat mauris nec facilisis. Vestibulum vel fringilla sapien. </p>
            </Col>

            <Col xs={12}>
            <audio style={{backgroundColor: "#060b26", width: "100%"}} className="radius_15 my-5" controls>
                {/* <source src="horse.ogg" type="audio/ogg" /> */}
                <source src="https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3" type="audio/mpeg" />
                Your browser does not support the audio tag.
            </audio>

             <video style={{width: "100%"}} className="radius_15 my-5" controls>
                <source src="http://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>  
            </Col>
        </Row>

        <Row className='my-5'>
            <Col sm={12}>
                <Card className='radius_15'>
                    <Card.Body>
                        <IconContext.Provider value={{ size: 25, color: "#787878" }} >
                            <AiFillLike /> <span className='me-3'>(128 Likes)</span>
                            <MdModeComment className='me-3' />
                            <RiShareForwardFill />
                        </IconContext.Provider>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={12} className="mt-3">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control className='radius_15 p-3' as="textarea" placeholder="Leave a comment here" style={{ height: '200px' }}
                        />
                    </Form.Group>
                    <Button className='btn_primary' type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>

        <Row className='my-3'>
            <Col sm={12}>
                <Card className='mt-3 radius_15'>
                    <Card.Body>
                        <Row className='align-items-center'>
                            <Col xs={12} sm={8} md={1} className='pe-0' >
                                <Image src="https://miro.medium.com/fit/c/48/48/1*RN7jBa57oDtGv-30-1HMPA.png" alt="Thumbnail" width="70" height="70" roundedCircle/>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                                <span><small class="font-weight-bold text-primary">james_olesenn</small></span>
                            </Col>
                            <Col xs={12} sm={12} md={9}>
                                <small class="font-weight-bold">Hmm, This poster looks cool</small>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card className='mt-3 radius_15'>
                    <Card.Body>
                        <Row className='align-items-center'>
                            <Col xs={12} sm={8} md={1} className='pe-0' >
                                <Image src="https://miro.medium.com/fit/c/48/48/1*RN7jBa57oDtGv-30-1HMPA.png" alt="Thumbnail" width="70" height="70" roundedCircle/>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                                <span><small class="font-weight-bold text-primary">james_olesenn</small></span>
                            </Col>
                            <Col xs={12} sm={12} md={9}>
                                <small class="font-weight-bold">Hmm, This poster looks cool</small>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card className='mt-3 radius_15'>
                    <Card.Body>
                        <Row className='align-items-center'>
                            <Col xs={12} sm={8} md={1} className='pe-0' >
                                <Image src="https://miro.medium.com/fit/c/48/48/1*RN7jBa57oDtGv-30-1HMPA.png" alt="Thumbnail" width="70" height="70" roundedCircle/>
                            </Col>
                            <Col xs={12} sm={12} md={2}>
                                <span><small class="font-weight-bold text-primary">james_olesenn</small></span>
                            </Col>
                            <Col xs={12} sm={12} md={9}>
                                <small class="font-weight-bold">Hmm, This poster looks cool</small>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
  )
}

export default SingleNews
import React, { useContext, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import NewsContext from '../../context/NewsContext'
import UserContext from '../../context/UserContext'

const SingleNews = () => {

    const { auth, getMe } = useContext(UserContext)
  const { news } = useContext(NewsContext);

    
    useEffect(() => {
        async function fetchData(){
            setUserData(await getMe())
        }

        fetchData()
    }, [auth])

  return (
    <Container>
        <Row className="my-5">
            <Col xs={12} sm={8} md={6}>
                
            </Col>
        </Row>
    </Container>
  )
}

export default SingleNews
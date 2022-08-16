import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import CollectionContext from '../../context/CollectionContext'
import { useFileUpload } from '../../hooks/useFileUpload'

const AddCollectionForm = ({data}) => {

  const {AddNewCollection} = useContext(CollectionContext)

  const { upload } = useFileUpload()
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    thumbnail: "",
    news: [],
  })

  const [selectedNews, setSelectedNews] = useState([])

  function handleChange(name, value) {
    setFormValues(prev => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  function handleSelectedNews(el){
    let value = el.target.id
    if(el.target.checked){
      setSelectedNews(prev => (
        [
          ...prev,
          value
        ]
      ))
    }
    else{
      setSelectedNews(prev => (
        prev.filter(item => item !== value)
      ))
    }
  }

  useEffect(() => {
    setFormValues(prev => (
      {
        ...prev,
        news: selectedNews
      }
    ))
  }, [selectedNews])

  const handleUpload = (file) => {
    upload(file, "images", "thumbnail", setFormValues)
}

async function handleSubmit(e) {
  e.preventDefault()
  try {
    const response = await AddNewCollection(formValues)
    console.log(response)

  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  console.log(formValues)
}, [formValues])

  return (
    <div>
      <h3 className="">
        Create New Collection
      </h3>
      <Form className='my-4' onSubmit={(e) => (handleSubmit(e))}>
        <Form.Group className='mb-3'>
          <Form.Label className="font_15">Title</Form.Label>
          <Form.Control value={formValues?.title} name="title" onChange={(e) => (handleChange(e.target.name, e.target.value))} />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className="font_15">Description</Form.Label>
          <Form.Control value={formValues?.description} name="description" onChange={(e) => (handleChange(e.target.name, e.target.value))} />
        </Form.Group>
        <Form.Group className='mb-3' >
          <Form.Label className="font_15">Thumbnail</Form.Label>
          <div className='d-flex gap-5 w-50'>
            <Form.Control 
                className='flex-shrink-1'
                type='file' 
                name="thumbnail"
                onChange={(e) => (handleChange(e.target.name, e.target.files[0]))}
                />
            <Button type="button" className='btn-primary' onClick={() => (handleUpload(formValues?.thumbnail))} >Upload</Button>
          </div>
        </Form.Group>
        <div className='my-4'>
        <p className='p-2 font_14'>Select Posts to add to new collection</p>
            <Row>
                {
                  data?.map(item => (
                    <Col key={item?._id} xs={9} md={4}>
                        <ListGroup>
                          <ListGroup.Item className='d-flex align-items-center gap-3 mb-2 py-3'>
                            <Form.Check id={item?._id} onChange={(e) => (handleSelectedNews(e))} />
                            {
                              item?.thumbnail && 
                              <Image src={item?.thumbnail} width="60px" height="60px" alt="" />
                            }
                            {item?.title}
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                    ))
                  }
              </Row>
        </div>
        <Button className="btn_primary" type="submit" >Submit</Button>
      </Form>
    </div>
  )
}

export default AddCollectionForm
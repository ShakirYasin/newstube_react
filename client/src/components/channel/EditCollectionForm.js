import React, { useContext, useEffect, useRef, useState } from 'react'
import { Alert, Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import CollectionContext from '../../context/CollectionContext'
import { useFileUpload } from '../../hooks/useFileUpload'

const EditCollectionForm = ({collectionId, news}) => {

  const { getSingleCollection, UpdateACollection } = useContext(CollectionContext)

  const { upload } = useFileUpload()

  const [formValues, setFormValues] = useState(null)
  const [selectedNews, setSelectedNews] = useState([])
  const messageDiv = useRef(null)


  useEffect(() => {
        
    const getData = async () => {
        const collection = await getSingleCollection(collectionId)
        const postIds = collection?.posts?.map(post => post.postId._id)
        setFormValues({
            title: collection.title,
            description: collection.description,
            thumbnail: collection.thumbnail,
            news: postIds,
        })
        setSelectedNews(postIds)
    }

    getData()

}, [collectionId])


  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  
  
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

  // function checkIfExists(id){
  //   if(selectedNews.includes(id.toString())){
  //     console.log(id + ": " + true)
  //     return true
  //   }
  //   else {
  //     console.log(id + ": " + false)
  //     return false
  //   } 
  // }

  useEffect(() => {
    setFormValues(prev => (
      {
        ...prev,
        news: selectedNews
      }
    ))
  }, [selectedNews])

  const handleUpload = (file) => {
    if(!file){
      setError(true)
      setErrorMsg("Please Select an Image")
    }
    else{
      upload(file, "images", "thumbnail", setFormValues)
    }
  }


async function handleSubmit(e) {
  e.preventDefault();
  setError(false)
  setSuccess(false)
  setErrorMsg("")

  if(formValues.title === "" || formValues.description === "" || formValues.thumbnail === ""){
    setError(true)
    setErrorMsg("Please fill all fields")
  }
  else if(formValues?.thumbnail !== "" && formValues?.thumbnail instanceof File){
    setError(true)
    setErrorMsg("Please Upload an Image and Click 'Upload'...")
  }
  // else if(typeof formValues.thumbnail !== String){
  //   setError(true)
  //   setErrorMsg("Please click 'Upload' to upload the image...")
  // }
  else if( !formValues.news.length > 0){
    setError(true)
    setErrorMsg("Please Select at least 1 post")
  }
  else {
    try {
      const response = await UpdateACollection(collectionId, formValues)
      console.log(response)
      setSuccess(true)
      
    } catch (error) {
      console.log(error)
      setError(true)
      setErrorMsg(error?.message)
    }
    messageDiv.current.scrollIntoView({behavior: "smooth"})
  }

}

useEffect(() => {
  console.log(selectedNews)
}, [selectedNews])

  return (
    <div style={{position: "relative"}} >
      <div ref={messageDiv} style={{position: "absolute", top: "-150px"}} />
      <h3 className="">
        Update <i className='bold'>{formValues?.title}</i>
      </h3>
      <Form className='my-4' onSubmit={(e) => (handleSubmit(e))}>
        {
          success &&
          <Alert variant='success'>
            Collection has been updated Successfully
          </Alert>
        }
        {
          error &&
          <Alert variant='danger'>
            {errorMsg}
          </Alert>
        }
        <Form.Group className='mb-3'>
          <Form.Label className="font_15">Title *</Form.Label>
          <Form.Control required value={formValues?.title || ""} name="title" onChange={(e) => (handleChange(e.target.name, e.target.value))} />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className="font_15">Description *</Form.Label>
          <Form.Control required value={formValues?.description || ""} name="description" onChange={(e) => (handleChange(e.target.name, e.target.value))} />
        </Form.Group>
        <Form.Group className='mb-3' >
          <Form.Label className="font_15">Thumbnail *</Form.Label>
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
                  selectedNews.length > 0 &&
                  news?.map(item => (
                    <Col key={item?._id} xs={9} md={4}>
                        <ListGroup>
                          <ListGroup.Item className='d-flex align-items-center gap-3 mb-2 py-3'>
                            <Form.Check id={item?._id} checked={selectedNews.includes(item._id)} onChange={(e) => (handleSelectedNews(e))} />
                            {
                              item?.image ? 
                              <Image src={item?.image} width="60px" height="60px" alt="" style={{objectFit: "cover"}} />
                              :
                              <Image src="/placeholder_image.png" width="60px" height="60px" alt="" style={{objectFit: "cover"}} />
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

export default EditCollectionForm
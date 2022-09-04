import React, { useState, useContext, useEffect } from 'react'
import { Alert, Button, Form, Image } from 'react-bootstrap'
import NewsContext from '../../context/NewsContext'
import { useFileUpload } from '../../hooks/useFileUpload'

const EditNewsForm = ({newsId}) => {

    const { upload } = useFileUpload()
    const {UpdateAPost, getSingleNews} = useContext(NewsContext)
    // const {setNewUserPost} = useContext(NewsContext)
    const [data, setData] = useState(null);
    const [successMsg, setSuccessMsg] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        
        const getData = async () => {
            const {news} = await getSingleNews(newsId)
            setData({
                title: news.title,
                description: news.description,
                image: news.image
            })
        }

        getData()

    }, [newsId])

    const handleChange = (name, value) => {
        setData(prev => (
            {
                ...prev,
                [name]: value
            }
        ));
    };

    const handleUpload = (file) => {
        upload(file, "images", "image", setData)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrMsg("")
        setSuccessMsg("")
      
        if(data?.title === "" || data?.description === "" || data?.image === ""){
          setErrMsg("Please fill all fields")
        }
        else if(data?.image !== "" && data?.image instanceof File){
          setErrMsg("Please Upload an Image and Click 'Upload'...")
        }
        else {
          try {
            const response = await UpdateAPost(newsId, data)
            console.log(response)
            setSuccessMsg("News Updated Successfully")
      
          } catch (error) {
            console.log(error)
            setErrMsg(error?.message)
          }
        }
      
      }

    useEffect(() => {
        console.log(data)
    }, [data])

  return (
        <Form onSubmit={(e) => (handleSubmit(e))}>
            {
                successMsg &&
                <Alert key='success' variant='success'>
                    {successMsg}
                </Alert>
            }
            {
                errMsg &&
                <Alert key='danger' variant='danger'>
                    {errMsg}
                </Alert>
            }
            <h4 className='mb-3'>Update Post</h4>
            <fieldset disabled={!data}>
                <Form.Floating>
                    <Form.Control required type='text' value={data?.title || ""} id='newsTitle' name='title' placeholder='Title' className='mb-3' onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                    <label htmlFor="newsTitle">Title *</label>
                </Form.Floating>
                <Form.Floating>
                    <Form.Control as='textarea' value={data?.description || ""} required id='newsDescription' name='description' placeholder='Description' className='mb-3' style={{ height: '300px' }} onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                    <label htmlFor="newsDescription">Description *</label>
                </Form.Floating>
                <Form.Group>
                    <Form.Label className="bold">Thumbnail *</Form.Label>
                    <div className='d-flex gap-5 w-50 mb-3'>
                        <Form.Control 
                            className='flex-shrink-1'
                            type='file' 
                            required
                            onChange={
                                (e) => (
                                    setData((prev) => 
                                    ({...prev, image: e.target.files[0]}))
                                    )}
                                    />
                        <Button type="button" onClick={() => (handleUpload(data?.image))} >Upload</Button>
                    </div>
                    <Image src={data?.image || ""} width={100} height={100} alt="" roundedCircle />
                </Form.Group>
                <Button type='submit' className='btn_primary mt-4'>Submit</Button>
            </fieldset>
        </Form>
  )
}

export default EditNewsForm
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import axios from '../axios'
import FileInput from '../FileInput'

const NEWS_URL = '/posts'
const AddNewsForm = () => {

    const [data, setData] = useState({
        title: "",
        description: "",
        image: "",
    });

    const handleChange = (name, value) => {
        setData(prev => (
            {
                ...prev,
                [name]: value
            }
        ));
    };

    const handleInputState = (name, value) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Form>
            <h4 className='mb-3'>New Post</h4>
            <Form.Floating>
                <Form.Control type='text' id='newsTitle' name='title' placeholder='Title' className='mb-3' onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                <label htmlFor="newsTitle">Title</label>
            </Form.Floating>
            <Form.Floating>
                <Form.Control as='textarea' id='newsDescription' name='description' placeholder='Description' className='mb-3' style={{ height: '300px' }} onChange={(e) => (handleChange(e.target.name, e.target.value))} />
                <label htmlFor="newsDescription">Description</label>
            </Form.Floating>
            <Form.Group>
                <Form.Label>Thumbnail</Form.Label>
                {/* <FileInput
                    name="image"
                    label="Choose Image"
                    handleInputState={handleInputState}
                    type="image"
                    value={data.img}
                /> */}
                <Form.Control type='file' />
            </Form.Group>
        </Form>
    )
}

export default AddNewsForm
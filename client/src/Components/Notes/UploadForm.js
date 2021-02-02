import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './UploadForm.css'
import axios from 'axios';
function UploadForm(props) {
  const token = localStorage.getItem('token');
  const [data, setData] = useState({
    file: '',
    title: '',
    description: '',
  });

  const { file, title, description } = data;

  // making a controlled component
  const onChange = (e) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  const uploadPhoto = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.files[0],
    });
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    console.log(data);
    const formData = new FormData();
    formData.append('asset', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('data', JSON.stringify(formData));
    console.log(formData);
    console.log([...formData]);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log('formdata', formData.get('file'));
    await axios({
      method: 'post',
      url: 'https://studygram-dev.herokuapp.com/api/resource',
      data: formData,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        console.log('hey');
      })
      .catch((error) => {
        console.log(error);
      });
setData({})
    // }
  };
  return (
    <div className="uploadForm">
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className="uploadForm_modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={description}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.File
                id="custom-file-translate-scss"
                label="File"
                lang="en"
                custom
                name="file"
                onChange={(e) => {
                  uploadPhoto(e);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="uploadForm_footer">
          <Button onClick={props.onHide}>Cancel</Button>
          <Button  onClick={(e) => uploadFile(e)}>
            Upload File
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UploadForm;

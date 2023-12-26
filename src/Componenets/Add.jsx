import React from 'react'
import { useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap'
import { uploadNewVideoAPI } from '../services/allAPI'

function Add({setUploadVideoResponse}) {
  const [uploadVideo, setUploadVideo] = useState({
    id: "", caption: "", link: "",url:""
  })
  const [show, setShow] = useState(false);
  console.log(uploadVideo);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //youtube embed link function

  const getYoutubeEmbedLink = (e) => {
    const { value } = e.target
    if (value.includes("v=")) {
      let vID = value.split("v=")[1].slice(0, 11)
      setUploadVideo({ ...uploadVideo, link: `https://www.youtube.com/embed/${vID}` })
    } else {
      setUploadVideo({ ...uploadVideo, link: "" })
    }
  }

  const handleUpload = async () => {
    const { id, caption, url, link } = uploadVideo
    if (!id || !caption || !url || !link) {
      alert("Uploading form is incomplete, Please fill the form correctly!!")
    } else {
      //store upload video in json server
      const result = await uploadNewVideoAPI(uploadVideo)
      console.log(result);
      if (result.status >= 200 && result.status < 300) {
        //success
        handleClose()
        //reset uploadVideo
        setUploadVideo({
          id: "", caption: "", url: "", link: ""
        })
        //share result.data to view component
        setUploadVideoResponse(result.data)
      } else {
        alert(result.message)
      }
    }
  }
  return (
    <>
      <div className="d-flex align-items-center">
        <h5>Upload New Video</h5>
        <button onClick={handleShow} style={{ color: 'white' }} className='btn'><i class="fa-solid fa-photo-film fa-2x"></i></button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload A Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please Fill the Details !!</p>
          <FloatingLabel
            controlId="floatingInput"
            label="Upload Video ID"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="id" onChange={e => setUploadVideo({ ...uploadVideo, id: e.target.value })} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Uploading Video Caption"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="caption" onChange={e => setUploadVideo({ ...uploadVideo, caption: e.target.value })} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Uploading Video Image URL"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="image" onChange={e => setUploadVideo({ ...uploadVideo, url: e.target.value })} />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Uploading Youtube link"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="link" onChange={getYoutubeEmbedLink} />
          </FloatingLabel>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} variant="primary" className='btn btn-info'>Upload</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Add
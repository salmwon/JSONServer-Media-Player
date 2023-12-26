import React, { useEffect, useState } from 'react'
import { Button, Col, FloatingLabel, Form, Modal,Row,Collapse } from 'react-bootstrap'
import { addCategoryAPI, getAVideoAPI, getAllCategoryAPI, removeCategoryAPI, updateCategoryAPI } from '../services/allAPI';
import VideoCard from './VideoCard';
function Category(dropResponse) {
  const [allCategories, setAllCategories] = useState([])
  const [categoryName, setCategoryName] = useState("")
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllCategories()
  }, [dropResponse])
  const getAllCategories = async () => {
    const { data } = await getAllCategoryAPI()
    setAllCategories(data)
  }
  const handleAdd = async () => {
    if (categoryName) {
      const result = await addCategoryAPI({ categoryName, allVideos: [] })
      if (result.status >= 200 && result.status < 300) {
        handleClose()
        setCategoryName("")
        getAllCategories()
      } else {
        alert(result.message)
      }
    } else {
      alert("please fill the form completely")
    }
  }
  const removeCategory = async (id) => {
    await removeCategoryAPI(id)
    getAllCategories()
  }
  const dragOver = (e) => {
    console.log("video card dragging over the category");
    e.preventDefault()
  }
  const videoDrop = async (e, categoryID) => {
    const videoId = e.dataTransfer.getData("videoId")
    console.log("video id:" + videoId + "dropped!!! Inside the Category:" + categoryID);
    const { data } = await getAVideoAPI(videoId)
    console.log(data);
    const selectedCategory = allCategories.find(item => item.id === categoryID)
    selectedCategory.allVideos.push(data)
    await updateCategoryAPI(categoryID,selectedCategory)
    getAllCategories()
  }
  //console.log(allCategories);
  const videoDragStarted =(e,videoId,categoryID)=>{
    let dataShare = {videoId,categoryID}
    e.dataTransfer.setData("data",JSON.stringify(dataShare))
  }
  return (
    <>
      <div className='d-grid'>
        <Button className='btn-info' onClick={handleShow}>
          Category
        </Button>
      </div>
      {
        allCategories?.length > 0 ? allCategories.map(Category => (
          <div className='border rounded p-3 mt-2' droppable="true" onDragOver={e => dragOver(e)} onDrop={e => videoDrop(e, Category?.id)}>
            <div onClick={() => setOpen(!open)} className='d-flex justify-content-between align-items-center'>
              <h6>{Category?.categoryName}</h6>
              <button onClick={() => removeCategory(Category?.id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
            </div>
            <Collapse in={open}>
              <Row>
                {
                  Category?.allVideos?.length>0?Category?.allVideos.map(card=>(
                    <Col draggable onDragStart={e=>videoDragStarted(e,card.id,Category.id)} sm={12} className='mb-2'>
                    <VideoCard video={card} insideCategory={true} />
                    </Col>
                  )):null
                }
              </Row>
            </Collapse>
          </div>
        )) : <p className='fw-bolder fs-5 text-warning mt-2'>No Categories are added yet!!!</p>
      }
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false} centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Category Name"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="name@example.com" onChange={e => setCategoryName(e.target.value)} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} className='btn-info' variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Category
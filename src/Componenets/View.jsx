import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { Row, Col } from 'react-bootstrap'
import { getAllCategoryAPI, getAllVideosAPI,updateCategoryAPI } from '../services/allAPI'

function View({ uploadVideoResponse,setDropResponse }) {
  const [allVideos, setAllVideos] = useState([])
  const [deleteVideoResponse, setDeleteVideoResponse] = useState(false)
  useEffect(() => {
    getAllUploadedVideos()
    setDeleteVideoResponse(false)
  }, [uploadVideoResponse, deleteVideoResponse])
  const getAllUploadedVideos = async () => {
    const result = await getAllVideosAPI()
    if (result.status === 200) {
      console.log(result);
      setAllVideos(result.data)
    } else {
      console.log("API Failed!!!");
      setAllVideos([])
    }
  }
  const dragOver=(e)=>{
    e.preventDefault()
  }
  const videoDropped= async (e)=>{
    const {videoId,categoryID}=JSON.parse(e.dataTransfer.getData("data"))
    const {data}= await getAllCategoryAPI()
    const selectedCategory=data.find(item=>item.id==categoryID)
    let result = selectedCategory.allVideos.filter(video=>video.id!==videoId)
    console.log(result);
    let {id,categoryName}= selectedCategory
    let newCategory={id,categoryName,allVideos:result}
    const res =await updateCategoryAPI(categoryID,newCategory)
    setDropResponse(res)
  }
  return (
    <>
      <Row droppable="true" onDragOver={e=>dragOver(e)} onDrop={(e)=>videoDropped(e)}>{
        allVideos?.length > 0 ? allVideos.map(video => (
          <Col className='mt-5' sm={12} md={6} lg={4} xl={3}>
            <VideoCard setDeleteVideoResponse={setDeleteVideoResponse} video={video} />
          </Col>
        )) : <p className='fs-4 text-warning fw-bolder'>No Videos are Uploaded Here</p>
      }
      </Row>
    </>
  )
}

export default View
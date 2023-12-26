import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getsHistoryAPI, removeHistoryAPI } from '../services/allAPI'


function WatchHistory() {
  const [history, setHistory] = useState([])
  useEffect(() => {
    getsHistory()
  }, [])
  const getsHistory = async () => {
    const result = await getsHistoryAPI()
    if (result.status == 200) {
      setHistory(result.data)
    } else {
      console.log('API Failed');
      console.log(result.message);
    }
  }
  const removeHistoryItem=async(id)=>{
    await removeHistoryAPI(id)
    getsHistory()
  }
  return (
    <>
      <div className="d-flex align-items-center justify-content-between container mt-4">
        <h2>Watch History</h2>
        <Link to={'/home'} style={{ color: 'white', fontSize: '20px' }} className='btn'><i class="fa-solid fa-arrow-left me-2 fa-beat"></i>Back to Home</Link>
      </div>
      <div className='container mt-5'>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Video Caption</th>
              <th>URL</th>
              <th>Time Stamp</th>
              <th><i className='fa-solid fa-ellipsis'></i></th>
            </tr>
          </thead>
          <tbody>
            {history?.length > 0 ? history?.map((video, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{video?.caption}</td>
                <td><a href={video?.link}>{video?.link}</a></td>
                <td>{video?.timeStamp}</td>
                <td><button onClick={()=>removeHistoryItem(video?.id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button></td>
              </tr>
            )) :
              <p className='fw-bolder text-danger fs-4'>Your Watch History is Empty!!</p>
            }
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default WatchHistory
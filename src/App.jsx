
import './App.css'
import Header from './Componenets/Header'
import Footer from './Componenets/Footer'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import WatchHistory from './pages/WatchHistory'


function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/history' element={<WatchHistory />}/>
      </Routes>
      <Footer />

    </>
  )
}

export default App

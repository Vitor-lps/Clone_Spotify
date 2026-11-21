import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {PlayerProvider} from './context/PlayerContext'
import api from './services/api'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import PlayerBar from './components/PlayerBar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Playlist from './pages/Playlist'

function ProtectedRoute({children}) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace/>
}

function AppLayout({children}) {
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    api.get('/playlists')
    .then((res) => setPlaylists(res.data.data))
    .catch(() => {})
  }, [])
  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar playlists={playlists}/>
      <div className='flex min-w-0 flex-1 flex-col'>
        <TopBar/>
        <main className='flex-1 overflow-y-auto'>{children}</main>
        <PlayerBar/>
      </div>
    </div>
  );
}

export default function App() {
  return(
   <PlayerProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/register' element={<Register/>} />

      <Route path='/home' element={<ProtectedRoute>
        <AppLayout>
          <Home/>
        </AppLayout>
      </ProtectedRoute>}/>

      <Route path='/playlist/:id' element={<ProtectedRoute>
        <AppLayout>
          <Playlist/>
        </AppLayout>
      </ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>

    <ToastContainer position='bottom-right' theme='dark'/>
  </PlayerProvider> 
  );
}

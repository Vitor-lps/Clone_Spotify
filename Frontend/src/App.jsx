import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {PlayerProvider} from './context/PlayerContext'
import ProtectedRoute from './components/ProtecaoRoute'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import PlayerBar from './components/PlayerBar'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Playlist from './pages/Playlist'

function AppLayout({children}) {
  return (
    <div className='flex min-h-screen'>
      <Sidebar/>
      <div className='flex min-w-0 flex-1 flex-col'>
        <TopBar/>
        <main className='flex-1'>{children}</main>
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
      <Route path="/login" element={<Login/>}/>
      <Route path='/register' element={<Register/>} />

      <Route path='/' element={<ProtectedRoute>
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

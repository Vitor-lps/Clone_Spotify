import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'

export default function App() {
  return(
    <BrowserRouter>
    <Route path="/login" element={<Login/>}/>
    </BrowserRouter>
  )
}

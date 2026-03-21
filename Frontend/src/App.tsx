import './App.css'
import { Route,Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Blog from './pages/Blog'
function App() {


  return (
     <>
     <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/blog' element={<Blog/>}/>
     </Routes>
     </>
  )
}

export default App

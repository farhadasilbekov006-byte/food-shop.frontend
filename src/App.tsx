import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/Home/home'

function App() {
  return (
   <Routes>
      <Route path='/' element={<HomePage/>} />     
   </Routes>

  )

}
export default App

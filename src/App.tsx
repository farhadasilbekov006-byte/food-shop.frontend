import { Route, Routes } from 'react-router-dom'
import './App.scss'
import { HomePage } from './pages/Home/home'
import { SearchPage } from './pages/Search/search.'
import { FoodPage } from './pages/FoodPage/food'
import { AuthPage } from './pages/Auth/auth'
import { CartPage } from './pages/Cart/Cart'

function App() {
  return (
   <Routes>
      <Route path='/' element={<HomePage/>} />     
      <Route path='/search' element={<SearchPage/>} /> 
      <Route path='/product/:id' element={<FoodPage/>} />   
      <Route path='/auth' element={<AuthPage/>} />    
      <Route path='/cart' element={<CartPage/>} />    
   </Routes>

  )

}
export default App

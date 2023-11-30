import ReactRouter from './router/router'
import './App.css'
import { Route } from 'react-router-dom'
import Home from './pages/Home/Home'

const App = ReactRouter(
  <>
    <Route path='/' element={<Home />} />
  </>
)

export default App

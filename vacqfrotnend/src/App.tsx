import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import Header from './components/Header'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import ViewAppt from './pages/ViewAppt';
import './App.css'
import PrivateRoutes from './components/PrivateRoutes'
function App() {
  return (
    <>
      <Router>
        <div className='overflow-x-hidden min-h-screen'>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route element={<PrivateRoutes/>}>
                <Route path='/appointments' element={<ViewAppt/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App

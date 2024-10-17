import { useState } from 'react'

import './App.css'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/add/Add'
import List from './pages/list/List'
import Orders from './pages/orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FoodUpdate from './components/foodUpdatePopup/FoodUpdate'

function App() {

  const [updateFood, setUpdateFood] = useState(false);

  const [food, setFood] = useState({});

  const url = "http://localhost:4000";
  return (
    <>
      {updateFood ? <FoodUpdate setUpdateFood={setUpdateFood} food={food} url={url} setFood={setFood} /> : <></>}
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} setUpdateFood={setUpdateFood} setFood={setFood} />} />
          <Route path='/order' element={<Orders url={url} />} />
        </Routes>
      </div>
    </>
  )
}

export default App

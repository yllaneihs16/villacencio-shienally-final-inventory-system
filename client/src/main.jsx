import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AddProduct from './pages/AddProduct.jsx'

import { BrowserRouter, Routes, Route} from "react-router-dom";
import Inventory from './pages/Inventory.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/update-by-id" element={<AddProduct />} />
    </Routes>
    </BrowserRouter>

  </React.StrictMode>,
)

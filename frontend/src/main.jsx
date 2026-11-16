import "./App.css";
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route} from "react-router-dom"

import HomePage from './landing_page/home/HomePage.jsx';
import Signup from './landing_page/signup/Signup.jsx';
import Login from './landing_page/login/Login.jsx';
import AboutPage from './landing_page/about/AboutPage.jsx';
import SupportPage from './landing_page/support/SupportPage.jsx';
import PricingPage from './landing_page/pricing/PricingPage.jsx';
import ProductPage from './landing_page/product/ProductPage.jsx';
import Navbar from './landing_page/Navbar.jsx';
import Footer from './landing_page/Footer.jsx';
import PageNotFound from './landing_page/PageNotFound.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/about' element={<AboutPage/>}></Route>
      <Route path="/support" element={<SupportPage/>}></Route>
      <Route path="/pricing" element={<PricingPage/>}></Route>
      <Route path="/product" element={<ProductPage/>}></Route>
      <Route path="*" element={<PageNotFound/>}></Route>
    </Routes>
    <Footer/>
  </BrowserRouter>
)

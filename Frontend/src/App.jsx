import { useState } from 'react'
import './App.css'
import { FrontPage } from './pages/frontpage/frontpage.page'
import { Routes, Route } from 'react-router-dom'
import { ErrorPage } from './pages/errorPage/error.page'
import { Navbar } from './components/navbar/navbar.component'
import { Layout } from './components/layout/layout.component'
import { LoginModal } from './components/loginModal/loginModal'
import { ToastContainer } from "react-toastify";

function App() {
 

  return (
    <>
      <Navbar />
      <LoginModal />
      <Layout>
        <Routes>
          <Route path="/" element={<FrontPage />} />


          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Layout>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
  )
}

export default App

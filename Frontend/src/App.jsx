import { useState } from 'react'
import './App.css'
import { FrontPage } from './pages/frontpage/frontpage.page'
import { Routes, Route } from 'react-router-dom'
import { ErrorPage } from './pages/errorPage/error.page'
import { Navbar } from './components/navbar/navbar.component'
import { Layout } from './components/layout/layout.component'

function App() {

  return (
    <>
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<FrontPage />} />


          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App

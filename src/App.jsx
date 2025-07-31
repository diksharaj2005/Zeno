import React from 'react'
import Sidebar from './Components/Sidebar'
import Main from './Components/Main'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 w-full">
        <Sidebar />
        <Main />
      </div>
      <Footer />
    </div>
  )
}

export default App

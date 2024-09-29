import React from 'react'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
const App = () => {
  return (
    <div className='bg-gray-200'>
      <div>
      <Navbar />
      </div>
     <Admin />
    </div>
  )
}

export default App

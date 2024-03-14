import React from 'react'
import Navbar from '../../components/Navbar'
import './home.css'

const Home = () => {
  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column'}}>
      <Navbar/>
      <div className='content'>
      <h1 style={{color:"blue"}}>E-Challan System</h1>
      <p>Pay Challan Online (echallan.parivahan.gov.in)</p>
      </div>
    </div>
  )
}

export default Home
import React from 'react'
import Header from "../components/Header";
import { Link } from "react-router-dom";




export default function Home() {
 

  return (
    <div className="home-page">
<Header/>
        <div className="mm"  style={{ overflow: 'hidden', height: '100vh' }}>
        
        <div className="home-content">
            <div className="home-overlay">
  
        <h1 style={{
          marginTop:"20px",
          color:"white",
          fontSize:"60px", 
          fontWeight:"bold", 
          
        
           }}>Manage Your Money Smartly</h1>
        <p  style={{
          color:"white",
          
          fontSize:"20px", 
          fontWeight:"bold", 
        
        
           }}>Track your income & expenses effortlessly. Take control of your financial future.</p>
    <Link to="/dashboard"  >
  <button className="dashboard-btn">
    Go to Dashboard
  </button>
</Link>
    
    </div>
    </div>
    </div>
    </div>
  )
}

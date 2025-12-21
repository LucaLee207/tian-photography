
import './App.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Event from "./pages/Event";
import MyWorks from './pages/MyWorks';
import Portrait from './pages/Portrait';
import Concert from './pages/Concert';
import Travel from './pages/Travel';
import Wedding from './pages/Wedding';
import Activity from './pages/Activity';
import NoMatch from './pages/NoMatch';
import {Routes, Route} from "react-router-dom";
import React, { useState, useEffect} from 'react';
import NavBar from './components/NavBar';
import AdminLoginPage from './components/AdminLoginPage';

function App() {

  const [userRole, setUserRole] = useState('user'); // or 'admin'
  const [isPreviewMode, setIsPreviewMode] = useState(false); // Controls the view
  const API_URL = process.env.BACKEND_URL || 'http://localhost:5000/api';
  useEffect(() => {
    async function verifyToken(){
      try{
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_URL}/verify-token`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`, // This is the standard format
              'Content-Type': 'application/json'
          }
        });
        if (response.ok){
          const data = await response.json()
          if (data.authenticated){
            setUserRole('admin');
          }
        }
      }catch(error){
        console.error("Network error:", error);
        // alert("Could not connect to the server");
        // alert(error.message);
      }
      
    };
    verifyToken();
  }, [setUserRole]);

  return (
    <div> 
      {userRole === 'admin' && (
                <div className="text-center my-3 admin-button">
                    <button
                        className="btn btn-info"
                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                    >
                        {isPreviewMode ? 'Exit Preview Mode' : 'Preview User View'}
                    </button>
                </div>
        )}
      <NavBar/> 
      <main className="main-content ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/event" element={<Event />}>
            <Route path="wedding" element={<Wedding userRole={userRole} isPreviewMode={isPreviewMode}/>} />
            <Route path="activity" element={<Activity userRole={userRole} isPreviewMode={isPreviewMode}/>} />
            <Route path="concert" element={<Concert userRole={userRole} isPreviewMode={isPreviewMode}/>} />
            <Route path="travel" element={<Travel userRole={userRole} isPreviewMode={isPreviewMode}/>}/>
          </Route>
          <Route path="/myworks" element={<MyWorks userRole={userRole} isPreviewMode={isPreviewMode}/>} />
          <Route path="/portrait" element={<Portrait userRole={userRole} isPreviewMode={isPreviewMode}/>} />
          <Route path="*" element={<NoMatch/>} />
          <Route path="/tiansphotography0905-login" element={<AdminLoginPage setUserRole={setUserRole}/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

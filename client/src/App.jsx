
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
import NavBar from './component/NavBar';
import AdminLoginPage from './component/AdminLoginPage';

function App() {

  const [userRole, setUserRole] = useState('user'); // or 'admin'
  const [isPreviewMode, setIsPreviewMode] = useState(false); // Controls the view
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
          <Route path="/admin" element={<AdminLoginPage setUserRole={setUserRole}/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

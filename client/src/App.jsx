
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
import React from "react";
import NavBar from './component/NavBar';

function App() {
  return (
    <div> 
      <NavBar/> 
      <main className="main-content ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/event" element={<Event />}>
            <Route path="wedding" element={<Wedding />} />
            <Route path="activity" element={<Activity />} />
            <Route path="concert" element={<Concert />} />
            <Route path="travel" element={<Travel/>}/>
          </Route>
          <Route path="/myworks" element={<MyWorks />} />
          <Route path="/portrait" element={<Portrait />} />
          <Route path="*" element={<NoMatch/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

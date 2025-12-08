import React from "react"


function Home(){
    return(
        <div className="dropdown">
      {/* 1. Dropdown Button (The Toggler) */}
      <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button" 
        id="dropdownMenuButton1" 
        data-bs-toggle="dropdown" // BS5 JavaScript attribute
        aria-expanded="false"
      >
        Dropdown Button
      </button>

      {/* 2. Dropdown Menu */}
      <ul 
        className="dropdown-menu" 
        aria-labelledby="dropdownMenuButton1"
      >
        <li><a className="dropdown-item" href="#">Action</a></li>
        <li><a className="dropdown-item" href="#">Another action</a></li>
        <li><a className="dropdown-item" href="#">Something else here</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><a className="dropdown-item" href="#">Separated link</a></li>
      </ul>
    </div>
    )
}

export default Home
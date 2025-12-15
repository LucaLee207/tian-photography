import React from "react"


function Home(){
    return(
       <div className="page-container">
        <img  src={"./homepage.jpg"} className="object-fit-cover" style={{objectPosition: "center 5%", width:"100%", height: "100vh"}} alt="Homepage" />
       </div>
    )
}

export default Home
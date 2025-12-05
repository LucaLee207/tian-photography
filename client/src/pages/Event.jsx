
import {Outlet} from "react-router-dom"



function Event(){
    return(
        <>
        <h1>This is an event page</h1>
        
        <Outlet/>
        </>
    )
}

export default Event
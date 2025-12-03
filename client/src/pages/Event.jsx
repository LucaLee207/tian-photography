import ContentList from "../component/ContentList"

import {Outlet} from "react-router-dom"



function Event(){
    return(
        <>
        <h1>This is an event page</h1>
        <ContentList/>
        <Outlet/>
        </>
    )
}

export default Event
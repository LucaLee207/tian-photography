import React from "react"
import ArtworkList from "../components/ArtworkList"


function MyWorks({userRole, isPreviewMode}){
    return(
        <>
        <ArtworkList pageCategory="myworks" userRole={userRole} isPreviewMode={isPreviewMode}/>
        </>
    )
}

export default MyWorks
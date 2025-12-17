import React from "react"
import ArtworkList from "../component/ArtworkList"


function MyWorks({userRole, isPreviewMode}){
    return(
        <>
        <ArtworkList pageCategory="portrait" userRole={userRole} isPreviewMode={isPreviewMode}/>
        </>
    )
}

export default MyWorks
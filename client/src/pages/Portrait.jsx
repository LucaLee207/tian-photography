import React from "react"
import ArtworkList from "../component/ArtworkList"

function Portrait({userRole, isPreviewMode}){
    return(
        <>
        <ArtworkList pageCategory="portrait" userRole={userRole} isPreviewMode={isPreviewMode}/>
        </>
    )
}

export default Portrait
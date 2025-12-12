import React from "react"
import ArtworkList from "../component/ArtworkList"
import ImageBoard from "../component/ImageBoard"

function MyWorks({userRole, isPreviewMode}){
    return(
        <>
        <ArtworkList pageCategory="portrait" userRole={userRole} isPreviewMode={isPreviewMode}/>
        </>
    )
}

export default MyWorks
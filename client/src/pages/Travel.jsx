import React from "react"
import ContentList from "../components/ContentList"

function Travel({userRole, isPreviewMode}){
    return(
        <>
        <ContentList pageCategory="travel" userRole={userRole} isPreviewMode={isPreviewMode}/>
        </>
    )
}

export default Travel
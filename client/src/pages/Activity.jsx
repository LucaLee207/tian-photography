import React from "react"
import ContentList from "../components/ContentList"

function Activity({userRole, isPreviewMode}){
    return(
        <>
        <ContentList pageCategory="activity" userRole={userRole} isPreviewMode={isPreviewMode}/>
        </>
    )
}

export default Activity
import React from "react"
import ContentList from "../component/ContentList"

function Activity({userRole, isPreviewMode}){
    return(
        <>
        <ContentList pageCategory="activity" userRole={userRole} isPreviewMode={isPreviewMode}/>
        </>
    )
}

export default Activity
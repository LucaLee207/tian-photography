import React from "react"
import ContentList from "../components/ContentList"

function Wedding({userRole, isPreviewMode}){
    return(
        <>
        <ContentList pageCategory="wedding" userRole={userRole} isPreviewMode={isPreviewMode}/>
        </>
    )
}

export default Wedding
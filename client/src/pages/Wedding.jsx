import React from "react"
import ContentList from "../component/ContentList"

function Wedding({userRole, isPreviewMode}){
    return(
        <>
        <ContentList pageCategory="wedding" userRole={userRole} isPreviewMode={isPreviewMode}/>
        </>
    )
}

export default Wedding
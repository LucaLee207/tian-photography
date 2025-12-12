import React from "react"
import ContentList from "../component/ContentList"

function Concert({userRole, isPreviewMode}){
    return(
        <>
        <ContentList pageCategory="concert" userRole={userRole} isPreviewMode={isPreviewMode}/>
        </>
    )
}

export default Concert
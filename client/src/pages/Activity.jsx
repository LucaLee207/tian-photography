import React from "react"
import ContentList from "../components/ContentList"
import NoMatch from "./NoMatch";
import { useParams } from 'react-router-dom';
function Activity({userRole, isPreviewMode}){
    const {subcategory} = useParams();
    const validCategories = ['life', 'company'];

    if (!validCategories.includes(subcategory)) {
        return <NoMatch />;
    }
    return(
        <>
        <ContentList pageCategory={`activity/${subcategory}`} userRole={userRole} isPreviewMode={isPreviewMode}/>
        </>
    )
}

export default Activity
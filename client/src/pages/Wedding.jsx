import React from "react"
import ContentList from "../components/ContentList"
import NoMatch from "./NoMatch";
import { useParams } from 'react-router-dom';
function Wedding({userRole, isPreviewMode}){
    const { subcategory } = useParams();
    
    const validCategories = ['day', 'pre'];
    if (!validCategories.includes(subcategory)) {
        return <NoMatch />;
    }else{
        return(
            <>
            <ContentList pageCategory={`wedding/${subcategory}`} userRole={userRole} isPreviewMode={isPreviewMode}/>
            </>
        )
    }
}

export default Wedding
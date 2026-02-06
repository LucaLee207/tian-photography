import React from "react"
import ContentList from "../components/ContentList"
import NoMatch from "./NoMatch";
import { useParams } from 'react-router-dom';
function Travel({userRole, isPreviewMode}){
    const {subcategory} = useParams();
    const validCategories = ['city'];
    if (!validCategories.includes(subcategory)) {
        return <NoMatch />;
    }else{
        return(
            <>
            <ContentList pageCategory={`travel/${subcategory}`} userRole={userRole} isPreviewMode={isPreviewMode}/>
            </>
        )
       }
}

export default Travel
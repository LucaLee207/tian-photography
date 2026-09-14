import React from "react"
import NoMatch from "./NoMatch";
import { useParams } from 'react-router-dom';
import ContentList from "../components/ContentList";

function Portrait({userRole, isPreviewMode}){
    const { subcategory } = useParams();

    const validCategories = ['individual', 'couple', 'registration', 'child', 'family'];

    if (!validCategories.includes(subcategory)) {
        return <NoMatch />; 
       
    }else{
        return(
            <>
            <ContentList pageCategory={`portrait/${subcategory}`} userRole={userRole} isPreviewMode={isPreviewMode}/>
            </>
        )
    }   
}

export default Portrait
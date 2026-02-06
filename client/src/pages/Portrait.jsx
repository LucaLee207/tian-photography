import React from "react"
import ArtworkList from "../components/ArtworkList"
import NoMatch from "./NoMatch";
import { useParams } from 'react-router-dom';

function Portrait({userRole, isPreviewMode}){
    const { subcategory } = useParams();

    const validCategories = ['individual', 'couple', 'registration', 'child', 'family'];

    if (!validCategories.includes(subcategory)) {
        return <NoMatch />; 
       
    }else{
        return(
            <>
            <ArtworkList pageCategory={`portrait/${subcategory}`} userRole={userRole} isPreviewMode={isPreviewMode}/>
            </>
        )
    }   
}

export default Portrait
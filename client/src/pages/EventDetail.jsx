
import ArtworkList from "../components/ArtworkList"
import { useParams } from 'react-router-dom';
import NoMatch from "./NoMatch";
function EventDetail({pageCategory, userRole, isPreviewMode}){
    const {subcategory, id } = useParams();
    const validCategories = {
        "portrait": ['individual', 'couple', 'registration', 'child', 'family'],
        "wedding": ['day', 'pre'],
        "activity": ['life', 'company'],
        "travel": ['city'],
    };

    if (pageCategory !== "concert" && !validCategories[pageCategory].includes(subcategory)) {
        return <NoMatch />;
    }
    const newPageCategory = pageCategory === "concert" ? "concert" : `${pageCategory}/${subcategory}`;
    return(
        <>
        <ArtworkList pageCategory={`${newPageCategory}/${id}`} userRole={userRole} isPreviewMode={isPreviewMode}/>
        </>
    )
}

export default EventDetail
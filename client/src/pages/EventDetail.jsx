
import ArtworkList from "../components/ArtworkList"
import { useParams } from 'react-router-dom';

function EventDetail({pageCategory, userRole, isPreviewMode}){
    const { id } = useParams();
    
    return(
        <>
        <ArtworkList pageCategory={id} userRole={userRole} isPreviewMode={isPreviewMode}/>
        </>
    )
}

export default EventDetail
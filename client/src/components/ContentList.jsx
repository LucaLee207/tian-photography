import { useState, useEffect} from 'react';

import CreateEventModal from './CreateEventModal';
import UpdateEventModal from './UpdateEventModal';
import EventCard from './EventCard';
import EventCard2 from './EventCard2';
import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/event'; 
// const API_URL_R2 = 'http://localhost:5000/api/img-R2-';
// const API_URL = 'https://tian-photography-6kwc.vercel.app/api/event'; 
// const API_URL_R2 = 'https://tian-photography-6kwc.vercel.app/api/img-R2-';
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

function ContentList({pageCategory, userRole, isPreviewMode}) {
    // 1. State for Data: Stores the fetched array of content items
    const [contentItems, setContentItems] = useState([]);
    // 2. State for Loading: Shows a message while waiting for the response
    const [isLoading, setIsLoading] = useState(true);
    // 3. State for Error: Stores any error message
    const [error, setError] = useState(null);
    // 4. State for create window
    const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
    // 5. State for update window
    const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false);
    // 6. State for update data
    const [updateItems, setUpdateItems] = useState({
        title: '',
        content: '',
        hovertext: '',
    });
    // 7. State for draggable items
    const [dragIndex, setDragIndex] = useState(null);
    // 8. Admin features
    const isDraggingAllowed = userRole === 'admin' && !isPreviewMode;
    // ========================== READ ================================
    // useEffect runs the fetching logic once after the initial render
    useEffect(() => {
        async function fetchContent() {
            try {
                const response = await fetch(`${API_URL}/event`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            
                // Assuming the API returns an array of objects matching your schema
                const responseBody = await response.json(); 
                const data = responseBody.data
        
                const filteredData = data.filter(item => item.category === pageCategory);
                setContentItems(filteredData);
            } catch (err) {
                setError(err.message);
            } finally {
                // Whether successful or not, fetching is done
                setIsLoading(false);
            }
        }

        fetchContent();
    }, [pageCategory]); // Empty dependency array ensures this runs only once

    // 2. Conditional Rendering
    if (isLoading) {
        return <div>Loading content...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    
    // ========================== CREATE ================================


    const handleCreateSubmit = async (formData) => {
        const {imageFile, tmpFileName, fileType, title, content, hovertext} = formData;
        const fileName = `${pageCategory}/${tmpFileName}`
        
        try {
            const {data: {url} } = await axios.post(`${API_URL}/img-R2-upload`, {fileName, fileType});
            await axios.put(url, imageFile, {
                headers: {"Content-Type": fileType}
            });
            const data = { filename:fileName, position: 0, category: pageCategory, url:`https://img.tians-photography.com/${fileName}`, title:title, content:content, hovertext:hovertext };
            const response = await fetch(`${API_URL}/event`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            const result = await response.json(); 

            if (response.ok && result.data) {
                console.log('Creation Successful:', result.data);
                alert("Item created!"); 
                
                // 💡 Key Action: Update the main list after creation
                setContentItems([result.data, ...contentItems])
            } else {
                console.error('API Error:', result.message);
                alert(`Error: ${result.message}`);
            }

        } catch (error) {
            console.error('Network Error:', error);
            alert('Network error. Could not connect to the API.');
        }
    };
    // ========================== UPDATE ================================
    const handleUpdateClick = (item) =>{
        setUpdateItems(item);
        setisUpdateModalOpen(true);
    }
    const handleUpdate = async (formData) => {
        const {id} = formData;
        try {
            const response = await fetch(`${API_URL}/event/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const result = await response.json(); 

            if (response.ok && result.data) {
                console.log('Updated Successful:', result.data);
            
                
                // 💡 Key Action: Update the main list after update
                setContentItems(prevItems => {
                    const filteredItems = prevItems.filter(item=> item.id !== id);
                    return [formData, ...filteredItems].sort((a, b) => a.position - b.position);
                    }
                );
                
            } else {
                console.error('API Error:', result.message);
                alert(`Error: ${result.message}`);
            }

        } catch (error) {
            console.error('Network Error:', error);
            alert('Network error. Could not connect to the API.');
        }
    };
    // ========================== DELETE ================================
    const handleDelete = async (item) => {
        const {id, title, filename} =item;
       
        if (!window.confirm(`Are you sure you want to delete item ${title}?`)) {
            return; // Stop if the user clicks Cancel
        }
        try {
            const {data: {deleteUrl}} = await axios.post(`${API_URL}/img-R2-delete`, {key: filename})

            await Promise.all([
                axios.post(`${API_URL}/img-R2-delete-folder`, { prefix: `${id}/` }),
                axios.post(`${API_URL}/img-R2-delete`, {key: filename}),
                fetch(`${API_URL}/event/detail/${id}`, { method: 'DELETE' }),
                fetch(`${API_URL}/event/${id}`, { method: 'DELETE' })
            ]);

           
            setContentItems(prevItems => 
                prevItems.filter(item => item.id !== id)
            );
            alert(`Item at id ${id} deleted successfully!`);
            console.log(`Item at id ${id} deleted successfully!`);
        } catch (error) {
            // Handle network errors
            console.error('Network Error during deletion:', error);
            alert('Network error. Could not connect to the API.');
        }
    };
    // ========================== REORDER ================================
    const handleDragStart = (index) => {
        setDragIndex(index);
    }
    const handleDragOver = (e) => {
        e.preventDefault();
    }
    const handleDrop = (index) => {
        const newItems = [...contentItems];
        const draggedItem = newItems[dragIndex];
        newItems.splice(dragIndex, 1);
        newItems.splice(index, 0, draggedItem);
        setContentItems(newItems);
        setDragIndex(null);
    }
    const handleOrderConfirmed = async () => {
        const ids = contentItems.map(item => item.id);
        
        try {
            const response = await fetch(`${API_URL}/event/order`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ids),
            });
            
            const result = await response.json(); 
            const data = result.data;
                
            
            if (response.ok) {
                console.log('Order Updated Successful',);
                alert("Order Saved!");
                // 💡 Key Action: Update the main list after reordering
                data.sort((a, b) => a.position - b.position);
                const filteredData = data.filter(item => item.category === pageCategory);
                setContentItems(filteredData);
               
                
            } else {
                console.error('API Error:', result.message);
                alert(`Error: ${result.message}`);
            }

        } catch (error) {
            console.error('Network Error:', error);
            alert('Network error. Could not connect to the API.');
        }

    }
    // Render the Board
    return (
        <div className="page-container content-list-container mx-3 mt-5 pt-5">

            {(userRole === 'admin' && !isPreviewMode) &&(
                <div className="row d-flex justify-content-center align-items-center mb-3">
                    <button 
                        type="button"
                        className="btn btn-outline-primary w-25"
                        onClick={() => setisCreateModalOpen(true)}
                        style={{ marginBottom: '20px' }}
                    >
                        Create New Item
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-primary align-self-center w-25"
                        onClick={() => handleOrderConfirmed()}
                        style ={{ marginLeft: '10px', marginBottom: '20px' }}>
                        Order Confirmed
                    </button>
                </div>)
            }
            <CreateEventModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setisCreateModalOpen(false)}
                onCreateSubmit={handleCreateSubmit}
            />
            <UpdateEventModal 
                data = {updateItems}
                isOpen={isUpdateModalOpen} 
                onClose={() => setisUpdateModalOpen(false)}
                onUpdateSubmit={handleUpdate}
                updateData={setUpdateItems}
            />
            
            {/* <EventCard event={{title: "Sample Event", content: "This is a sample event content."}} />
            <EventCard2 event={{title: "Sample Event", content: "This is a sample event content."}} /> */}
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {contentItems.map((item, index) => (
                    <li 
                    key={index} 
                    draggable={isDraggingAllowed}
                    onDragStart={isDraggingAllowed ? () => handleDragStart(index) : undefined} // ⬅️ Conditionally set handler
                    onDragOver={isDraggingAllowed ? handleDragOver : undefined}
                    onDrop={isDraggingAllowed ? () => handleDrop(index) : undefined}
                    className={index === dragIndex ? "dragging" : ""}>
                        
                    <div key={item.id} className="content-item">
                        {(index%2 === 1) && (<EventCard event={item} category={pageCategory}/>)}
                        {(index%2 === 0) && (<EventCard2 event={item} category={pageCategory}/>)}
                        {(userRole === 'admin' && !isPreviewMode) &&(
                            <div className="row d-flex justify-content-center">
                            
                            <button
                                type="button"
                                className="btn btn-outline-danger w-25"
                                onClick={() => handleDelete(item)} 
                                style={{ marginLeft: '20px'}}
                            >
                                Delete
                            </button>
                            <button 
                                type="button"
                                className="btn btn-outline-warning w-25"
                                onClick={() => handleUpdateClick(item)} 
                                style={{ marginLeft: '20px'}}
                            >
                                Update
                            </button>
                            </div>)
                        }
                        
                    </div>
                </li>
                ))}
            </ul>

        </div>
    );
}

export default ContentList;
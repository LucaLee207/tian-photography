import React, { useState, useEffect} from 'react';

import CreateEventModal from './CreateEventModal';
import UpdateEventModal from './UpdateEventModal';
import EventCard from './EventCard';
import EventCard2 from './EventCard2';
import axios from 'axios';
// Define the API endpoint
const API_URL = 'http://localhost:5000/api/event'; // Adjust if your endpoint is different
const API_URL_R2 = 'http://localhost:5000/api/img-R2-';

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
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            
                // Assuming the API returns an array of objects matching your schema
                const responseBody = await response.json(); 
                const data = responseBody.data
                // 💡 Sort the data by the 'position' field before saving it
                data.sort((a, b) => a.position - b.position);
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
    }, []); // Empty dependency array ensures this runs only once

    // 2. Conditional Rendering
    if (isLoading) {
        return <div>Loading content...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    // if (contentItems.length === 0) {
    //     return <div>No content items found.</div>;
    // }
    // ========================== CREATE ================================
    const handleCreateSubmit = async (formData) => {
        const {imageFile, tmpFileName, fileType} = formData;
        const fileName = `${pageCategory}/${tmpFileName}`
        
        try {
            const {data: {url} } = await axios.post(`${API_URL_R2}upload`, {fileName, fileType});
            await axios.put(url, imageFile, {
                headers: {"Content-Type": fileType}
            });
            const data = {...formData, filename:fileName, position: 0, category: pageCategory, url:`https://pub-2d6a4cb96ef24e38986e5da6015ec8b3.r2.dev/${fileName}`};
            const response = await fetch(API_URL, {
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
            const response = await fetch(`${API_URL}/${id}`, {
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
        // 1. Give the user a chance to confirm the deletion (Highly recommended!)
        if (!window.confirm(`Are you sure you want to delete item ${title}?`)) {
            return; // Stop if the user clicks Cancel
        }
        try {
            const {data: {deleteUrl}} = await axios.post(`${API_URL_R2}delete`, {key: filename})
            await axios.delete(deleteUrl);
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            // The backend should return status 200/204, which is covered by response.ok
            if (response.ok) {
                // 2. Success! Update the local state (UI) immediately.
                // Remove the deleted item from the contentItems array in state.
                setContentItems(prevItems => 
                    prevItems.filter(item => item.id !== id)
                );
                
                console.log(`Item at id ${id} deleted successfully!`);
            } else {
                // Handle HTTP errors (404, 500)
                const errorResult = await response.json(); 
                console.error('Deletion Failed:', errorResult.message || response.statusText);
                alert(`Deletion failed: ${errorResult.message || response.statusText}`);
            }

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
            const response = await fetch(`${API_URL}/order`, {
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
                        {(index%2 === 1) && (<EventCard event={item} />)}
                        {(index%2 === 0) && (<EventCard2 event={item} />)}
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
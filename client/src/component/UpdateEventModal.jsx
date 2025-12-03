import React, { useState } from 'react';

// You would replace this with your actual CSS or a styling library
const modalStyles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
        backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', 
        justifyContent: 'center', alignItems: 'center', zIndex: 1000 
    },
    content: {
        backgroundColor: 'white', padding: '30px', borderRadius: '8px', 
        width: '400px', maxWidth: '90%'
    }
};

function UpdateEventModal({ data, isOpen, onClose, onUpdateSubmit, setFormData}) {
   
    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'position' ? Number(value) : value,
        }));
    };

    // 2. Handle Submission Logic
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Pass the form data up to the parent component for API submission
        onUpdateSubmit(data);
        
        // Close the modal
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.content}>
                <h3>Update Item {data.id}</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="number" 
                        name="position" 
                        placeholder="Position (number)" 
                        value={data.position} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Title" 
                        value={data.title} 
                        onChange={handleChange} 
                        required 
                    />
                    <textarea 
                        name="content" 
                        placeholder="Content" 
                        value={data.content} 
                        onChange={handleChange} 
                        required
                    />
                    <input 
                        type="url" 
                        name="url" 
                        placeholder="URL" 
                        value={data.url} 
                        onChange={handleChange} 
                        required
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                        <button type="button" onClick={onClose} style={{ marginRight: '10px' }}>Cancel</button>
                        <button type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateEventModal;
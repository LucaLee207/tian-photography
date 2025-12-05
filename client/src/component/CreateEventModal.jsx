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

function CreateEventModal({ isOpen, onClose, onCreateSubmit }) {
    // 1. State for Form Inputs
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        url: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // 2. Handle Submission Logic
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Pass the form data up to the parent component for API submission
        onCreateSubmit(formData);

        // Reset the form data after submission
        setFormData({  title: '', content: '', url: '' });
        
        // Close the modal
        onClose();
    };
    const handleCancel = (e) => {
        // Reset the form data after submission
        setFormData({ title: '', content: '', url: '' });
        
        // Close the modal
        onClose();

    };

    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.content}>
                <h3>Create New Item</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        required 
                    />
                    <textarea 
                        name="content" 
                        placeholder="Content" 
                        value={formData.content} 
                        onChange={handleChange} 
                        required
                    />
                    <input 
                        type="url" 
                        name="url" 
                        placeholder="URL" 
                        value={formData.url} 
                        onChange={handleChange} 
                        required
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                        <button type="button" onClick={handleCancel} style={{ marginRight: '10px' }}>Cancel</button>
                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateEventModal;
import { useState } from 'react';

// You would replace this with your actual CSS or a styling library
const modalStyles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
        backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', 
        justifyContent: 'center', alignItems: 'center', zIndex: 1000 
    },
    content: {
        backgroundColor: 'white', padding: '30px', borderRadius: '8px', 
        width: '60%', maxWidth: '90%', height: '70%'
    }
};

function CreateEventModal({ isOpen, onClose, onCreateSubmit }) {
    // 1. State for Form Inputs
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        hovertext: '',
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
        
        const fileInput = e.target.elements.file;
        const rawFile = fileInput.files[0];

        // Pass the form data up to the parent component for API submission
        onCreateSubmit({...formData,
            imageFile: rawFile,
            tmpFileName: rawFile.name,
            fileType: rawFile.type,
        });

        // Reset the form data after submission
        setFormData({  title: '', content: '', hovertext: ''});
        
        // Close the modal
        onClose();
    };
    const handleCancel = (e) => {
        // Reset the form data after submission
        setFormData({ title: '', content: '', hovertext: ''});
        
        // Close the modal
        onClose();

    };

    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.content}>
                <form onSubmit={handleSubmit}>
                    <div className="row g-0 d-flex flex-column">
                    <h6>Title</h6>  
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        required 
                    /> 
                    <h6>Content</h6>
                    <textarea 
                        name="content" 
                        placeholder="Content" 
                        value={formData.content} 
                        onChange={handleChange} 
                        required
                    />
                    <h6>Hover Text</h6>
                    <textarea 
                        name="hovertext" 
                        placeholder="Hover Text" 
                        value={formData.hovertext} 
                        onChange={handleChange} 
                        required
                    />
                    <h6>Upload Image</h6>
                    <input 
                        type="file" 
                        name="file" 
                        required
                    />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                        <button type="button" className="btn btn-outline-secondary" onClick={handleCancel} style={{ marginRight: '10px' }}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateEventModal;
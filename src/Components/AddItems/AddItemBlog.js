import React, { useState } from 'react';
import { MdAdd } from "react-icons/md";

const AddItemBlog = ({ addItem, showAlert, notes, refClose }) => {
    // const { addItem, showAlert ,notes ,refClose} = props;
    const [note, setNote] = useState({ title: "", description: "" });
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await addItem(notes._id, note.title, note.description, image);
            setNote({ title: "", description: "" });
            showAlert("Added successfully", "success");
        } catch (error) {
            console.error("There was an error uploading the file!", error);
            showAlert("There was an error uploading the file!", "danger");
        }
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };



    return (
        <>
            <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add Item</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name='title'
                                        aria-describedby="titleHelp"
                                        onChange={onChange}
                                        value={note.title}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        // type="text"
                                        className="form-control"
                                        id="description"
                                        name='description'
                                        aria-describedby="descriptionHelp"
                                        onChange={onChange}
                                        value={note.description}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        name="image"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </div>
                                <button disabled={note.title.length < 3} type="submit" className="AddNote-button" data-bs-dismiss="modal" onClick={handleClick} aria-label="Close" ref={refClose}>
                                    <MdAdd /> Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddItemBlog;
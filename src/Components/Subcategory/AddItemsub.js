import React, { useState } from 'react';
import { MdAdd } from "react-icons/md";

const AddItemsub = ({ addItem, showAlert, notes, refClose, categoryId }) => {
    const [note, setNote] = useState({
        title: "",
        description: "",
        day: ""
    });
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (file && file.size > 5000000) {
            showAlert("File size too large. Please upload a file less than 5MB.", "danger");
            return;
        }

        setImage(file);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            if (!note.title || !note.description || !note.day || !image) {
                showAlert("All fields are required.", "danger");
                return;
            }

            await addItem(categoryId, notes._id, note.title, note.description, note.day, image);

            setNote({
                title: "",
                description: "",
                day: ""
            });
            setImage(null);

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
                                        onChange={onChange}
                                        value={note.title}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name='description'
                                        onChange={onChange}
                                        value={note.description}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="day" className="form-label">Day</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="day"
                                        name='day'
                                        onChange={onChange}
                                        value={note.day}
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
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="AddNote-button"
                                    data-bs-dismiss="modal"
                                    onClick={handleClick}
                                    aria-label="Close"
                                    ref={refClose}
                                    disabled={note.title.length < 3 || !note.description || !note.day || !image}
                                >
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

export default AddItemsub;

import React, { useState } from 'react';
import { MdAdd } from "react-icons/md";

const AddCategory = ({ addItem, showAlert, notes, refClose }) => {
    const [note, setNote] = useState({ category: "" });

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await addItem(note.category,);
            setNote({
                category: "",
            });
            refClose.current.click();
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
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="category"
                                        name='category'
                                        aria-describedby="titleHelp"
                                        onChange={onChange}
                                        value={note.category}
                                        required
                                    />
                                </div>
                                <button disabled={note.category.length < 3} type="submit" className="AddNote-button" data-bs-dismiss="modal" onClick={handleClick} aria-label="Close" ref={refClose}>
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

export default AddCategory;

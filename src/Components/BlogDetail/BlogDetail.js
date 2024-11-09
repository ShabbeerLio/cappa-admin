import React, { useContext, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import NoteContext from "../../Context/Banner/NoteContext";
import CardBlog from "../Card/CardBlog";
import AddItemBlog from "../Subcategory/AddItemBlog";
import EditItemBlogDetail from "../EditSubcategory/EditItemBlogDetail";

const BlogDetail = ({ note, showAlert }) => {
    const ref = useRef(null);
    const refClose = useRef(null);
    const { addCategorySubcategory, editCategorySubcategory, deleteCategorySubcategory } = useContext(NoteContext);
    const [editForm, setEditForm] = useState({ etitle: "", edescription: "", eimage: null });
    const [currentSubcategoryId, setCurrentSubcategoryId] = useState(null);

    if (!note || !note.subcategories) {
        return <div>No Sub Categories to display</div>;
    }

    const handleEditClick = (subNote) => {
        setCurrentSubcategoryId(subNote._id);
        setEditForm({ etitle: subNote.name, edescription: subNote.description, eimage: null });
        ref.current.click(); 
    };

    const handleChange = (e) => {
        if (e.target.name === "eimage") {
            setEditForm({ ...editForm, eimage: e.target.files[0] });
        } else {
            setEditForm({ ...editForm, [e.target.name]: e.target.value });
        }
    };

    const handleUpdate = () => {
        if (currentSubcategoryId) {
            editCategorySubcategory(note._id, currentSubcategoryId, editForm.etitle, editForm.edescription, editForm.eimage);
            showAlert("Subcategory updated successfully", "success");
            refClose.current.click(); // Close the modal
        }
    };

    return (
        <>
            <div>
                <div className="banner-button">
                    <h5>Blog Detail</h5>
                    <button
                        type="button"
                        className="btn btn-primary d-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop1"
                        ref={ref}
                    >
                        <MdAdd /> Add Blog Detail
                    </button>
                </div>
                <AddItemBlog notes={note} addItem={addCategorySubcategory} refClose={refClose} showAlert={showAlert} />
                <button
                    type="button"
                    className="btn btn-primary d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal1"
                    ref={ref}
                >
                </button>
                <EditItemBlogDetail
                    note={editForm}
                    onChange={handleChange}
                    handleClick={handleUpdate}
                    refClose={refClose}
                />
                <div className="row my-3 mx-3">
                    <div className="container mx-2">
                        {note.subcategories.length === 0 && "No Items to display"}
                    </div>
                    {note.subcategories.map((subNote) => (
                        <CardBlog
                            key={subNote._id}
                            deleteItem={() => {
                                deleteCategorySubcategory(note._id, subNote._id);
                                showAlert("Deleted successfully", "success");
                            }}
                            showAlert={showAlert}
                            updateNote={handleEditClick}
                            note={subNote}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default BlogDetail;

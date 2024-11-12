import React, { useContext, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import NoteContext from "../../Context/Banner/NoteContext";
import AddItemsub from "../Subcategory/AddItemsub";
import EditItemSub from "../EditSubcategory/EditItemSub";
import Cardsub from "../Card/Cardsub";

const SubCategoryDetail = ({ note, showAlert, categoryId }) => {
    const ref = useRef(null);
    const refClose = useRef(null);
    const {
        addTour,
        editTour,
        deleteTour
    } = useContext(NoteContext);

    const [editForm, setEditForm] = useState({
        etitle: "",
        edescription: "",
        eday: "",
        eimage: null
    });

    const [currentSubcategoryId, setCurrentSubcategoryId] = useState(null);

    if (!note || !note.tour) {
        return <div>No sub Categories to display</div>;
    }

    const handleEditClick = (subNote) => {
        setCurrentSubcategoryId(subNote._id);
        setEditForm({
            etitle: subNote.name,
            edescription: subNote.description,
            eday: subNote.day,
            eimage: null
        });
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
            editTour(
                categoryId,
                note._id,
                currentSubcategoryId,
                editForm.etitle,
                editForm.edescription,
                editForm.eday,
                editForm.eimage
            );
            showAlert("Subcategory updated successfully", "success");
            refClose.current.click(); // Close the modal
        }
    };

    return (
        <>
            <div>
                <div className="banner-button">
                    <h5>Tours</h5>
                    <button
                        type="button"
                        className="btn btn-primary d-flex align-items-center"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop1"
                        ref={ref}
                    >
                        <MdAdd /> Add Tours
                    </button>
                </div>
                <AddItemsub categoryId={categoryId} notes={note} addItem={addTour} refClose={refClose} showAlert={showAlert} />
                <button
                    type="button"
                    className="btn btn-primary d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal1"
                    ref={ref}
                >
                </button>
                <EditItemSub
                    note={editForm}
                    onChange={handleChange}
                    handleClick={handleUpdate}
                    refClose={refClose}
                />
                <div className="row my-3 mx-3">
                    <div className="container mx-2">
                        {note.tour.length === 0 && "No Items to display"}
                    </div>
                    {note.tour.map((subNote) => (
                        <Cardsub
                            key={subNote._id}
                            deleteItem={() => {
                                deleteTour(categoryId, note._id, subNote._id);
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

export default SubCategoryDetail

import React, { useContext, useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import "./Pages.css"
import Card1 from '../Components/Card/Card1';
import Data from './Data';
import NoteContext from '../Context/Banner/NoteContext';
import { useNavigate } from 'react-router-dom';
import AddItem1 from '../Components/AddItems/AddItem1';
import EditItem1 from '../Components/EditItems/EditItem1';

const IndienRun = (props) => {
    const context = useContext(NoteContext);
    const {
        notes,
        getsubCategory,
        addSubcategory,
        editSubcategory,
        deleteSubcategory,
    } = context;

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Example categoryId - update this dynamically if needed
    const categoryId = "672cac573e14f1e3f07301b7";

    useEffect(() => {
        const fetchSubcategories = async () => {
            if (localStorage.getItem("token")) {
                try {
                    await getsubCategory(categoryId);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching subcategories:", error);
                }
            } else {
                navigate("/login");
            }
        };
        fetchSubcategories();
    }, [navigate, getsubCategory, categoryId]);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({
        id: "",
        esubCategory: "",
        esubCategorydesc: "",
        elocation: "",
        einterval: "",
        emetaTag: "",
        emetaTitle: "",
        emetaDesc: "",
        seimage: null,
        seimage1: null,
        seimage2: null,
    });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            esubCategory: currentNote.subCategory,
            esubCategorydesc: currentNote.subCategorydesc,
            elocation: currentNote.location,
            einterval: currentNote.interval,
            emetaTag: currentNote.metaTag,
            emetaTitle: currentNote.metaTitle,
            emetaDesc: currentNote.metaDesc,
            eseimage: null,
            eseimage1: null,
            eseimage2: null,
        });
    };

    const handleClick = (e) => {
        editSubcategory(
            categoryId,
            note.id,
            note.esubCategory,
            note.esubCategorydesc,
            note.elocation,
            note.einterval,
            note.emetaTag,
            note.emetaTitle,
            note.emetaDesc,
            note.eseimage,
            note.eseimage1,
            note.eseimage2
        );
        refClose.current.click();
        props.showAlert("Updated successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const onImageChange = (e) => {
        // Handle multiple image fields if available
        if (e.target.name === "seimage") {
            setNote({ ...note, seimage: e.target.files[0] });
        } else if (e.target.name === "seimage1") {
            setNote({ ...note, seimage1: e.target.files[0] });
        } else if (e.target.name === "seimage2") {
            setNote({ ...note, seimage2: e.target.files[0] });
        }
    };
    return (
        <>
            {loading ? (
                <div className="loader">
                    <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="banner">
                        <div className="banner-button">
                            <h2>Indien Rundreise</h2>
                            <button
                                type="button"
                                className="btn btn-primary d-flex align-items-center"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                ref={ref}
                            >
                                <MdAdd /> Add Category
                            </button>
                        </div>
                        <AddItem1 clientId={categoryId} addItem={addSubcategory} refClose={refClose} showAlert={props.showAlert} />
                        <button
                            type="button"
                            className="btn btn-primary d-none"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            ref={ref}
                        >
                        </button>
                        <EditItem1
                            onChange={onChange}
                            note={note}
                            refClose={refClose}
                            handleClick={handleClick}
                            onImageChange={onImageChange}
                        />
                        <div className="row my-3">
                            <div className="container mx-2">
                                {loading ? "Loading..." : (notes.length === 0 && "No Items to display")}
                            </div>
                            {notes && notes.map((note, index) => (
                                note && <Card1
                                    key={note._id}
                                    index={index}
                                    deleteItem={deleteSubcategory}
                                    updateNote={updateNote}
                                    showAlert={props.showAlert}
                                    note={note}
                                    categoryId={categoryId}
                                />
                            ))}
                        </div>
                    </div>
                </>)}
        </>
    );
};
export default IndienRun

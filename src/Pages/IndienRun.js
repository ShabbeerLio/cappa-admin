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
                await getsubCategory(categoryId);
                setLoading(false);
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
        ecategory: "",
        ecategorydesc: "",
        etag: "",
        seimage: null,
        esubcategories: [],
    });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            ecategory: currentNote.category,
            ecategorydesc: currentNote.categorydesc,
            etag: currentNote.tag,
            seimage: null,
            esubcategories: currentNote.subcategories,
        });
    };

    const handleClick = (e) => {
        editSubcategory(note.id, note.ecategory, note.ecategorydesc, note.etag, note.esubcategories, note.seimage);
        refClose.current.click();
        props.showAlert("Updated successfully", "success");
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const onImageChange = (e) => {
        setNote({ ...note, seimage: e.target.files[0] });
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
                        <AddItem1 addItem={addSubcategory} refClose={refClose} showAlert={props.showAlert} />
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
                                />
                            ))}
                        </div>
                    </div>
                </>)}
        </>
    );
};
export default IndienRun

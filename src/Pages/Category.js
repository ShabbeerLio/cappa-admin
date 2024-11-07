import React, { useContext, useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import "./Pages.css"
import AddCategory from '../Components/AddItems/AddCategory';
import { useNavigate } from 'react-router-dom';
import NoteContext from "../Context/Banner/NoteContext";
import EditCategory from "../Components/EditSubcategory/EditCategory";
import CategoryCard from "../Components/Card/CategoryCard";

const Category = (props) => {
  const context = useContext(NoteContext);
  const { notes, getCategory, addCategory, editCategory, deleteCategory } = context;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      if (localStorage.getItem("token")) {
        await getCategory();
        setLoading(false);
      } else {
        navigate("/login");
      }
    };
    fetchClients();
  }, [navigate, getCategory]);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    ecategory: "",
  });

  // console.log(note,'data')


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      ecategory: currentNote.category,
    });
  };

  const handleClick = (e) => {
    editCategory(note.id, note.ecategory,);
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
              <h2>Category</h2>
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
            <AddCategory addItem={addCategory} refClose={refClose} showAlert={props.showAlert} />
            <button
              type="button"
              className="btn btn-primary d-none"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              ref={ref}
            >
            </button>
            <EditCategory
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
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Category</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notes && notes.map((note, index) => (
                    note && <CategoryCard
                      key={note._id}
                      index={index}
                      deleteItem={deleteCategory}
                      updateNote={updateNote}
                      showAlert={props.showAlert}
                      note={note}
                    />
                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </>)}
    </>
  );
};
export default Category

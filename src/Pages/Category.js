import React, { useState } from 'react'
import { MdAdd } from "react-icons/md";
import "./Pages.css"

const Category = () => {
  const [loading, setLoading] = useState(false);

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
              // ref={ref}
              >
                <MdAdd /> Add Category
              </button>
            </div>
            {/* <AddItems2 addItem={addService} refClose={refClose} showAlert={props.showAlert} /> */}
            <button
              type="button"
              className="btn btn-primary d-none"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
            // ref={ref}
            >
            </button>
            {/* <EditItem
              onChange={onChange}
              note={note}
              refClose={refClose}
              handleClick={handleClick}
              onImageChange={onImageChange}
            /> */}
            <div className="row my-3">
              <div className="container mx-2">
                {/* {notes.length === 0 && "No Items to display"} */}
              </div>
              {/* {notes.map((note) => {
                return <Card2 key={note._id} deleteItem={deleteService} updateNote={updateNote} showAlert={props.showAlert} note={note} />
              })} */}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Category

import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../../Context/Banner/NoteContext";
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import EditBlog from "../../Components/EditItems/EditBlog";
import BlogCard from "../../Components/Card/BlogCard";
import AddBlog from "../../Components/AddItems/AddBlog";

const Blogs = (props) => {
  const context = useContext(NoteContext);
  const { notes, getBlogs, addBlogs, editBlogs, deleteBlogs } = context;
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      if (localStorage.getItem("token")) {
        await getBlogs();
        setLoading(false);
      } else {
        navigate("/login");
      }
    };
    fetchClients();
  }, [navigate, getBlogs]);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [epublishDate, setePublishDate] = useState("");
  const [note, setNote] = useState({
    id: "",
    ecategory: "",
    ecategorydesc: "",
    etag: "",
    estatus: "",
    edraft: "",
    epublishDate: "",
    seimage: null,
    esubcategories: [],
  });

  // console.log(note, "note")

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      ecategory: currentNote.category,
      ecategorydesc: currentNote.categorydesc,
      etag: currentNote.tag,
      estatus: currentNote.status,
      edraft: currentNote.draft,
      epublishDate: currentNote.publishDate,
      seimage: null,
      esubcategories: currentNote.subcategories,
    });
    setePublishDate("")
  };

  const handleClick = (e) => {
    // Convert the publishDate to a Date object
    const publishDateObj = new Date(epublishDate);

    // Subtract 5 hours and 30 minutes (IST offset)
    publishDateObj.setHours(publishDateObj.getHours() + 5);
    publishDateObj.setMinutes(publishDateObj.getMinutes() + 30);

    const eadjustedPublishDate = publishDateObj.toISOString();
    editBlogs(
      note.id,
      note.ecategory,
      note.ecategorydesc,
      note.etag,
      note.estatus,
      note.edraft,
      eadjustedPublishDate,
      note.esubcategories,
      note.seimage
    );
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  };



  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const onChange2 = (e) => {
    setNote({ ...note, [e.target.name]: e.target.checked });
  };

  const onImageChange = (e) => {
    setNote({ ...note, seimage: e.target.files[0] });
  };

  const [isTimerComplete, setIsTimerComplete] = useState(false);

  // Filter notes based on activeTab
  const filteredNotes = activeTab === false
    ? notes.filter((note) => note && note.draft === true)
    : notes.filter((note) => note && note.draft === false);

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
              <h2>Blog</h2>
              <button
                type="button"
                className="btn btn-primary d-flex align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                ref={ref}
              >
                <MdAdd /> Add Blog
              </button>
            </div>
            <AddBlog
              addItem={addBlogs}
              refClose={refClose}
              showAlert={props.showAlert}
            />
            <button
              type="button"
              className="btn btn-primary d-none"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              ref={ref}
            ></button>
            <EditBlog
              onChange={onChange}
              onChange2={onChange2}
              note={note}
              refClose={refClose}
              handleClick={handleClick}
              onImageChange={onImageChange}
              epublishDate={epublishDate}
              setePublishDate={setePublishDate}
            />
            <div className="row my-3">
              <div className="blog-heading">
                <p
                  className={activeTab === true ? "active-tab" : ""}
                  onClick={() => setActiveTab(true)}
                >
                  Published Blog
                </p>
                <p
                  className={activeTab === false ? "active-tab" : ""}
                  onClick={() => setActiveTab(false)}
                >
                  Draft Blog
                </p>
              </div>
              <table className="table">
                <thead>
                  <tr className="blog">
                    <th scope="col">S.No</th>
                    <th scope="col">Blog</th>
                    <th scope="col">Description</th>
                    <th scope="col">Link</th>
                    <th scope="col">Banner</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                    <th scope="col">Blog Detail</th>
                  </tr>
                </thead>
                <tbody>
                  <div className="container mx-2">
                    {filteredNotes.length === 0 && "No Items to display"}
                  </div>
                  {filteredNotes &&
                    filteredNotes.map((note, index) => (
                      note && (
                        <BlogCard
                          key={note._id}
                          index={index}
                          deleteItem={deleteBlogs}
                          updateNote={updateNote}
                          showAlert={props.showAlert}
                          note={note}
                          isTimerComplete={isTimerComplete}
                        />
                      )
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Blogs;

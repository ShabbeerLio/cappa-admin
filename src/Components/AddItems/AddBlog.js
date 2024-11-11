import { useState } from "react";

const AddBlog = ({ addItem, refClose, showAlert }) => {
    const [note, setNote] = useState({
        category: "",
        categorydesc: "",
        tag: "",
        status: false,
        draft: false,
        subcategories: [{ name: "", description: "" }],
    });
    const [image, setImage] = useState(null);
    const [publishDate, setPublishDate] = useState("");

    const handleImageChange = (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            // Convert the publishDate to a Date object
            const publishDateObj = new Date(publishDate);

            // Subtract 5 hours and 30 minutes (IST offset)
            publishDateObj.setHours(publishDateObj.getHours() + 5);
            publishDateObj.setMinutes(publishDateObj.getMinutes() + 30);

            const adjustedPublishDate = publishDateObj.toISOString();

            await addItem(
                note.category,
                note.categorydesc,
                note.tag,
                note.status,
                note.draft,
                note.subcategories,
                image,
                adjustedPublishDate
            );

            // Reset the form
            setNote({
                category: "",
                categorydesc: "",
                tag: "",
                status: false,
                draft: false,
                subcategories: [{ name: "", description: "" }],
            });
            setImage(null);
            setPublishDate("");
            showAlert("Added successfully", "success");

        } catch (error) {
            console.error("There was an error uploading the file!", error);
            showAlert("There was an error uploading the file!", "danger");
        }
    };

    const onChange = (e, index, field) => {
        const newSubcategories = [...note.subcategories];
        newSubcategories[index][field] = e.target.value;
        setNote({ ...note, subcategories: newSubcategories });
    };

    const addSubcategoryField = () => {
        setNote({
            ...note,
            subcategories: [...note.subcategories, { name: "", description: "" }],
        });
    };

    const removeSubcategoryField = (index) => {
        const newSubcategories = note.subcategories.filter((_, i) => i !== index);
        setNote({ ...note, subcategories: newSubcategories });
    };

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Add Items</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Blog</label>
                                <input type="text" className="form-control" id="category" name="category" value={note.category} onChange={(e) => setNote({ ...note, category: e.target.value })} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="imageUrl" className="form-label">Image</label>
                                <input type="file" className="form-control" id="imageUrl" name="imageUrl" onChange={handleImageChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categorydesc" className="form-label">Blog Description</label>
                                <textarea className="form-control" id="categorydesc" name="categorydesc" value={note.categorydesc} onChange={(e) => setNote({ ...note, categorydesc: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Page Link</label>
                                <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={(e) => setNote({ ...note, tag: e.target.value })} required placeholder="Enter in Lowercase" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">Status</label>
                                <input
                                    type="checkbox"
                                    className="checkbox mx-3"
                                    id="status"
                                    name="status"
                                    checked={note.status}
                                    onChange={(e) => setNote({ ...note, status: e.target.checked })}
                                />
                                <label htmlFor="status" className="form-label">Draft</label>
                                <input
                                    type="checkbox"
                                    className="checkbox mx-3"
                                    id="draft"
                                    name="draft"
                                    checked={note.draft}
                                    onChange={(e) => setNote({ ...note, draft: e.target.checked })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="publishDate" className="form-label">Publish Date</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="publishDate"
                                    name="publishDate"
                                    value={publishDate}
                                    onChange={(e) => setPublishDate(e.target.value)}
                                />
                            </div>
                            {note.subcategories.map((subcategory, index) => (
                                <div key={index} className="mb-3">
                                    <label htmlFor={`subcategory-name-${index}`} className="form-label">Subcategory Name</label>
                                    <input type="text" className="form-control" id={`subcategory-name-${index}`} name="name" value={subcategory.name} onChange={(e) => onChange(e, index, "name")} />
                                    <label htmlFor={`subcategory-description-${index}`} className="form-label">Subcategory Description</label>
                                    <textarea className="form-control" id={`subcategory-description-${index}`} name="description" value={subcategory.description} onChange={(e) => onChange(e, index, "description")} />
                                    <button type="button" className="btn btn-danger mt-2" onClick={() => removeSubcategoryField(index)}>Remove</button>
                                </div>
                            ))}
                            <button type="button" className="btn btn-primary mt-2" onClick={addSubcategoryField}>Add Subcategory</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick} ref={refClose}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;

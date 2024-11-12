import { useState } from "react";

const AddItem1 = ({ addItem, refClose, showAlert, clientId }) => {
    const [note, setNote] = useState({
        subCategory: "",
        subCategorydesc: "",
        location: "",
        interval: "",
        metaTag: "",
        metaTitle: "",
        metaDesc: "",
    });

    const [subCatimageUrl, setsubCatimageUrl] = useState(null);
    const [about1imageUrl, setabout1imageUrl] = useState(null);
    const [about2imageUrl, setabout2imageUrl] = useState(null);

    // Handle image changes
    const handleImageChange = (e) => setsubCatimageUrl(e.target.files[0]);
    const handleImageChange1 = (e) => setabout1imageUrl(e.target.files[0]);
    const handleImageChange2 = (e) => setabout2imageUrl(e.target.files[0]);

    const handleNoteChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await addItem(
                clientId,
                note.subCategory,
                note.subCategorydesc,
                note.location,
                note.interval,
                note.metaTag,
                note.metaTitle,
                note.metaDesc,
                subCatimageUrl,
                about1imageUrl,
                about2imageUrl
            );

            setNote({
                subCategory: "",
                subCategorydesc: "",
                location: "",
                interval: "",
                metaTag: "",
                metaTitle: "",
                metaDesc: "",
            });
            setsubCatimageUrl(null);
            setabout1imageUrl(null);
            setabout2imageUrl(null);

            showAlert("Added successfully", "success");
            refClose.current.click(); // Close the modal
        } catch (error) {
            console.error("There was an error uploading the file!", error);
            showAlert("There was an error uploading the file!", "danger");
        }
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
                                <label htmlFor="subCategory" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="subCategory"
                                    name="subCategory"
                                    onChange={handleNoteChange}
                                    value={note.subCategory}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subCategorydesc" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    id="subCategorydesc"
                                    name="subCategorydesc"
                                    onChange={handleNoteChange}
                                    value={note.subCategorydesc}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="location"
                                    name="location"
                                    onChange={handleNoteChange}
                                    value={note.location}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="interval" className="form-label">Interval</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="interval"
                                    name="interval"
                                    onChange={handleNoteChange}
                                    value={note.interval}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="metaTag" className="form-label">Meta Tag</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="metaTag"
                                    name="metaTag"
                                    onChange={handleNoteChange}
                                    value={note.metaTag}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="metaTitle" className="form-label">Meta Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="metaTitle"
                                    name="metaTitle"
                                    onChange={handleNoteChange}
                                    value={note.metaTitle}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="metaDesc" className="form-label">Meta Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="metaDesc"
                                    name="metaDesc"
                                    onChange={handleNoteChange}
                                    value={note.metaDesc}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subCatimageUrl" className="form-label">Subcategory Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="subCatimageUrl"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="about1imageUrl" className="form-label">About 1 Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="about1imageUrl"
                                    onChange={handleImageChange1}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="about2imageUrl" className="form-label">About 2 Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="about2imageUrl"
                                    onChange={handleImageChange2}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" ref={refClose} onClick={handleClick}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddItem1;

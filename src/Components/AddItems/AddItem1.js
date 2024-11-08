import { useState } from "react";

const AddItem1 = ({ addItem, refClose, showAlert, categoryId }) => {
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
    const handleImageChange = (e) => {
        e.preventDefault();
        setsubCatimageUrl(e.target.files[0]);
    };
    const handleImageChange1 = (e) => {
        e.preventDefault();
        setabout1imageUrl(e.target.files[0]);
    };
    const handleImageChange2 = (e) => {
        e.preventDefault();
        setabout2imageUrl(e.target.files[0]);
    };

    const handleNoteChange = (e) => {
        const { name, value } = e.target;
        setNote((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
    
        // const formData = new FormData();
        // formData.append("subCategory", note.subCategory);
        // formData.append("subCategorydesc", note.subCategorydesc);
        // formData.append("location", note.location);
        // formData.append("interval", note.interval);
        // formData.append("metaTag", note.metaTag);
        // formData.append("metaTitle", note.metaTitle);
        // formData.append("metaDesc", note.metaDesc);
    
        // Add images to FormData
        // if (subCatimageUrl) formData.append("subCatimageUrl", subCatimageUrl);
        // if (about1imageUrl) formData.append("about1imageUrl", about1imageUrl);
        // if (about2imageUrl) formData.append("about2imageUrl", about2imageUrl);
    
        // Log FormData entries to verify data before submission
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }
    
        try {
            const result = await addItem(categoryId, note.subCategory ,note.subCategorydesc ,note.location ,note.interval ,note.metaTag ,note.metaTitle ,note.metaDesc);
            console.log("FormData sent successfully:", result);
            setNote({
                subCategory: "",
                subCategorydesc: "",
                location: "",
                interval: "",
                metaTag: "",
                metaTitle: "",
                metaDesc: "",
            });
            // setSubCatImageUrl(null);
            // setAbout1ImageUrl(null);
            // setAbout2ImageUrl(null);
            showAlert("Added successfully", "success");
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
                                <label htmlFor="subCategory" className="form-label">Subcategory</label>
                                <input type="text" className="form-control" id="subCategory" name="subCategory" value={note.subCategory} onChange={handleNoteChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subCategorydesc" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="subCategorydesc" name="subCategorydesc" value={note.subCategorydesc} onChange={handleNoteChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input type="text" className="form-control" id="location" name="location" value={note.location} onChange={handleNoteChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="interval" className="form-label">Interval</label>
                                <input type="text" className="form-control" id="interval" name="interval" value={note.interval} onChange={handleNoteChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="metaTag" className="form-label">Meta Tag</label>
                                <input type="text" className="form-control" id="metaTag" name="metaTag" value={note.metaTag} onChange={handleNoteChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="metaTitle" className="form-label">Meta Title</label>
                                <input type="text" className="form-control" id="metaTitle" name="metaTitle" value={note.metaTitle} onChange={handleNoteChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="metaDesc" className="form-label">Meta Description</label>
                                <input type="text" className="form-control" id="metaDesc" name="metaDesc" value={note.metaDesc} onChange={handleNoteChange} />
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="subCatimageUrl" className="form-label">Subcategory Image</label>
                                <input type="file" className="form-control" id="subCatimageUrl" name="subCatimageUrl" onChange={handleImageChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="about1imageUrl" className="form-label">About 1 Image</label>
                                <input type="file" className="form-control" id="about1imageUrl" name="about1imageUrl" onChange={handleImageChange1} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="about2imageUrl" className="form-label">About 2 Image</label>
                                <input type="file" className="form-control" id="about2imageUrl" name="about2imageUrl" onChange={handleImageChange2} />
                            </div> */}
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

export default AddItem1;

import { useState } from "react";

const AddItem1 = ({ addItem, refClose, showAlert }) => {
    const [note, setNote] = useState({
        subCategory: "",
        subCategorydesc: "",
        location: "",
        interval: "",
        metaTag: "",
        metaTitle: "",
        metaDesc: "",
    });
    const [subCatimageUrl, setimsubCatimageUrl] = useState(null);
    const [about1imageUrl, setabout1imageUrl] = useState(null);
    const [about2imageUrl, setabout2imageUrl] = useState(null);

    const handleImageChange = (e) => {
        e.preventDefault();
        setimsubCatimageUrl(e.target.files[0]);
    };
    const handleImageChange1 = (e) => {
        e.preventDefault();
        setabout1imageUrl(e.target.files[0]);
    };
    const handleImageChange2 = (e) => {
        e.preventDefault();
        setabout2imageUrl(e.target.files[0]);
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await addItem(note.subCategory, note.subCategorydesc, note.location, note.interval, note.metaTag, note.metaTitle, note.metaDesc, );
            setNote({
                subCategory: "",
                subCategorydesc: "",
                location: "",
                interval: "",
                metaTag: "",
                metaTitle: "",
                metaDesc: "",
            });
            // setimsubCatimageUrl(null);
            // setabout1imageUrl(null);
            // setabout2imageUrl(null);
            // refClose.current.click();
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
                            {/* <div className="mb-3">
                                <label htmlFor="subCatimageUrl" className="form-label">Image</label>
                                <input type="file" className="form-control" id="subCatimageUrl" name="subCatimageUrl" onChange={handleImageChange} />
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="subCategory" className="form-label">subCategory</label>
                                <input type="text" className="form-control" id="subCategory" name="subCategory" value={note.subCategory} onChange={(e) => setNote({ ...note, subCategory: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subCategorydesc" className="form-label">Description</label>
                                <textarea type="text" className="form-control" id="subCategorydesc" name="subCategorydesc" value={note.subCategorydesc} onChange={(e) => setNote({ ...note, subCategorydesc: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">location</label>
                                <input type="text" className="form-control" id="location" name="location" value={note.location} onChange={(e) => setNote({ ...note, location: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="interval" className="form-label">interval</label>
                                <input type="text" className="form-control" id="interval" name="interval" value={note.interval} onChange={(e) => setNote({ ...note, interval: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="metaTag" className="form-label">metaTag</label>
                                <input type="text" className="form-control" id="metaTag" name="metaTag" value={note.metaTag} onChange={(e) => setNote({ ...note, metaTag: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="metaTitle" className="form-label">metaTitle</label>
                                <input type="text" className="form-control" id="metaTitle" name="metaTitle" value={note.metaTitle} onChange={(e) => setNote({ ...note, metaTitle: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="metaDesc" className="form-label">metaDesc</label>
                                <input type="text" className="form-control" id="metaDesc" name="metaDesc" value={note.metaDesc} onChange={(e) => setNote({ ...note, metaDesc: e.target.value })} />
                            </div>
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
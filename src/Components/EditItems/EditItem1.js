import React from "react";

const EditItem1 = ({ onChange, note, refClose, handleClick, onImageChange }) => {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="esubCategory" className="form-label">subCategory</label>
                <input type="text" className="form-control" id="esubCategory" name="esubCategory" value={note.esubCategory} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="esubCategorydesc" className="form-label">subCategorydesc</label>
                <input type="text" className="form-control" id="esubCategorydesc" name="esubCategorydesc" value={note.esubCategorydesc} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="elocation" className="form-label">location</label>
                <input type="text" className="form-control" id="elocation" name="elocation" value={note.elocation} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="einterval" className="form-label">interval</label>
                <input type="text" className="form-control" id="einterval" name="einterval" value={note.einterval} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="emetaTag" className="form-label">MetaTag</label>
                <input type="text" className="form-control" id="emetaTag" name="emetaTag" value={note.emetaTag} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="emetaTitle" className="form-label">MetaTitle</label>
                <input type="text" className="form-control" id="emetaTitle" name="emetaTitle" value={note.emetaTitle} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="emetaDesc" className="form-label">metaDesc</label>
                <input type="text" className="form-control" id="emetaDesc" name="emetaDesc" value={note.emetaDesc} onChange={onChange} />
              </div>
              <div className="mb-1">
                <label htmlFor="seimage" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="seimage"
                  name="seimage"
                  onChange={onImageChange}
                />
              </div>
              <div className="mb-1">
                <label htmlFor="seimage1" className="form-label">
                  Upload about1 Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="seimage1"
                  name="seimage1"
                  onChange={onImageChange}
                />
              </div>
              <div className="mb-1">
                <label htmlFor="seimage2" className="form-label">
                  Upload about2 Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="seimage2"
                  name="seimage2"
                  onChange={onImageChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Client</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem1;
import React from "react";

const EditItem1 = ({ onChange, note, refClose, handleClick, onImageChange }) => {
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Blog</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="ecategory" className="form-label">Category</label>
                <input type="text" className="form-control" id="ecategory" name="ecategory" value={note.ecategory} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="ecategorydesc" className="form-label">Description</label>
                <input type="text" className="form-control" id="ecategorydesc" name="ecategorydesc" value={note.ecategorydesc} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
              </div>
              <div className="mb-3">
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
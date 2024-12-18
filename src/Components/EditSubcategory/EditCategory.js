import React from 'react';

const EditCategory = (props) => {
    return (
        <>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{ borderBottom: "1px solid #3c3c3c" }}>
                            <h5 className="modal-title" id="exampleModalLabel">
                                Edit Item
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="ecategory" className="form-label">
                                        Enter Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ecategory"
                                        name="ecategory"
                                        onChange={props.onChange}
                                        minLength={3}
                                        required
                                        value={props.note.ecategory}
                                    />
                                </div>
                               
                            </form>
                        </div>
                        <div className="modal-footer" style={{ display: "flex", flexWrap: "nowrap", borderTop: "1px solid #3c3c3c" }}>
                            <button
                                ref={props.refClose}
                                type="button"
                                className="update-button"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                onClick={props.handleClick}
                                type="button"
                                className="update-button"
                                data-bs-dismiss="modal"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditCategory;
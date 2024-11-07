import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Card.css";

const CategoryCard = ({ note, index, deleteItem, updateNote, showAlert }) => {

    return (
        <>
            <tr className="cards">
                <td>{index + 1}</td>
                <td>{note.category}</td>
                <td className="category-btn">
                    <div className="card-detail-action">
                        <p onClick={() => deleteItem(note._id)}>
                            <MdDelete className="mx-2" />
                        </p>
                        <p onClick={() => updateNote(note)}>
                            <MdEdit className="mx-2" />
                        </p>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default CategoryCard;

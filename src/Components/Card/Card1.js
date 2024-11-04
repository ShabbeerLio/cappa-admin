import React, { useState } from 'react'
import { MdDelete, MdEdit } from "react-icons/md";
import "./Card.css"

const Card1 = () => {
    const [showSubcategories, setShowSubcategories] = useState(false);

    const handleViewClick = () => {
        setShowSubcategories(!showSubcategories);
    };

    function limitWords(text, limit) {
        const words = text?.split(' ');
        return words?.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
    }

    return (
        <div className='category-card'>
            <div className="card-imag">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/024/602/602/non_2x/autumn-natural-background-illustration-ai-generative-free-photo.jpg"
                />

            </div>
            <div className="card-detail">
                <span>link-link-link</span>
                <h4>title</h4>
                <p>{limitWords("Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, nulla numquam iusto animi quis labore hic eveniet quisquam consequatur doloribus odit voluptates facilis, laudantium enim dolorem deleniti in eaque! Temporibus incidunt similique vero magni officiis impedit sed eius magnam voluptas eaque assumenda ea, vel praesentium quisquam dolorem cum voluptatum rerum!", 20)}</p>
                <div className="card-detail-action">
                    <p>
                        <MdDelete className="mx-2" />
                    </p>
                    <p >
                        <MdEdit className="mx-2" />
                    </p>
                </div>
            </div>
            <div className="card-view">
                <button className="btn btn-secondary" onClick={handleViewClick}>
                    {showSubcategories ? "Hide" : "View"}
                </button>
            </div>
        </div>
    )
}

export default Card1

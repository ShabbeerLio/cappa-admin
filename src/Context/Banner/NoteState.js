import react from "react"
import NoteContext from "./NoteContext";
import { useState } from "react";
import host from "../../Host/Host";

const NoteState = (props) => {

    const notesData = []

    const [notes, setNotes] = useState(notesData);

    // ................................. Category.......................................//
    // Get all Blog 
    const getCategory = async () => {
        const response = await fetch(`${host}/api/blog/fetchallblog`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setNotes(json)
    };

    // Add Blog
    const addCategory = async (category, categorydesc, tag, subcategories, image) => {
        try {
            // Create a new FormData instance
            const formData = new FormData();
            formData.append("category", category);
            formData.append("categorydesc", categorydesc);
            formData.append("tag", tag);
            subcategories.forEach((subcategory, index) => {
                formData.append(`subcategories[${index}][name]`, subcategory.name);
                formData.append(`subcategories[${index}][description]`, subcategory.description || '');
            });
            if (image) {
                formData.append("image", image);
            }

            const response = await fetch(`${host}/api/blog/addblog`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to add blog');
            }

            const blog = await response.json();
            setNotes(prevNotes => [...prevNotes, blog]);
            console.log("Blog added successfully", "success");
        } catch (error) {
            console.error("Error adding blog:", error.message);
            console.log("error");
            // showAlert("Failed to add blog", "error");
        }
    };



    // Edit Blog
    const editCategory = async (id, category, categorydesc, tag, subcategories, image) => {
        try {
            const formData = new FormData();
            formData.append('category', category);
            formData.append('categorydesc', categorydesc);
            formData.append('tag', tag);

            subcategories.forEach((sub, index) => {
                formData.append(`subcategories[${index}][name]`, sub.name);
                formData.append(`subcategories[${index}][description]`, sub.description || '');
            });

            if (image) {
                formData.append('image', image);
            }

            const response = await fetch(`${host}/api/blog/updateblog/${id}`, {
                method: 'PUT',
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
                body: formData
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to edit Blog');
            }

            const updatedBlog = await response.json();
            setNotes(prevNotes => prevNotes.map(note => note._id === id ? updatedBlog.blog : note));
            console.log("Blog edited successfully", "success");
        } catch (error) {
            console.error("Error editing Blog:", error.message);
            // showAlert("Failed to edit blog", "error");
        }
    };


    // Delete Blog 
    const deleteCategory =  async (id) => {
        try {
            const response = await fetch(`${host}/api/blog/deleteblog/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to delete Blog ');
            }

            const deletedClient = await response.json();
            setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
            console.log("Blog deleted successfully", "success");
        } catch (error) {
            console.error("Error deleting Blog :", error.message);
            // showAlert("Failed to delete client", "error");
        }
    };

    // Add Blog detail
    const addCategorySubcategory = async (clientId, name, description, image) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('image', image);

            const response = await fetch(`${host}/api/blog/${clientId}/subcategories`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to add Blog detail');
            }

            const updatedClient = await response.json();
            setNotes(prevNotes => prevNotes.map(note => note._id === clientId ? updatedClient.client : note));
            console.log("Blog detail added successfully", "success");
        } catch (error) {
            console.error("Error adding Blog detail:", error.message);
            // showAlert("Failed to add subcategory", "error");
        }
    };


    // Edit Blog detail
    const editCategorySubcategory = async (clientId, subcategoryId, name, description, image) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            if (image) {
                formData.append('image', image);
            }

            const response = await fetch(`${host}/api/blog/${clientId}/subcategories/${subcategoryId}`, {
                method: 'PUT',
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
                body: formData
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to edit Blog detail');
            }

            const updatedClient = await response.json();
            setNotes(prevNotes => prevNotes.map(note => note._id === clientId ? updatedClient.client : note));
            console.log("Blog detail edited successfully", "success");
        } catch (error) {
            console.error("Error editing Blog detail:", error.message);
            // showAlert("Failed to edit subcategory", "error");
        }
    };


    // Delete Blog detail
    const deleteCategorySubcategory = async (clientId, subcategoryId) => {
        try {
            const response = await fetch(`${host}/api/blog/${clientId}/subcategories/${subcategoryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to delete Blog detail');
            }

            // Update state to remove the deleted subcategory
            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note._id === clientId
                        ? { ...note, subcategories: note.subcategories.filter(sub => sub._id !== subcategoryId) }
                        : note
                )
            );
        } catch (error) {
            console.error("Error deleting Blog detail:", error.message);
            // showAlert("Failed to delete subcategory", "error");
        }
    };


    return (
        <NoteContext.Provider value={{
            notes,
            getCategory,
            addCategory,
            editCategory,
            deleteCategory,
            addCategorySubcategory,
            editCategorySubcategory,
            deleteCategorySubcategory,
        }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
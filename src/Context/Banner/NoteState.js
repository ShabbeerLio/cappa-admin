import react from "react"
import NoteContext from "./NoteContext";
import { useState } from "react";
import host from "../../Host/Host";

const NoteState = (props) => {

    const notesData = []

    const [notes, setNotes] = useState(notesData);

    // ................................. Category.......................................//
    // Get all Category 
    const getCategory = async () => {
        const response = await fetch(`${host}/api/category/fetchallcategory`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setNotes(json)
    };

    // Add Category
    const addCategory = async (category) => {
        try {
            const response = await fetch(`${host}/api/category/addcategory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ category })
            });

            if (!response.ok) {
                throw new Error('Failed to add client');
            }

            const client = await response.json();
            setNotes(prevNotes => [...prevNotes, client]);
            console.log("Client added successfully", "success");
        } catch (error) {
            console.error("Error adding client:", error.message);
            // showAlert("Failed to add client", "error");
        }
    };

    // Edit category
    const editCategory = async (id, category) => {
        try {
            const response = await fetch(`${host}/api/category/updatecategory/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ category })
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to edit Category');
            }

            const updatedClient = await response.json();
            setNotes(prevNotes => prevNotes.map(note => note._id === id ? updatedClient.client : note));
            console.log("Category edited successfully", "success");
        } catch (error) {
            console.error("Error editing Category:", error.message);
            // showAlert("Failed to edit client", "error");
        }
    };


    // Delete Category 
    const deleteCategory = async (id) => {
        try {
            const response = await fetch(`${host}/api/category/deletecategory/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to delete category ');
            }

            const deletedClient = await response.json();
            setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
            console.log("category deleted successfully", "success");
        } catch (error) {
            console.error("Error deleting category :", error.message);
            // showAlert("Failed to delete client", "error");
        }
    };

    // ................................. SubCategory.......................................//

    // Get all subCategory by category id
    const getsubCategory = async (categoryId) => {
        try {
            const response = await fetch(`${host}/api/category/${categoryId}/getsubcategory`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setNotes(data);  // Assuming `notes` is used for storing fetched subcategories
        } catch (error) {
            console.error("Failed to fetch subcategories:", error);
        }
    };

    const addSubcategory = async (clientId, subCategory, subCategorydesc, location, interval, metaTag, metaTitle, metaDesc, subCatimageUrl, about1imageUrl, about2imageUrl) => {
        try {
            const formData = new FormData();

            // Append text data
            formData.append('subCategory', subCategory);
            formData.append('subCategorydesc', subCategorydesc);
            formData.append('location', location);
            formData.append('interval', interval);
            formData.append('metaTag', metaTag);
            formData.append('metaTitle', metaTitle);
            formData.append('metaDesc', metaDesc);

            // Append images if provided
            if (subCatimageUrl) formData.append('subCatImage', subCatimageUrl); // Match with backend field name
            if (about1imageUrl) formData.append('about1Image', about1imageUrl); // Match with backend field name
            if (about2imageUrl) formData.append('about2Image', about2imageUrl); // Match with backend field name

            const response = await fetch(`${host}/api/category/${clientId}/subcategories`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to add subcategory');
            }

            const updatedClient = await response.json();
            setNotes(prevNotes => prevNotes.map(note => note._id === clientId ? updatedClient.client : note));
            console.log("subcategory added successfully", "success");
        } catch (error) {
            console.error("Error adding subcategory:", error.message);
            // Optionally, you can show an alert or error message here
        }
    };


    // Edit Blog detail
    const editSubcategory = async (clientId, subcategoryId, subCategory, subCategorydesc, location, interval, metaTag, metaTitle, metaDesc, subCatimageUrl, about1imageUrl, about2imageUrl) => {
        try {
            const formData = new FormData();
            formData.append('subCategory', subCategory);
            formData.append('subCategorydesc', subCategorydesc);
            formData.append('location', location);
            formData.append('interval', interval);
            formData.append('metaTag', metaTag);
            formData.append('metaTitle', metaTitle);
            formData.append('metaDesc', metaDesc);

            // Append images if provided
            if (subCatimageUrl) {
                console.log("Appending subCatImage:", subCatimageUrl);
                formData.append('subCatImage', subCatimageUrl);
            }
            if (about1imageUrl) {
                console.log("Appending about1Image:", about1imageUrl);
                formData.append('about1Image', about1imageUrl);
            }
            if (about2imageUrl) {
                console.log("Appending about2Image:", about2imageUrl);
                formData.append('about2Image', about2imageUrl);
            }

            // Log formData to ensure it's correctly structured (for debugging)
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            // Send PUT request to update subcategory
            const response = await fetch(`${host}/api/category/${clientId}/subcategories/${subcategoryId}`, {
                method: 'PUT',
                headers: {
                    "auth-token": localStorage.getItem('token'),
                },
                body: formData
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to edit subcategory');
            }

            const updatedClient = await response.json();
            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note._id === clientId ? updatedClient.client : note
                )
            );

            console.log("Blog subcategories updated successfully");
            // Optionally show a success alert
            // showAlert("Subcategory updated successfully", "success");
        } catch (error) {
            console.error("Error editing subcategory:", error.message);
            // Optionally show an error alert
            // showAlert("Failed to edit subcategory", "error");
        }
    };

    // Delete Blog detail
    const deleteSubcategory = async (clientId, subcategoryId) => {
        try {
            const response = await fetch(`${host}/api/category/${clientId}/subcategories/${subcategoryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                }
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to delete subcategories');
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
            console.error("Error deleting subcategories:", error.message);
            // showAlert("Failed to delete subcategory", "error");
        }
    };

    // Add Tour
    const addTour = async (clientId, subcategoryId, name, day, description, image) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('day', day);
            formData.append('image', image);

            const response = await fetch(`${host}/api/category/${clientId}/subcategories/${subcategoryId}/tour`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to add Tour detail');
            }

            // Parse the response data
            const data = await response.json();

            // Update state
            if (data.tour) {
                // Assuming the response contains the new tour object and we want to add it to the corresponding subcategory
                setNotes(prevNotes => prevNotes.map(note =>
                    note._id === clientId
                        ? {
                            ...note, subcategories: note.subcategories.map(sub =>
                                sub._id === subcategoryId
                                    ? { ...sub, tour: [...sub.tour, data.tour] }
                                    : sub
                            )
                        }
                        : note
                ));
                console.log("Tour added successfully");
            }

        } catch (error) {
            console.error("Error adding Tour detail:", error.message);
            // Optionally handle error here (showAlert)
        }
    };



    // Edit Tour detail
    const editTour = async (clientId, subcategoryId, tourId, name, day, description, image) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('day', day);
            formData.append('description', description);
            if (image) {
                formData.append('image', image);
            }

            const response = await fetch(`${host}/api/category/${clientId}/subcategories/${subcategoryId}/tour/${tourId}`, {
                method: 'PUT',
                headers: {
                    "auth-token": localStorage.getItem('token')
                },
                body: formData
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error || 'Failed to edit Tour detail');
            }
            const data = await response.json();
            // Update state
            if (data.tour) {
                // Assuming the response contains the new tour object and we want to add it to the corresponding subcategory
                setNotes(prevNotes => prevNotes.map(note =>
                    note._id === clientId
                        ? {
                            ...note, subcategories: note.subcategories.map(sub =>
                                sub._id === subcategoryId
                                    ? { ...sub, tour: [...sub.tour, data.tour] }
                                    : sub
                            )
                        }
                        : note
                ));
                console.log("Tour added successfully");
            }
        } catch (error) {
            console.error("Error editing Tour detail:", error.message);
            // showAlert("Failed to edit subcategory", "error");
        }
    };


    // Delete Tour 
    const deleteTour = async (clientId, subcategoryId, tourId) => {
        try {
            const response = await fetch(`${host}/api/category/${clientId}/subcategories/${subcategoryId}/tour/${tourId}`, {
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

    // ................................. Blogs.......................................//
    // Get all Blog 
    const getBlogs = async () => {
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
    const addBlogs = async (category, categorydesc, tag, status, draft, subcategories, image, publishDate) => {
        try {
            // Create a new FormData instance
            const formData = new FormData();
            formData.append("category", category);
            formData.append("categorydesc", categorydesc);
            formData.append("tag", tag);
            formData.append("status", status);
            formData.append("draft", draft);
            subcategories.forEach((subcategory, index) => {
                formData.append(`subcategories[${index}][name]`, subcategory.name);
                formData.append(`subcategories[${index}][description]`, subcategory.description || '');
            });
            if (image) {
                formData.append("image", image);
            }

            // Add the publish date if provided
            if (publishDate) {
                formData.append("publishDate", publishDate);
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
    const editBlogs = async (id, category, categorydesc, tag, status, draft, publishDate, subcategories, image) => {
        try {
            const formData = new FormData();
            formData.append('category', category);
            formData.append('categorydesc', categorydesc);
            formData.append('tag', tag);
            formData.append("status", status);
            formData.append("draft", draft);

            subcategories.forEach((sub, index) => {
                formData.append(`subcategories[${index}][name]`, sub.name);
                formData.append(`subcategories[${index}][description]`, sub.description || '');
            });

            if (image) {
                formData.append('image', image);
            }

            if (publishDate) {
                formData.append("publishDate", publishDate);
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
    const deleteBlogs = async (id) => {
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
    const addBlogsSubcategory = async (clientId, name, description, image) => {
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
    const editBlogsSubcategory = async (clientId, subcategoryId, name, description, image) => {
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
    const deleteBlogsSubcategory = async (clientId, subcategoryId) => {
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

            // ............................Category...........................
            getCategory,
            addCategory,
            editCategory,
            deleteCategory,
            getsubCategory,
            addSubcategory,
            editSubcategory,
            deleteSubcategory,
            addTour,
            editTour,
            deleteTour,

            // .............................Blogs..............................
            getBlogs,
            addBlogs,
            editBlogs,
            deleteBlogs,
            addBlogsSubcategory,
            editBlogsSubcategory,
            deleteBlogsSubcategory,
        }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
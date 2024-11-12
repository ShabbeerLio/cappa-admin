import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { useEffect, useState } from 'react';
import SidebarNav from "./Components/Sidebar/SidebarNav";
import { CssBaseline } from "@mui/material";
import Topbar from "./Components/Sidebar/Topbar";
import Login from "./Components/LogIn/Login";
import IndienRun from "./Pages/IndienRun";
import Blog from "./Pages/Blog/Blog";
import NoteState from "./Context/Banner/NoteState";
import Alert from "./Components/Alert/Alert";
import Category from "./Pages/Category";
import axios from 'axios';
import host from "./Host/Host";

function App() {
  const [isSidebar, setIsSidebar] = useState(true);
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  const [categories, setCategories] = useState([]);
  const formatCategoryName = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
  };

  // Fetch categories from backend on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${host}/api/category/fetchallcategory`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        showAlert("Failed to load categories", "error");
      }
    };

    fetchCategories();
  }, []);

  return (
    <NoteState>
      <Router>
        <CssBaseline />
        <div className="App">
          <SidebarNav isSidebar={isSidebar} />
          <div className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Alert alert={alert} />
            <Routes>
              <Route path="/" exact element={<Category showAlert={showAlert} />} />
              <Route path="/login" exact element={<Login showAlert={showAlert} />} />
              {categories.map((item) => (
                <Route
                  key={item._id}
                  path={`/${formatCategoryName(item.category)}`}
                  exact element={
                    <IndienRun
                      title={item.category}
                      showAlert={showAlert}
                      id={item._id}
                    />} />
              ))}
              <Route path="/Blog" exact element={<Blog showAlert={showAlert} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;

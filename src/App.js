import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { useState } from 'react';
import SidebarNav from "./Components/Sidebar/SidebarNav";
import Topbar from "./Components/Sidebar/Topbar";
import Category from "./Pages/Category";

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

  return (
    <Router>
      {/* <CssBaseline /> */}
      <div className="App">
        <SidebarNav isSidebar={isSidebar} />
        <div className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          {/* <Alert alert={alert} /> */}
          <Routes>
            {/* <Route path="/login" exact element={<Login showAlert={showAlert} />} /> */}
            <Route path="/" exact element={<Category showAlert={showAlert} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

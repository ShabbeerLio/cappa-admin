import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { useState } from 'react';
import SidebarNav from "./Components/Sidebar/SidebarNav";
import Topbar from "./Components/Sidebar/Topbar";
import Category from "./Pages/Category";
import Login from "./Components/LogIn/Login";
import IndienRun from "./Pages/IndienRun";
import NepalRun from "./Pages/NepalRun";
import SrilankaRun from "./Pages/SrilankaRun";
import BhutanRun from "./Pages/BhutanRun";
import Malediven from "./Pages/Malediven";
import LuxusGold from "./Pages/LuxusGold";
import IndienLux from "./Pages/IndienLux";
import SafariRun from "./Pages/SafariRun";
import Blog from "./Pages/Blog/Blog";

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
            <Route path="/login" exact element={<Login showAlert={showAlert} />} />
            <Route path="/" exact element={<IndienRun showAlert={showAlert} />} />
            <Route path="/nepal-rundreise" exact element={<NepalRun showAlert={showAlert} />} />
            <Route path="/srilanka-rundreise" exact element={<SrilankaRun showAlert={showAlert} />} />
            <Route path="/bhutan-rundreise" exact element={<BhutanRun showAlert={showAlert} />} />
            <Route path="/malediven-badeurlaub" exact element={<Malediven showAlert={showAlert} />} />
            <Route path="/luxus-goldenes-dreieck" exact element={<LuxusGold showAlert={showAlert} />} />
            <Route path="/indien-luxusreise" exact element={<IndienLux showAlert={showAlert} />} />
            <Route path="/safari-rundreise" exact element={<SafariRun showAlert={showAlert} />} />
            <Route path="/Blog" exact element={<Blog showAlert={showAlert} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

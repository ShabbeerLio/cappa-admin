import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import {
  MenuOutlined as MenuOutlinedIcon
} from '@mui/icons-material';
import { IoIosLogOut } from "react-icons/io";
import { TbCategory } from "react-icons/tb";
import { TbCategory2 } from "react-icons/tb";
import { FaBoxOpen } from "react-icons/fa";
import { MdHighlight } from "react-icons/md";
import logo from "../../Assets/logo.png";
import "./SidebarNav.css";
import axios from "axios";
import host from "../../Host/Host";

const Item = ({ title, to, icon, selected, setSelected }) => {

  return (
    <MenuItem
      active={selected === title}
      style={{ color: "black" }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};


const SidebarNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  let history = useNavigate();
  const handleLogout = () => {
    console.log("clicked and token removed")
    localStorage.removeItem("token");
    history("/login");
  };

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
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjcyYjE5NzdmNGNmNzA4MWU5ZTFiZGU1In0sImlhdCI6MTczMTQwNjE0NH0.g1STs5UkRi7t590ZSh-kuDgSlie5CWsDqD97GQEZoLc"
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "white !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        // borderRight: "1px solid #ddd",
      }}
    >
      <ProSidebar collapsed={isCollapsed} width="300px">
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 0px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography className="sidenav-logo">
                  <img src={logo} alt="Logo" />
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {categories.map((item) => (
              <Item
              key={item._id}
                title={item.category}
                to={`/${formatCategoryName(item.category)}`}
                icon={<TbCategory />}
                selected={selected}
                setSelected={setSelected}
                className="sidenav-icon"
              />
            ))}
            <Item
              title="Blog"
              to="/Blog"
              icon={<MdHighlight />}
              selected={selected}
              setSelected={setSelected}
              className="sidenav-icon"
            />
            <Item
              title="Category"
              to="/"
              icon={<MdHighlight />}
              selected={selected}
              setSelected={setSelected}
              className="sidenav-icon"
            />
          </Box>
          <Box className="side-logout" paddingLeft={isCollapsed ? undefined : "10%"} onClick={handleLogout}>
            <Item
              title="Log Out"
              // to="/login"
              icon={<IoIosLogOut />}
              selected={selected}
              setSelected={setSelected}
              className="sidenav-icon "
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarNav;

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
            <Item
              title="Indien Rundreise"
              to="/indien-rundreise"
              icon={<TbCategory />}
              selected={selected}
              setSelected={setSelected}
              className="sidenav-icon"
            />
            <Item
              title="Nepal Rundreise"
              to="/nepal-rundreise"
              icon={<TbCategory2 />}
              selected={selected}
              setSelected={setSelected}
              className="sidenav-icon"
            />
            <Item
              title="Srilanka Rundreise"
              to="/srilanka-rundreise"
              icon={<FaBoxOpen />}
              selected={selected}
              setSelected={setSelected}
              className="sidenav-icon"
            />
            <Item
              title="Bhutan Rundreise"
              to="/bhutan-rundreise"
              icon={<MdHighlight />}
              selected={selected}
              setSelected={setSelected}
              className="sidenav-icon"
            />
            <Item
              title="Malediven Badeurlaub"
              to="/malediven-badeurlaub"
              icon={<MdHighlight />}
              selected={selected}
              setSelected={setSelected}
              className="sidenav-icon"
            />
            <Item
              title="Luxus Goldenes Dreieck"
              to="/luxus-goldenes-dreieck"
              icon={<MdHighlight />}
              selected={selected}
              setSelected={setSelected}
              className="sidenav-icon"
            />
            <Item
              title="Indien Luxusreise"
              to="/indien-luxusreise"
              icon={<MdHighlight />}
              selected={selected}
              setSelected={setSelected}
              className="sidenav-icon"
            />
            <Item
              title="Safari Rundreise"
              to="/safari-rundreise"
              icon={<MdHighlight />}
              selected={selected}
              setSelected={setSelected}
              className="sidenav-icon"
            />
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

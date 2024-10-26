import { Box, IconButton, useTheme } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const Topbar = () => {

    let history = useNavigate();
    // const context = useContext();
    // const { notes, getNotes, editNote } = context;

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        history("/login");
      };

    return (
        <Box display="flex" justifyContent="flex-end" borderBottom="1px solid #ddd" p={2}>
            <Box display="flex">
                <IconButton onClick={toggleDrawer(true)}>
                    <PersonIcon />
                </IconButton>
            </Box>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <Typography variant="h6" sx={{ p: 2 }} display="flex" justifyContent="space-between">
                        Profile
                        <CloseIcon/>
                    </Typography>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                        <Typography variant="body1" textAlign="center">
                            Administrator {/* Replace with dynamic name if needed */}
                        </Typography>
                    </Box>
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' ,width:"100%"}}>
                        <Button variant="contained" onClick={handleLogout} sx={{width:"100%"}}>
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default Topbar;

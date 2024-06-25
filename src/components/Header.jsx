import React, { useState } from "react";
import { gmaillogo } from "../constants/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppBar, Toolbar, styled, InputBase, Box, IconButton, Tooltip, Menu, MenuItem, Avatar, Divider, ListItemIcon } from '@mui/material';
import { Menu as MenuIcon, Search, Tune, HelpOutlineOutlined, SettingsOutlined, AppsOutlined, PersonAdd, Settings, Logout } from '@mui/icons-material';
import { logout } from "../Redux/Reducers/AuthReducer";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#f5F5F5",
  boxShadow: "none"
})

const SearchWrapper = styled(Box)({
  backgroundColor: "#EAF1F8",
  marginLeft: 80,
  borderRadius: 24,
  minWidth: 690,
  maxWidth: 720,
  height: 48,
  display: "flex",
  justifyContent: "space-between",
  alignItems: 'center',
  padding: "0 20px",
  '& > div': {
    width: "100%",
    padding: "0 10px"
  }
});

const OptionsWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "end",
  '& > svg': {
    marginLeft: 25
  }
});

export default function Header({ toggleDrawer }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout())
    navigate('/login');
    setAnchorEl(null);
  }


  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton onClick={toggleDrawer}>
          <MenuIcon color="action" />
        </IconButton>
        <img src={gmaillogo} alt="logo" style={{ width: 100, marginLeft: 15 }} />
        <SearchWrapper>
          <IconButton>
            <Search color="action" />
          </IconButton>
          <InputBase
            placeholder="Search in mail"
          />
          <IconButton>
            <Tune color="action" />
          </IconButton>
        </SearchWrapper>
        <OptionsWrapper>
          <IconButton>
            <HelpOutlineOutlined color="action" />
          </IconButton>
          <IconButton>
            <SettingsOutlined color="action" />
          </IconButton>
          <IconButton>
            <AppsOutlined color="action" />
          </IconButton>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </OptionsWrapper>
      </Toolbar>
    </StyledAppBar >
  );
}
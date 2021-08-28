import React from "react";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);
  const navigate = useNavigate();
  const { userHasAuthenticated } = useAppContext();

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    navigate("/login", { replace: true });
  }

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <Typography variant="h3">Library Managament System</Typography>
        <RouterLink to="/"></RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp></Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;

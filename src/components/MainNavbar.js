import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";
import Logo from "../../src/static/a.png";

const MainNavbar = (props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}>
      <img src={Logo} alt="icon" height="60" />
    </Toolbar>
  </AppBar>
);

export default MainNavbar;

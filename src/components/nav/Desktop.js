import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {
  Apps,
  AccountCircle,
  Settings,
  Announcement,
  HelpOutline,
} from "@material-ui/icons";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.appBar.backgroundColor,
    color: theme.appBar.color,
  },
}));

export default function DesktopNav() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Azuuk <b>Chat</b>
          </Typography>
          <div className={classes.grow} />
          <Typography variant="inherit" noWrap className={classes.dateTime}>
            {moment().format("LT")}
            <span> • </span>
            {moment().format("ddd[,] MMM D")}
          </Typography>
          &nbsp; &nbsp; &nbsp;
          <IconButton
            aria-label="help outline"
            aria-haspopup="true"
            color="inherit"
          >
            <HelpOutline />
          </IconButton>
          <IconButton
            aria-label="announcement"
            aria-haspopup="true"
            color="inherit"
          >
            <Announcement />
          </IconButton>
          <IconButton
            aria-label="settings"
            aria-haspopup="true"
            color="inherit"
          >
            <Settings />
          </IconButton>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <IconButton
            aria-label="more apps"
            aria-haspopup="true"
            color="inherit"
          >
            <Apps />
          </IconButton>
          <IconButton
            aria-label="account circle"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

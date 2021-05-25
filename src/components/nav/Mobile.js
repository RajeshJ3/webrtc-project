import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.appBar.backgroundColor,
    color: theme.appBar.color,
  },
  button: {
    padding: "16px 13px",
    backgroundColor: theme.button.backgroundColor,
    "&:hover": {
      backgroundColor: theme.button.hoverBackgroundColor,
    },
  },
  googleMeet: {
    maxHeight: "280px",
    marginBottom: "20px",
  },
}));

export default function MobileNav(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="body1" noWrap>
            Azuuk <b>Chat</b>
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

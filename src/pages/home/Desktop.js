import { useState } from "react";
import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DesktopNav from "../../components/nav/Desktop";
import Middle from "../../components/alignments/Middle";
import { Keyboard, VideoCall } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  more: {
    padding: "20px 0px 30px 0px",
    color: "#555",
    fontWeight: "500",
  },
  button: {
    padding: "16px 13px",
    marginBottom: "10px",
    backgroundColor: theme.button.backgroundColor,
    "&:hover": {
      backgroundColor: theme.button.hoverBackgroundColor,
    },
  },
  noBottom: {
    marginBottom: "10px",
  },
  howTo: {
    maxWidth: "350px",
  },
}));

export default function Desktop(props) {
  const classes = useStyles();
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.replace(`/j/${code}`);
  };

  return (
    <>
      <DesktopNav />
      <Grid container>
        <Grid item sm={12} md={6}>
          <Middle height="90vh" width="100%">
            <Typography variant="h4">
              Premium video meetings.
              <br />
              Now free for everyone.
            </Typography>
            <Typography variant="body1" className={classes.more}>
              We re-engineered the service we built for secure business
              meetings, Google Meet, to make it free and available for all.
            </Typography>
            <div className={classes.grow}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                className={classes.button}
                startIcon={<VideoCall />}
                component={Link}
                to={`/${props.code}`}
              >
                New Meeting
              </Button>
              &nbsp; &nbsp; &nbsp;
              <form autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="medium"
                  placeholder="Enter a code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Keyboard style={{ color: "#555" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </div>
            <br />
            <br />
            <Divider />
            <Typography variant="body1" className={classes.more}>
              <Link to="/">Learn more</Link> about Google Meet
            </Typography>
          </Middle>
        </Grid>
        <Grid item sm={12} md={6}>
          <Middle height="90vh">
            <center>
              <img
                src="https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg"
                alt="google-meet"
              />
              <Typography variant="h5" className={classes.noBottom}>
                Get a link you can share
              </Typography>
              <Typography variant="body2" className={classes.howTo}>
                Click <b>New Meeting</b> to get a link you can send to people
                you want to meet with
              </Typography>
            </center>
          </Middle>
        </Grid>
      </Grid>
    </>
  );
}

import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MobileNav from "../../components/nav/Mobile";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import Middle from "../../components/alignments/Middle";
import { Keyboard, VideoCall } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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

export default function Mobile(props) {
  const classes = useStyles();

  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.replace(`/j/${code}`);
  };

  return (
    <div>
      <MobileNav />
      <Grid container>
        <Grid item xs={12} md={6}>
          <Middle height="35vh" width="100%">
            <div className={classes.grow}>
              <Button
                fullWidth
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
                  fullWidth
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
          </Middle>
        </Grid>
        <Grid item xs={12} md={6}>
          <Middle height="40vh">
            <center>
              <img
                src="https://www.gstatic.com/meet/user_edu_get_a_link_light_90698cd7b4ca04d3005c962a3756c42d.svg"
                alt="google-meet"
                className={classes.googleMeet}
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
    </div>
  );
}

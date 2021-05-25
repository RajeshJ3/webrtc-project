import { Button, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CallEnd, Mic, Videocam, WhatsApp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100vh",
    width: "100%",
    backgroundColor: "#111",
  },
  topRight: {
    position: "absolute",
    backgroundColor: "#fff",
    top: "0px",
    right: "0px",
    height: "48px",
    width: "431px",
    borderRadius: "0px 0px 0px 10px",
  },
  waiting: {
    position: "absolute",
    color: "#f2f2f2",
    fontWeight: "bold",

    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  whatsApp: {
    backgroundColor: theme.whatsApp.backgroundColor,
    "&:hover": {
      backgroundColor: theme.whatsApp.darkBackgroundColor,
    },
  },
  remoteVid: {
    height: "100%",
    width: "100%",
    transform: "scaleX(-1)",
  },
  localVid: {
    position: "absolute",
    bottom: "100px",
    right: "10px",
    height: "200px",
    width: "100px",
    transform: "scaleX(-1)",
  },
  bottom: {
    padding: "17px 0px",
    position: "absolute",
    backgroundColor: "#fff",
    bottom: "0px",
    width: "100%",
    display: "flex",
    flexFlow: "row",
    alignItems: "middle",
    justifyContent: "center",
  },
  button: {
    border: "1px solid #e2e2e2",
    margin: "0px 10px",
    borderRadius: "50% !important",
    padding: "14px",
  },
  callEnd: {
    color: "red",
  },
}));

export default function Desktop(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <video
        className={classes.remoteVid}
        ref={props.setRemoteVideoRef}
        autoPlay
        playsInline
      ></video>
      {props.userConnected ? null : (
        <div className={classes.waiting}>
          <Typography variant="h5" align="center">
            Waiting..
          </Typography>
          {props.initiator ? (
            <>
              <Typography variant="caption" align="center">
                Meanwhile, you can share the link
              </Typography>
              <br />
              <br />
              <center>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.whatsApp}
                  startIcon={<WhatsApp />}
                  onClick={() => {
                    let URL = `whatsapp://send?text=Let's connect over Azuuk Chat. URL: https://${window.location.hostname}/j/${props.code}`;
                    window.location.replace(URL);
                  }}
                >
                  Share
                </Button>
              </center>
            </>
          ) : null}
        </div>
      )}
      <video
        className={classes.localVid}
        ref={props.setLocalVideoRef}
        autoPlay
        playsInline
        muted
      ></video>
      {/* <div className={classes.topRight}></div> */}
      <div className={classes.bottom}>
        <IconButton aria-label="Mic" className={classes.button}>
          <Mic />
        </IconButton>
        <IconButton
          aria-label="delete"
          className={classes.button}
          onClick={() => window.location.replace("/")}
        >
          <CallEnd className={classes.callEnd} />
        </IconButton>
        <IconButton aria-label="delete" className={classes.button}>
          <Videocam />
        </IconButton>
      </div>
    </div>
  );
}

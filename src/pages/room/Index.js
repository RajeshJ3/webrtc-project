import React, { Component } from "react";
import Desktop from "./Desktop";
import { config } from "../../config";
import firebase from "firebase/app";
import "firebase/database";
import { doOffer, getSync } from "../../modules/firebase";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      database: null,
      userConnected: false,
      localStream: null,
      localConnection: null,
      initiator: this.props.initiator,
    };
    this.localVideoRef = React.createRef();
    this.remoteVideoRef = React.createRef();
  }

  componentDidMount = async () => {
    const initiator = this.props.initiator;
    const code = this.props.match.params.room_id;

    firebase.initializeApp(config);
    const database = firebase.database();

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    this.localVideoRef.srcObject = localStream;

    const localConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun2.1.google.com:19302" }],
    });

    const dataChannel = localConnection.createDataChannel("channel");

    dataChannel.onopen = (e) => {
      console.log("OPEN");
      this.setState({
        ...this.state,
        userConnected: true,
      });
    };

    dataChannel.onclose = (e) => {
      console.log("CLOSE");
      window.location.replace("/");
    };

    localConnection.addStream(localStream);

    localConnection.ontrack = (e) => {
      if (this.remoteVideoRef.srcObject !== e.streams[0]) {
        this.remoteVideoRef.srcObject = e.streams[0];
      }
    };

    if (initiator) {
      await this.createOffer(localConnection, database, code, initiator);
    } else {
      await this.createAnswer(localConnection, database, code, initiator);
    }

    this.setState({
      database,
      localStream,
      localConnection,
      initiator,
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.database !== nextState.database) {
      return false;
    }
    if (this.state.localStream !== nextState.localStream) {
      return false;
    }
    if (this.state.localConnection !== nextState.localConnection) {
      return false;
    }

    return true;
  }

  createOffer = async (localConnection, database, code, initiator) => {
    const offer = await localConnection.createOffer();
    await localConnection.setLocalDescription(offer);
    doOffer(offer, database, code);
    await getSync(
      localConnection,
      database,
      code,
      this.remoteVideoRef,
      initiator
    );
  };

  createAnswer = async (localConnection, database, code, initiator) => {
    await getSync(
      localConnection,
      database,
      code,
      this.remoteVideoRef,
      initiator
    );
  };

  setLocalVideoRef = (ref) => {
    this.localVideoRef = ref;
  };

  setRemoteVideoRef = (ref) => {
    this.remoteVideoRef = ref;
  };

  render() {
    return (
      <Desktop
        setLocalVideoRef={this.setLocalVideoRef}
        setRemoteVideoRef={this.setRemoteVideoRef}
        userConnected={this.state.userConnected}
        initiator={this.state.initiator}
        code={this.props.match.params.room_id}
      />
    );
  }
}

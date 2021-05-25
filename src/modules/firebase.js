export const doOffer = async (offer, database, code) => {
  await database.ref("/notifs/" + code).set({
    type: "offer",
    offer: JSON.stringify(offer),
  });
};

export const doAnswer = async (answer, database, code) => {
  await database.ref("/notifs/" + code).update({
    type: "answer",
    answer: JSON.stringify(answer),
  });
};

export const getSync = async (
  localConnection,
  database,
  code,
  remoteVideoRef,
  initiator
) => {
  database.ref("/notifs/" + code).on("value", async (snapshot) => {
    const notif = snapshot.val();
    if (!notif) {
      window.location.replace("/");
    }
    switch (notif.type) {
      case "offer":
        if (initiator) {
          break;
        }
        localConnection.onicecandidate = async function (event) {
          if (event.candidate) {
            await database.ref("/notifs/" + code).update({
              type: "candidate",
              from: code,
              candidate: JSON.stringify(event.candidate),
            });
          }
        };

        const offer = JSON.parse(notif.offer);
        localConnection.setRemoteDescription(offer);

        // create an answer to an offer
        const ans = await localConnection.createAnswer();
        localConnection.setLocalDescription(ans);

        doAnswer(ans, database, code);
        break;

      case "answer":
        const answer = JSON.parse(notif.answer);
        localConnection.setRemoteDescription(answer);
        break;

      case "candidate":
        const candidate = JSON.parse(notif.candidate);
        if (candidate) {
          localConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
        break;

      default:
        break;
    }
  });
};

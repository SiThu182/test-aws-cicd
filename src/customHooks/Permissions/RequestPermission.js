import { RecordRTCPromisesHandler } from "recordrtc";
import swal from "sweetalert";

export const requestAudio = async () => {
  let recorder = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      microphone: true,
    })
    .then((stream) => {
      let makeRecorder = new RecordRTCPromisesHandler(stream, {
        type: "audio",
      });

      return makeRecorder;
    })
    .catch((error) => {
      setTimeout(() => {
        swal({
          title: "Audio Error",
          text:
            "Please allow audio permission and click OK to reload. Error: " +
            error,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((ok) => {
          if (ok) {
            window.location.reload();
          }
        });
      }, 1000);

      console.error("Audio request failed:", error);
      return undefined;
    });
  // .catch((error) => {
  //   setTimeout(() => {
  //     swal({
  //       title: "Audio Error",
  //       text:
  //         "Please allow audio permission and click ok to reload.Error: " +
  //         error,

  //       icon: "warning",
  //       buttons: true,
  //       dangerMode: true,
  //     }).then((ok) => {
  //       if (ok) {
  //         window.location.reload();
  //       }
  //     });
  //   }, 5000);
  // });

  return recorder;
};

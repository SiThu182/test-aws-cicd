import swal from "sweetalert";

function AlertReload(e, text) {
  return setTimeout(() => {
    swal({
      title: "Audio Error",
      text: "Error: " + e + text,

      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
  }, 2000);
}

export default AlertReload;

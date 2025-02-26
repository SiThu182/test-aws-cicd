import axios from "axios";
import swal from "sweetalert";
import { getCookie } from "../../../Utils/GetCookies";

export const statusHandler = (
  status,
  id,
  setStatusId,
  navigate,
  backendURL,
  handleReload
) => {
  setStatusId(id);
  let requestStatus = status === 0 ? 1 : 0;
  let token = getCookie("userToken");
  if (!token) navigate("/login");
  let config = { headers: { Authorization: "Bearer " + token } };
  swal({
    title: "Are you sure?",
    text: "Are you sure you want to change the status",
    icon: "warning",
    buttons: true,
    confirmButtonText: "Yes",
    denyButtonText: "No",
    showDenyButton: true,
    dangerMode: true,
  }).then((result) => {
    if (result) {
      try {
        axios
          .post(
            backendURL,
            {
              status: requestStatus,
              id: id,
            },
            config
          )
          .then(() => {
            // dispatch(fetchMtPostsAsync(postPath));
            swal({
              title: "Success Alert",
              text: "Status change success",
              icon: "success",
              // buttons: true,
              // dangerMode: true,
              timer: 2000,
            });
            setStatusId();
            handleReload(true);
            // window.location.reload(false)
          })
          .catch((error) => {
            // dispatch(fetchMtPostsAsync(postPath));
            swal({
              title: "Status change error?",
              text: error.message,
              icon: "warning",
              buttons: true,
              dangerMode: true,
            });
            setStatusId();
            // window.location.reload(false);
          });
      } catch (error) {
        // dispatch(fetchMtPostsAsync(postPath));
        swal({
          title: "Error Alert",
          text: "Failed to change success",
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
        setStatusId();
        // window.location.reload(false);
      }
    } else {
      // dispatch(fetchMtPostsAsync(postPath));
      swal({
        text: "Your status is not changed",
        icon: "info",
        confirmButtonText: "Ok",
      });
      setStatusId();
      // window.location.reload(false );
    }
  });
};

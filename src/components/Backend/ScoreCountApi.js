import axios from "axios";
import swal from "sweetalert";
import { getCookie } from "../../Utils/GetCookies";

const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

export const fetchScoreCount = async (
  id,
  type,
  activity_id,
  category,
  checking
) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  try {
    const response = await axios.get(
      `${backendURL}checking-score-count/${id}?scoring_type=${type}&activity_id=${activity_id}&category=${category}&checking=${
        checking === true ? 1 : 0
      }`,
      config
    );

    if (response.data.status === 1) {
      // swal({
      //   title: "Success",
      //   text: response.data.message,
      //   icon: "success",
      //   button: "OK!",
      //   closeOnClickOutside: false,
      // });
    } else if (response.data.status === 5) {
      swal({
        title: "Warning",
        text: response.data.message,
        icon: "warning",
        buttons: true,
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, switch to limited plan",
        cancelButtonText: "No, cancel please!",
        closeOnClickOutside: false,
      }).then((yes) => {
        if (yes) {
          try {
            axios.get(
              `${backendURL}switch-to-limited-plan/${id}?scoring_type=${type}`,
              config
            );
          } catch (error) {
            swal({
              title: "Warning",
              text: error.message,
              icon: "warning",
              button: "OK!",
              closeOnClickOutside: false,
            });
            return error.message;
          }
        } else {
          return;
        }
      });
    } else {
      if (checking !== true) {
        swal({
          title: "Warning",
          text: response.data.message,
          icon: "warning",
          button: "OK!",
          closeOnClickOutside: false,
        });
      }
    }

    return response.data.status;
  } catch (error) {
    if (error.response && error.response.data.message) {
      swal({
        title: "Warning",
        text: error.response.data.message,
        icon: "warning",
        button: "OK!",
        closeOnClickOutside: false,
      });
      return error.response.data.status;
    } else {
      swal({
        title: "Warning",
        text: error.message,
        icon: "warning",
        button: "OK!",
        closeOnClickOutside: false,
      });
      return error.message;
    }
  }
};

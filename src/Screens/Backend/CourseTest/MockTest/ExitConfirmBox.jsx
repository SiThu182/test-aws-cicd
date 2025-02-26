import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { AdminCheckContext } from "./MockTest";
import axios from "axios";
import { getCookie } from "../../../../Utils/GetCookies";
function ExitConfirmBox(props) {
  const {
    open,
    setOpen,
    setSave,
    check = false,
    finish = false,
    mockId = undefined,
    mockTestType,
  } = props;
  const checkByAdmin = useContext(AdminCheckContext);
  const userId = localStorage.getItem("userId");
  const data = useParams();
  const navigate = useNavigate();
  let allCategory = [
    "ra",
    "rs",
    "di",
    "asq",
    "rl",
    "we",
    "swt",
    "rmc",
    "rsmc",
    "rfib",
    "rwfib",
    "rop",
    "smc",
    "mc",
    "fib",
    "hiw",
    "hcs",
    "smw",
    "sst",
    "wfd",
  ];
  const exit = () => {
    if (!finish && !check) {
      setSave(true);
    }

    swal({
      title: "Are you sure?",
      text: finish
        ? "Please checkout your score with save score button or your progress will be lost!"
        : "Your current progress is saved.Are you sure you want to exit ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        let backendURL = process.env.REACT_APP_BACKEND_ADMIN;
        let token = getCookie("userToken");
        let config = { headers: { Authorization: "Bearer " + token } };
        let saveProgress = localStorage.getItem(userId + "saveMt" + data.id);
        let type = parseInt(mockTestType);

        let sendData = {
          mt_id: data.id,
          mt_type_id: type,
          user_id: userId,
          save_progress: saveProgress,
        };
        if (finish) {
          localStorage.removeItem(userId + "saveMt" + data.id);
          allCategory.forEach((c) => {
            localStorage.removeItem(c);
          });

          try {
            axios
              .post(`${backendURL}temp-mt/delete-save-file`, sendData, config)
              .then((res) => {
                setOpen(false);
                if (res.data.status == 1) {
                  const keys = Object.keys(localStorage);
                  const savefilteredKeys = keys.filter((key) =>
                    key.startsWith(userId + "saveMt" + data.id)
                  );
                  savefilteredKeys.forEach((key) => {
                    localStorage.removeItem(key);
                  });
                  setOpen(false);
                  checkByAdmin === true
                    ? navigate("/admin/mocktestlist")
                    : navigate("/mocktest/tabs");

                  // swal({
                  //   title: "Success Saving Progress",
                  //   text: "Your progress is saved successfully.",
                  //   icon: "info",
                  //   buttons: true,
                  // }).then(() => {
                  //   checkByAdmin === true
                  //     ? navigate("/admin/mocktestlist")
                  //     : navigate("/mocktest/tabs");
                  // });
                } else {
                  swal({
                    title: "Failed to delet Save Progress",
                    text: res.data.message,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  });
                  return setOpen(false);
                }
              })
              .catch((error) => {
                swal({
                  title: "Failed to delet Save Progress",
                  text:
                    error.response?.data?.message ??
                    error + ". Please try again.",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                });
                return setOpen(false);
              });
          } catch (error) {
            swal({
              title: "Failed to delete Save Progress",
              text: "Please check your internet connection and try again .",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            });
            return setOpen(false);
          }
        } else {
          if (
            data.id !== undefined &&
            data.id !== null &&
            saveProgress !== null &&
            saveProgress !== undefined
          ) {
            try {
              axios
                .post(`${backendURL}temp-mt`, sendData, config)
                .then((res) => {
                  if (res.data.status == 1) {
                    swal({
                      title: "Success Saving Progress",
                      text: "Your progress is saved successfully.",
                      icon: "info",
                      buttons: true,
                      timer: 2000,
                    }).then(() => {
                      allCategory.forEach((c) => {
                        localStorage.removeItem(c);
                      });
                      const keys = Object.keys(localStorage);
                      const savefilteredKeys = keys.filter((key) =>
                        key.startsWith(userId + "saveMt" + data.id)
                      );
                      savefilteredKeys.forEach((key) => {
                        localStorage.removeItem(key);
                      });
                      checkByAdmin === true
                        ? navigate("/admin/mocktestlist")
                        : navigate("/mocktest/tabs");
                      return setOpen(false);
                    });
                  } else {
                    swal({
                      title: "Failed to Save Progress",
                      text: res.data.message,
                      icon: "warning",
                      buttons: true,
                      dangerMode: true,
                    });
                    return setOpen(false);
                  }
                });
            } catch (error) {
              swal({
                title: "Failed to Save Progress",
                text: "Please check your internet connection and try again .",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              });
              return setOpen(false);
            }
          } else {
            checkByAdmin === true
              ? navigate("/admin/mocktestlist")
              : navigate("/mocktest/tabs");
            return setOpen(false);
          }
        }
      } else {
        // if (!finish) {
        //   localStorage.removeItem(userId + "saveMt" + mockId);
        // }
        return setOpen(false);
      }
    });
  };
  return open ? exit() : "";
}

export default ExitConfirmBox;

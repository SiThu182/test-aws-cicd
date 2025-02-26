import axios from "axios";
import swal from "sweetalert";
import { getCookie } from "../../Utils/GetCookies";

export const FormApiFunction = async (
  request,
  loading,
  setLoading,
  backendURL,
  navigate,
  edit,
  backToPrev = false
) => {
  setLoading(true);
  let token = getCookie("userToken");
  if (token === null || token === undefined) {
    navigate("/login");
    return;
  }

  let config = { headers: { Authorization: "Bearer " + token } };
  if (edit === "edit") {
    request.append("_method", "PUT");
  }
  try {
    const res = await axios.post(`${backendURL}`, request, config);

    if (res.status === 200) {
      if (res.data.errors) {
        swal({
          title: "Warning",
          text: res.data.errors[0],
          icon: "warning",
          button: "OK!",
        });
        setLoading(false);
      } else {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          button: "OK!",
        });
      }

      setLoading(false);
      if (backToPrev) {
        navigate(-1);
      }
    } else {
      swal({
        title: "Warning",
        text: res.data.message,
        icon: "warning",
        button: "OK!",
      });

      setLoading(false);
    }
  } catch (error) {
    swal({
      title: "Warning",
      text: error.message,
      icon: "warning",
      button: "OK!",
    });
    setLoading(false);
  }
};

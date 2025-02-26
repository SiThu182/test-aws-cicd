import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { getCookie } from "../../Utils/GetCookies";

const useVideoRecordingTypes = () => {
  const [types, setTypes] = useState(null);

  const backendURL =
    process.env.REACT_APP_BACKEND_ADMIN + "video-recording-type";
  useEffect(() => {
    try {
      let fetchTypes = async () => {
        let token = getCookie("userToken");
        let config = {
          headers: { Authorization: "Bearer " + token },
          method: "GET",
        };
        const res = await axios.get(`${backendURL}`, config);

        setTypes(res?.data?.data);
      };
      fetchTypes();
    } catch (error) {
      swal({
        title: "Warning",
        text: error.message,
        icon: "warning",
        button: "OK!",
      });
    }
  }, [backendURL]);

  return { types };
};

export default useVideoRecordingTypes;

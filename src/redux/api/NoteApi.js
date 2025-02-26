import axios from "axios";
import { getCookie } from "../../Utils/GetCookies";

const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
//posts
export const FetchSavePostNoteList = async (post_id, user_id) => {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const response = await axios.get(
    `${backendURL}get-save-post-note-list/${post_id}/${user_id}`,
    config
  );
  return response;
};

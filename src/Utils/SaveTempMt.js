import axios from "axios";
import { getCookie } from "./GetCookies";

export async function saveTempMt(mockId, mockTestType) {
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };
  const userId = localStorage.getItem("userId");
  await axios
    .post(
      `${process.env.REACT_APP_BACKEND_ADMIN}temp-mt`,
      {
        user_id: userId,
        mt_id: mockId,
        mt_type_id: mockTestType,
        save_progress: localStorage.getItem(userId + "saveMt" + mockId),
      },
      config
    )
    .then((res) => {
      if (res.data.status == 1) {
        console.log("save success");
      } else {
        console.log("error ");
      }
    });
}

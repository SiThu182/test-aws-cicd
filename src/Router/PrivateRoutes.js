// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../Utils/GetCookies";

// import swal from "sweetalert";

// import NotAllowed from "../Screens/NotAllowed";
// import Test from "../Screens/Backend/CourseTest/Speaking/ReadAloud/Test";

const PrivateRoute = () => {
  // const pathName = window.location.pathname;
  // const { role } = useSelector((state) => state.user);
  const userToken = getCookie("userToken") ? getCookie("userToken") : null;
  // let mockTestProp = /\/mocktest\/card|\/admin\/dashboard/;
  // let mockTestPath = mockTestProp.test(pathName);

  let token = userToken === null || userToken === "undefined" ? false : true;
  return token ? (
    // token && role === 3 && !mockTestPath ? (
    //   <NotAllowed></NotAllowed>
    // ) : (
    <Outlet />
  ) : (
    <Navigate to="/Login"></Navigate>
  );
};

export default PrivateRoute;

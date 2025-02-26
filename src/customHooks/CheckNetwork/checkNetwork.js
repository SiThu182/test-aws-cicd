import { useState, useEffect } from "react";
import useIsTabActive from "../../Screens/Backend/CourseTest/MockTest/ActiveTabCheck";
import axios from "axios";

const useNetworkStatus = () => {
  const tabActive = useIsTabActive();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (tabActive) {
      const interval = setInterval(() => {
        axios
          .get("https://httpbin.org/get")
          .then((response) => {
            !isOnline && setIsOnline(true);
          })
          .catch((error) => {
            if (error.code === "ERR_NETWORK") {
              isOnline && setIsOnline(false);
            }
        
          });
      }, 5000);
      return () => clearInterval(interval);
    }
    //     fetch("https://httpbin.org/get", {
    //       // mode: "no-cors",
    //     })
    //       .then(() => !isOnline && setIsOnline(true))
    //       .catch((error) => {
    //         if (error.message === "Failed to fetch") {
    //           isOnline && setIsOnline(false);
    //         }

    //       });
    //   }, 5000);

    //   return () => clearInterval(interval);
    // }
  }, [isOnline, tabActive]);

  return { isOnline };
};

export default useNetworkStatus;

import { useEffect, useState } from "react";

function useCheckPermissions() {
  const [permissionAllowed, setPermissionAllowed] = useState("");
  const [audioError, setAuidoError] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.permissions
        .query({ name: "microphone" })
        .then((permissionObj) => {
          if (permissionObj.state != permissionAllowed)
            setPermissionAllowed(permissionObj.state);

          if (permissionObj.state === "granted") {
            navigator.mediaDevices
              .getUserMedia({
                audio: true,
                microphone: true,
              })
              .then(() => {
                if (audioError?.length !== 0) {
                  setAuidoError([]);
                }
              })
              .catch((e) => {
                setAuidoError(e.message);
              });
          }
        })
        .catch((error) => {
          setPermissionAllowed(error);
        });
    }, 5000);
    return () => clearInterval(interval);
  }, [permissionAllowed]);

  return { permissionAllowed, audioError };
}

export default useCheckPermissions;

import React from "react";

import { useState } from "react";
import swal from "sweetalert";


function BrowserType() {

  const [showErrorOnce, setShowErrorOnce] = useState(true);


  const alertBox = () => {
    swal({
      title: "Device Support Warning!",
      text: "Currently audio scoring is not supported in Firefox. We suggest you try other browsers",
      icon: "warning",
      dangerMode: true,
      confirmButton: "Ok",
    }).then(() => {
      setShowErrorOnce(false);
    });
  };

  return (
    <div>{localStorage.getItem('browser') === "Firefox" && showErrorOnce ? alertBox() : ""}</div>
  );
}

export default BrowserType;

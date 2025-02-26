import axios from "axios";
import { Component } from "react";

class ErrrorBoundaryClass extends Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    const userAgent = navigator.userAgent;
    let userDevice;
    if (/Win/i.test(userAgent)) {
      userDevice = "User is using a Windows device";
    } else if (/Mac/i.test(userAgent)) {
      userDevice = "User is using a Mac device";
    } else if (/Android/i.test(userAgent)) {
      userDevice = "User is using an Android device";
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      userDevice = "User is using an iOS device";
    } else {
      userDevice = "User is using some other device";
    }

    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_API}error-logs`, {
          error: error.message,
          page_route: window.location.pathname,
          user_device: userDevice,
          browser: localStorage.getItem("browser"),
          user_id: localStorage.getItem("userId"),
        })
        .then(() => {
          ["route_path", "error"].forEach((key) => {
            localStorage.removeItem(key);
          });
        })
        .catch(() => {
          localStorage.setItem("error", error.message);
          localStorage.setItem("route_path", window.location.pathname);
          localStorage.setItem("user_device", userDevice);
        });
    } catch (error) {
      localStorage.setItem("error", error.message);
      localStorage.setItem("route_path", window.location.pathname);
      localStorage.setItem("user_device", userDevice);
    }
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrrorBoundaryClass;

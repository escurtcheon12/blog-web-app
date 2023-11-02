import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  return (
    <div className="login">
      <div className="square_login">
        <div>
          <FontAwesomeIcon className="icon_login" icon={faUserCircle} />
        </div>
        <div className="place_input_login">
          <input
            className="username_input_login form-control"
            placeholder="Username"
          />
          <input
            className="password_input_login form-control"
            placeholder="Password"
          />
          <button type="button" className="btn  button_login">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

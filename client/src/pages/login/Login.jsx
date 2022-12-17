import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

const Login = () => {
  const [error, setError] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const { dispatch, isFetching } = useContext(Context);

  const handleChange = (e) => {
    setLoginCredentials((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginCredentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
    }
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username..."
          className="loginInput"
          name="username"
          value={loginCredentials.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password..."
          className="loginInput"
          name="password"
          value={loginCredentials.password}
          onChange={handleChange}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>

        {error && (
          <span style={{ marginTop: "10px", fontWeight: "bold", color: "red" }}>
            Wrong Username or Password
          </span>
        )}
      </form>
      <button className="loginRegisterButton">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import PublicNavbar from "../components/PublicNavbar";
import { Button, Checkbox, Form, Message } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import "./style.css";
function Login() {
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [errorLogin, setErrorLogin] = useState();
  const [bannedMsg, setBannedMsg] = useState();
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    axios
      .post("https://blog-app-api-d134.onrender.com/blog/api/login", userData, {
        headers: {
          "access-control-allow-origin": "https://momments.netlify.app",
        },
      })
      .then((res) => {
        // console.log(res);
        setLoading(false);
        if (res.data.status) {
          if (res.data.data.isBanned) {
            return setBannedMsg("You are banned for 7 days");
          } else {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("id", res.data.data.userId);
            localStorage.setItem("isUser", res.data.data.isUser);
            localStorage.setItem("isBanned", res.data.data.isBanned);
            navigate(`/blogs`);
          }
        } else {
          setErrorLogin(res.data.error);
        }
      })
      .catch((err) => {
        setError(err.response.data.error);
        // console.dir(err);
        setLoading(false);
      });
  };

  return (
    <div className="register-container">
      <PublicNavbar />
      <div className="register-subcontainer">
        <h1>Login to your account</h1>
        <Link style={{ fontSize: "0.7rem" }} to="/login/admin">
          Login as an admin
        </Link>
        <Form className="register-form">
          <Form.Field>
            {/* <label>Last Name</label> */}
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            {/* <label>Last Name</label> */}
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="Show password"
              onClick={() => {
                setShow(!show);
              }}
            />
          </Form.Field>
          {error && (
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>{error}</p>
            </Message>
          )}
          {errorLogin && (
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>{errorLogin}</p>
            </Message>
          )}
          {bannedMsg && (
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>{bannedMsg}</p>
            </Message>
          )}

          <Button
            type="submit"
            onClick={() => {
              handleLogin();
            }}
            loading={loading}
            color="brown"
          >
            Login
          </Button>
          <Link to="/register">Don't have an account yet? Register Now.</Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;

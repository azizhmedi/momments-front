import React, { useState } from "react";
import PublicNavbar from "../components/PublicNavbar";
import { Button, Checkbox, Form, Message } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router";

import "./style.css";
function Login() {
  const [adminData, setAdminData] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [errorLogin, setErrorLogin] = useState();
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    axios
      .post(
        "https://blog-app-api-d134.onrender.com/blog/api/admin/login",
        adminData,
        {
          headers: {
            "access-control-allow-origin": "https://momments.netlify.app",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("adminId", res.data.data.adminId);
          localStorage.setItem("isAdmin", res.data.data.isAdmin);
          navigate(`/admin`);
          // console.log(res)
        } else {
          // console.log(res)
          setErrorLogin(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error);
        setLoading(false);
      });
  };

  return (
    <div className="register-container">
      <PublicNavbar />
      <div className="register-subcontainer">
        <h1>Login as an admin</h1>
        <Form className="register-form">
          <Form.Field>
            {/* <label>Last Name</label> */}
            <input
              type="email"
              placeholder="Admin Email"
              onChange={(e) => {
                setAdminData({ ...adminData, email: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            {/* <label>Last Name</label> */}
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => {
                setAdminData({ ...adminData, password: e.target.value });
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
        </Form>
      </div>
    </div>
  );
}

export default Login;

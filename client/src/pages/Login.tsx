// Importing necessary components and hooks
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import {
  Checkbox,
  Link,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { CStyles } from "../Common/CStyles";
import WingsLogo from "../Assets/wings.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

// Component for the Login page
const Login = () => {
  // State to manage input data (username and password)
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token") as any);
    if (token) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);

  // Accessing the login function from the AuthContext
  const { login } = useAuth();

  // Function to handle the login process
  const handleLogin = async () => await login(data);

  return (
    <Stack
      style={{
        padding: 50,
        marginTop: "10%",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Stack
        style={{
          // border: "1px solid #3f3f3f",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          alignItems: "center",
          display: "flex",
          padding: "35px 25px",
          borderRadius: 8,
        }}
        tokens={{ childrenGap: 10 }}
      >
        <Stack horizontal style={{ alignItems: "center" }}>
          <img
            style={{ objectFit: "contain", height: 50 }}
            src={WingsLogo}
            alt="Slack"
          />
          <h2
            style={{
              fontSize: 45,
              fontWeight: 500,
              letterSpacing: "-.60px",
              margin: 0,
              maxWidth: 700,
              marginLeft: 10,
              textAlign: "center",
            }}
          >
            Wings
          </h2>
        </Stack>
        <p style={{ margin: 8 }}>
          We suggest using the email address that you use at work.
        </p>
        <Stack
          tokens={{ childrenGap: 15 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            value={data.email}
            className={CStyles.input}
            style={{ maxWidth: 350, minWidth: 350 }}
            onChange={(e, value) => {
              setData((d) => ({ ...d, email: value! }));
            }}
            placeholder="name@work-email.com"
          />
          <TextField
            type="password"
            value={data.password}
            placeholder="Password"
            className={CStyles.input}
            style={{ maxWidth: 350, minWidth: 350 }}
            onChange={(e, value) => {
              setData((d) => ({ ...d, password: value! }));
            }}
          />
        </Stack>
        <Stack
          tokens={{ childrenGap: 10 }}
          horizontal
          style={{
            alignItems: "center",
            fontSize: 13,
            marginTop: 10,
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Checkbox className={CStyles.check} label="Remember me?" />
          <Link>Forgot Password</Link>
        </Stack>
        <PrimaryButton
          style={{
            backgroundColor: "#377DFF",
            color: "#fff",
            fontWeight: 500,
            marginTop: 25,
            width: 350,
            height: 30,
            borderRadius: 4,
            border: "1px solid #fff",
            cursor: "pointer",
          }}
          onClick={() => {
            handleLogin();
          }}
        >
          Sign in with email
        </PrimaryButton>
      </Stack>
    </Stack>
  );
};

export default Login;

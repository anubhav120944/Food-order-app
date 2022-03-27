import { useEffect, useState } from "react";
import styles from "./login.module.css";
import { useAuth } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { email_regx } from "../utils";
// import { Redirect } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (password.length > 8) {
      throw new Error("The length of password is less than 8");
    }
  }, [password]);




  if (auth.user) {
    return <Navigate to="/" />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setError("Please enter both email and password");
    }
    if (email_regx.test(email) === false) {
      return setError("Enter a valid email");
    }
    setLoggingIn(true);
    const response = await auth.login(email, password);
    // console.log(response);
    if (response.success) {
      console.log("Successfully logged in");
      navigate("/");
    } else {
      setError(response.message);
      setLoggingIn(false);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className={styles.field}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Paasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? "Logging in ..." : "Log In"}
        </button>
      </div>
    </form>
  );
};

export default Login;

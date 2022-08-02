import { useState, useContext } from "react";
import { loginService } from "../../services/auth.services";
import { AuthContext } from "../../context/auth.context.js"
import { useNavigate } from "react-router-dom";

function Login() {

  const { authenticateUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password
    }

    try {
      const response = await loginService(user);
      localStorage.setItem("authToken", response.data.authToken)
      authenticateUser();
      navigate("/scrap");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit">Login</button>
      </form>

    </div>
  );
}

export default Login;

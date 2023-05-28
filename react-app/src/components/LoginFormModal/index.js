import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'));
    closeModal();
  }

  return (
    <div className="login-div">
      <h1>Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul className="login-errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="login-text">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="login-text">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="confirm-login" type="submit">Log In</button>
      </form>

      <div>
            <button className="demo-login" onClick={handleDemo}>Demo User</button>
      </div>
    </div>
  );
}

export default LoginFormModal;

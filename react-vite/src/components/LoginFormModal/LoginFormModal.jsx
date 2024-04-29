import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { FaXmark } from 'react-icons/fa6';
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };
  const demoClick = () => {
    return dispatch(thunkLogin({ email: 'demo@aa.io', password: 'password' }))
      .then(closeModal);
  };

  return (
    <div className="login-modal-container">
      <h1 className="login-modal-title">Log In</h1>
      <FaXmark className="login-modal-close" onClick={closeModal} size={40}/>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
        </label>
        {errors.email && <p className="login-error">{errors.email}</p>}
        <label className="login-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </label>
        {errors.password && <p className="login-error">{errors.password}</p>}
        <button type="submit" className="login-button">Log In</button>
      </form>
      <button className="demo-login-button" onClick={demoClick}>Log in as Demo User</button>
    </div>
  );
}

export default LoginFormModal;

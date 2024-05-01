import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { FaXmark } from 'react-icons/fa6';
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      validationErrors.email = "Invalid email address format.";
    }

    if (!username) {
      validationErrors.username = "Username cannot be empty.";
    } else if (username.length < 4 || username.length > 20) {
      validationErrors.username = "Username must be between 4 and 20 characters.";
    }

    if (!firstName) {
      validationErrors.first_name = "First name cannot be empty.";
    }

    if (!lastName) {
      validationErrors.last_name = "Last name cannot be empty.";
    }

    if (password.length <= 5) {
      validationErrors.password = "Password must be more than 5 characters.";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords must match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const serverResponse = await dispatch(thunkSignup({
        email,
        username,
        first_name:firstName,
        last_name: lastName,
        password,
    }));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-modal-container">
      <FaXmark className="signup-modal-close" onClick={closeModal} size={30}/>
      <h1 className="signup-modal-title">Sign Up</h1>
      {Object.values(errors).map((error, idx) => (
        <p key={idx} className="signup-error-message">{error}</p>
      ))}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-input-group">
          <label className="signup-label">
            Email
            <input
              className="signup-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="signup-label">
            Username
            <input
              className="signup-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="signup-label">
            First Name
            <input
              className="signup-input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label className="signup-label">
            Last Name
            <input
              className="signup-input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label className="signup-label">
            Password
            <input
              className="signup-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="signup-label">
            Confirm Password
            <input
              className="signup-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="signup-submit-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;

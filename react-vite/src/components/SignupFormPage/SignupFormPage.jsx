import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";


function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [setSubmitAttempted] = useState(false);



  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
    if (username.length < 4 || username.length > 20) {
      newErrors.username = "Username must be between 4 and 20 characters.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse?.errors) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="signup-form-container">
      <h1 className="signup-form-title">Sign Up</h1>
      {Object.values(errors).map((error, idx) => (
        <p key={idx} className="signup-error-message">{error}</p>
      ))}
      <form onSubmit={handleSubmit} className="signup-form" noValidate autoComplete="off">
        <label className="signup-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />
        </label>
        {errors.email && <p className="signup-error">{errors.email}</p>}
        <label className="signup-label">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-input"
          />
        </label>
        {errors.username && <p className="signup-error">{errors.username}</p>}
        <label className="signup-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
            required
          />
        </label>
        {errors.password && <p className="signup-error">{errors.password}</p>}
        <label className="signup-label">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-input"
          />
        </label>
        {errors.confirmPassword && <p className="signup-error">{errors.confirmPassword}</p>}
        <button type="submit" className="signup-button" disabled={Object.keys(errors).length > 0}>Sign Up</button>
      </form>
    </div>
  );
}




export default SignupFormPage;

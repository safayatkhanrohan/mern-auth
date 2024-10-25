import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearMessage, registerUser } from "./userSlice";
import toast from "react-hot-toast";

const SignUp = () => {
  const { loading, successMessage, errorMessage } = useSelector(
    (state) => state.user
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
    };
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        toast.success(successMessage);
      }, 500);
      dispatch(clearMessage());
      navigate("/login");
    } else if (errorMessage) {
      setTimeout(() => {
        toast.error(errorMessage);
      }, 500);
      dispatch(clearMessage());
    }
  }, [successMessage, errorMessage, dispatch, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center h-full mt-56">
      <main>
        <form
          className="m-auto shadow p-4 rounded-3"
          style={{ width: "350px" }}
          onSubmit={handleSubmit}
        >
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter you name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button
            className="btn btn-primary w-100 py-2"
            type="submit"
            disabled={loading}
          >
            Sign Up
          </button>
        </form>
      </main>
    </div>
  );
};

export default SignUp;

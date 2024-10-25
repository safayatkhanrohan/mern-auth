import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearMessage, loginUser } from "./userSlice";
import toast from "react-hot-toast";

const Login = () => {
  const { loading, successMessage, errorMessage, isAuthenticated } =
    useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (successMessage) {
      navigate("/");
      setTimeout(() => {
        toast.success(successMessage);
        dispatch(clearMessage());
      }, 500);
    } else if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessage());
    } else if (isAuthenticated && !successMessage) {
      navigate("/");
      toast("You are already logged in");
    }
  }, [successMessage, errorMessage, isAuthenticated, dispatch, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center h-full mt-56">
      <main>
        <form
          className="m-auto shadow p-4 rounded-3"
          style={{ width: "350px" }}
          onSubmit={handleSubmit}
        >
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;

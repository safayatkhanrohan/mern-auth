import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, logoutUser } from "./userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
    toast.success("Logged out successfully");
  };
  const handleDelete = () => {
    dispatch(deleteUser());
    navigate("/");
    toast.success("Account deleted successfully");
  };

  return loading ? (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <div className="mt-56 h-full justify-content-center align-items-center d-flex flex-column gap-3">
      <h1 className="text-center">
        Welcome <br />
        {user.name}
      </h1>
      <div className="card">
        <div className="card-header text-center fs-4">Profile</div>
        <div className="card-body">
          <p className="card-text">Email: {user.email}</p>
          <p className="card-text">id: {user._id}</p>
        </div>

        <div className="card-footer">
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
          <button className="btn btn-warning float-end" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
     try {
          const response = await axios.post("/api/signin", user);
          return response.data;
     } catch (error) {
          throw error.response.data.message;
     }
});

export const registerUser = createAsyncThunk("user/registerUser", async (user) => {
     try {
          const response = await axios.post("/api/signup", user);
          return response.data;
     } catch (error) {
          throw error.response.data.message;
     }
});

export const getUserProfile = createAsyncThunk("user/getUserProfile", async () => {
     const response = await axios.get("/api/profile");
     return response.data.user;
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
     const response = await axios.get("/api/logout");
     return response.data;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async () => {
     const response = await axios.delete("/api/delete");
     return response.data;
});

const userSlice = createSlice({
     name: "user",
     initialState: {
          loading: false,
          isAuthenticated: false,
          user: null,
          successMessage: null,
          errorMessage: null,
     },
     reducers: {
          clearMessage: (state) => {
               state.successMessage = null;
               state.errorMessage = null;
          },
     },
     extraReducers: (builder) => {
          builder.addCase(loginUser.pending, (state) => {
               state.loading = true;
          });
          builder.addCase(loginUser.fulfilled, (state, action) => {
               state.loading = false;
               state.isAuthenticated = true;
               state.successMessage = action.payload.message;
          });
          builder.addCase(loginUser.rejected, (state, action) => {
               state.loading = false;
               state.errorMessage = action.error.message;
          });
          builder.addCase(registerUser.pending, (state) => {
               state.loading = true;
          });
          builder.addCase(registerUser.fulfilled, (state, action) => {
               state.loading = false;
               state.successMessage = action.payload.message;
          });
          builder.addCase(registerUser.rejected, (state, action) => {
               state.loading = false;
               state.errorMessage = action.error.message;
          });
          builder.addCase(getUserProfile.pending, (state) => {
               state.loading = true;
          });
          builder.addCase(getUserProfile.fulfilled, (state, action) => {
               state.loading = false;
               state.isAuthenticated = true;
               state.user = action.payload;
          });
          builder.addCase(getUserProfile.rejected, (state) => {
               state.loading = false;
          });
          builder.addCase(logoutUser.pending, (state) => {
               state.loading = true;
          });
          builder.addCase(logoutUser.fulfilled, (state) => {
               state.loading = false;
               state.isAuthenticated = false;
               state.user = null;
          });
          builder.addCase(logoutUser.rejected, (state) => {
               state.loading = false;
          });
          builder.addCase(deleteUser.pending, (state) => {
               state.loading = true;
          });
          builder.addCase(deleteUser.fulfilled, (state) => {
               state.loading = false;
               state.isAuthenticated = false;
               state.user = null;
          });
          builder.addCase(deleteUser.rejected, (state) => {
               state.loading = false;
          });
     },
});

export const { clearMessage } = userSlice.actions;
export default userSlice.reducer;

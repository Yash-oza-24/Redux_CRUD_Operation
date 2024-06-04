import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userServices from "./userServices";

const getUserLocalStorage = window.localStorage.getItem("USER")
  ? JSON.parse(window.localStorage.getItem("USER"))
  : null;
const initialState = {
  user: getUserLocalStorage,
  alluser: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  registerUser: {},
  // otpvarified: false,
  functionalities: [],
};
export const login = createAsyncThunk(
  "auth/user-login",
  async (data, thunkAPI) => {
    try {
      return await userServices.login(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const register = createAsyncThunk(
  "auth/user-register",
  async (user, thunkAPI) => {
    try {
      return await userServices.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getuser = createAsyncThunk(
  "auth/get-alluser",
  async (thunkAPI) => {
    try {
      return await userServices.getalluser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteuser = createAsyncThunk(
  "auth/delete-user",
  async (userId, thunkAPI) => {
    try {
      const response = await userServices.deleteuser(userId);
      return { userId: userId, message: response.message };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateUser = createAsyncThunk(
  "auth/update-user",
  async ({ userId, updatedUserData }, thunkAPI) => {
    try {
      return await userServices.updateUser(userId, updatedUserData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const sentotp = createAsyncThunk(
  "auth/sent-otp",
  async (user, thunkAPI) => {
    console.log(user);
    try {
      return await userServices.sendOTP(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const verifyOTP = createAsyncThunk(
  "auth/verify-otp",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await userServices.verifyOTP(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state, action) => {
      window.localStorage.removeItem("USER");
      window.localStorage.removeItem("TOKEN");
      state.user = null;
    },
    setFunctionalities: (state, action) => {
      state.functionalities = action.payload;
    },
    userDeleted: (state, action) => {
      state.alluser = state.alluser.filter(
        (user) => user.id !== action.payload.userId
      );
    },
    userUpdated: (state, action) => {
      state.alluser = state.alluser.filter(
        (user) => user.id !== action.payload.userId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        localStorage.setItem("USER", JSON.stringify(action.payload));
        state.isError = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.functionalities = action.payload;
        state.isError = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getuser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.alluser = action?.payload?.users;
        state.isError = false;
      })
      .addCase(getuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteuser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(sentotp.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(sentotp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(sentotp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.otpVerified = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});
export const { handleLogout } = authslice.actions;
export default authslice.reducer;

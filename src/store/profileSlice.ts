import { createSlice } from "@reduxjs/toolkit";
// import {
//   getProfileApi,
//   saveProfileApi,
//   getProfileImageApi,
//   saveProfileImageApi,
// } from "../api/settingApi";
import type { ProfileStateType } from "../types/profile";
// import { RootState } from ".";
// import { toast } from "react-hot-toast";

const initialState: ProfileStateType = {
  loading: false,
  loadingImage: false,
  error: false,
  body: {},
};

// export const fetchProfile = createAsyncThunk(
//   "profile/fetchProfile",
//   async (_, thunkAPI) => {
//     const res = await Promise.all([getProfileApi()]);
//     const { data: profileData } = res[0];
//     const result = { ...profileData };
//     return result;
//   }
// );

// export const fetchProfileImage = createAsyncThunk(
//   "profile/fetchProfileImage",
//   async (_, thunkAPI) => {
//     const { data } = await getProfileImageApi();
//     return { Image: URL.createObjectURL(data) };
//   }
// );

// export const saveProfile = createAsyncThunk(
//   "profile/saveProfile",
//   async ({ name, email }: { name: string; email: string }, thunkAPI) => {
//     const { data, status, errors } = await saveProfileApi(name, email);
//     if (!status) return thunkAPI.rejectWithValue(errors);
//     else return data;
//   }
// );

// export const saveProfileAvatar = createAsyncThunk(
//   "profile/saveProfileAvatar",
//   async ({ formData }: { formData: any }, thunkAPI) => {
//     const { data } = await saveProfileImageApi(formData);
//     return data;
//   }
// );

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setProfile(state, action) {
      state.body = action.payload;
    },
    clearProfile(state) {
      state.body = initialState.body;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchProfile.fulfilled, (state, action) => {
    //     state.body.name = action.payload.Name;
    //     state.body.email = action.payload.Email;
    //     // state.body.balance = action.payload.Balance;
    //     // state.body.avatar = action.payload.Image;
    //     state.loading = false;
    //     state.error = false;
    //   })
    //   .addCase(fetchProfile.pending, (state) => {
    //     state.loading = true;
    //     state.error = false;
    //   })
    //   .addCase(fetchProfile.rejected, (state) => {
    //     state.loading = false;
    //     state.error = true;
    //   });
    // builder
    //   .addCase(fetchProfileImage.fulfilled, (state, action) => {
    //     state.body.avatar = action.payload.Image;
    //     state.loadingImage = false;
    //     state.error = false;
    //   })
    //   .addCase(fetchProfileImage.pending, (state) => {
    //     state.loadingImage = true;
    //     state.error = false;
    //   })
    //   .addCase(fetchProfileImage.rejected, (state) => {
    //     state.loadingImage = false;
    //     state.error = true;
    //   });
    // builder
    //   .addCase(saveProfile.fulfilled, (state, action) => {
    //     // const { Name, Email, Id } = action.payload;
    //     // state.body = {
    //     //   id: Id,
    //     //   name: Name,
    //     //   email: Email,
    //     //   ...state.body,
    //     // };
    //     state.loading = false;
    //     state.error = false;
    //     toast.success(`Your profile has been saved.`);
    //   })
    //   .addCase(saveProfile.pending, (state) => {
    //     state.loading = true;
    //     state.error = false;
    //   })
    //   .addCase(saveProfile.rejected, (state, action) => {
    //     Object.values(action.payload as []).map((e) => toast.error(e[0]));
    //     state.loading = false;
    //     state.error = true;
    //   });
    // builder
    //   .addCase(saveProfileAvatar.fulfilled, (state, action) => {
    //     // const { Image } = action.payload;
    //     // state.body.avatar = Image;
    //     state.loading = false;
    //     state.error = false;
    //   })
    //   .addCase(saveProfileAvatar.pending, (state) => {
    //     state.loading = true;
    //     state.error = false;
    //   })
    //   .addCase(saveProfileAvatar.rejected, (state) => {
    //     state.loading = false;
    //     state.error = true;
    //   });
  },
});

// export const selectLoading = (state: RootState) => state.profile.loading;

// export const selectProfile = (state: RootState) => state.profile.body;
// export const selectCredit = (state: RootState) => state.profile.body.balance;

// export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;

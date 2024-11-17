import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { getFilesApi } from "../api/filesApi";
import { FilesStateType } from "../types/file";

const initialState: FilesStateType = {
  loading: false,
  files: [],
};

export const fetchFiles = createAsyncThunk(
  "files/fetchFiles",
  async (_, { fulfillWithValue }) => {
    const { data } = await getFilesApi("/");
    console.log(data);
    return fulfillWithValue({ files: data || [] });
  }
);

// export const deleteFile = createAsyncThunk(
//   "files/delete",
//   async (
//     { fileId }: { fileId: number },
//     { fulfillWithValue, rejectWithValue }
//   ) => {
//     const { message, status } = await deleteFileApi(fileId);
//     if (status) {
//       return message;
//     } else {
//       return rejectWithValue({ message });
//     }
//   }
// );

const filesSlice = createSlice({
  name: "files",
  initialState: initialState,
  reducers: {
    clearFiles(state) {
      state.files = initialState.files;
      state.loading = initialState.loading;
      // state.error = initialState.error;
    },
    // selectFile(state, action) {
    //   state.selectedFile = action.payload.file;
    //   state.error = initialState.error;
    // },
    selectFileById(state, action: { payload: { fileId: number } }) {
      // state.selectedFile =
      // state.files.find((f) => f.Id === action.payload.fileId) || null;
      // state.error = initialState.error;
    },
    clearSelectedFile(state) {
      // state.selectedFile = null;
    },
    changeSelectingLoading(state, action) {
      // state.selectLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.files = action.payload.files;
        state.loading = false;
        // state.error = false;
      })
      .addCase(fetchFiles.pending, (state, action) => {
        state.loading = true;
        // state.error = false;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.loading = false;
        // state.error = true;
      });

    // builder
    //   .addCase(deleteFile.fulfilled, (state, action) => {
    //     state.selectedFile = null;
    //     state.error = false;
    //   })
    //   .addCase(deleteFile.pending, (state, action) => {
    //     state.error = false;
    //   })
    //   .addCase(deleteFile.rejected, (state, action) => {
    //     state.selectedFile = null;
    //     state.error = true;
    //   });
  },
});

export const selectLoading = (state: RootState) => state.files.loading;

// export const selectSelectingLoading = (state: RootState) =>
//   state.files.selectLoading;

export const selectFiles = (state: RootState) => state.files.files;

// export const selectSelectedFile = (state: RootState) =>
//   state.files.selectedFile;

export const {
  clearFiles,
  // selectFile,
  selectFileById,
  changeSelectingLoading,
  clearSelectedFile,
} = filesSlice.actions;

export default filesSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NetworkStateType } from "./../types/network";
import { getAvailableNetworkApi } from "./../api/networksApi";
import { RootState } from ".";
import { toast } from "react-hot-toast";
import { NetworkType } from "./../types/network";
import { getStorage, setStorage } from "../utils/helper";

const initialState: NetworkStateType = {
  networks: [],
  selectedNetwork: null,
  loading: false,
};

export const getNetworksAsync = createAsyncThunk(
  "networks",
  async (_, thunkAPI) => {
    const { data, message, status } = await getAvailableNetworkApi();
    if (!status) {
      return thunkAPI.rejectWithValue({ message });
    }
    return thunkAPI.fulfillWithValue({ networks: data });
  }
);

const networksSlice = createSlice({
  name: "networks",
  initialState,
  reducers: {
    changeSelectedNetwork: (state, action) => {
      const network = action.payload as NetworkType;
      state.selectedNetwork = network;
      setStorage("networkName", network.NetworkName);
      setStorage("networkId", network.Id.toString());
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNetworksAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNetworksAsync.fulfilled, (state, action) => {
        const { networks }: { networks: NetworkType[] } = action.payload;
        state.networks = networks;
        let selectedNet: NetworkType = networks[0];
        const netId = getStorage("networkId");
        if (netId) {
          const searchedNet = networks.find(
            (n) => Number(n.Id) === Number(netId)
          );
          if (typeof searchedNet !== "undefined") {
            selectedNet = searchedNet;
          }
        }
        state.selectedNetwork = selectedNet;
        setStorage("networkId", selectedNet.Id.toString());
        setStorage("networkName", selectedNet.NetworkName);
        state.loading = false;
      })
      .addCase(getNetworksAsync.rejected, (state, action) => {
        // const message = action.payload.message as { message: string };
        toast.error("network error");
        state.loading = false;
      });
  },
});

export const selectNetworks = (state: RootState) => state.networks.networks;
export const selectSelectedNetwork = (state: RootState) =>
  state.networks.selectedNetwork;
export const selectNetworkLoading = (state: RootState) =>
  state.networks.loading;

export const { changeSelectedNetwork } = networksSlice.actions;
export default networksSlice.reducer;

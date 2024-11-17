import axios, { AxiosError } from "axios";
import { getStorage } from "../utils/helper";

export const ApiBaseURL: string = process.env.REACT_APP_API_URL || "";
const AccessKey: string = process.env.REACT_APP_ACCESS_KEY || "";
const IpfsApiBaseURL: string = process.env.REACT_APP_IPFS_URL || "";
const IpfsApiKey: string = process.env.REACT_APP_IPFS_API_KEY || "";

export const Fetch = axios.create({
  baseURL: ApiBaseURL,
  headers: {
    "x-api-key": AccessKey,
  },
});

export const AuthFetch = () =>
  axios.create({
    baseURL: ApiBaseURL,
    headers: {
      Authorization: "Bearer " + getStorage("token"),
      "x-api-key": AccessKey,
    },
  });

export const IpfsFetch = () =>
  axios.create({
    baseURL: IpfsApiBaseURL,
    headers: {
      "x-api-key": IpfsApiKey,
    },
  });

export interface FetchResponse<T = any> {
  data: T;
  status: boolean;
  message: string;
  errors?: [];
}

export const FetchCatchResponse = (e: any): FetchResponse => {
  let message = "network error";
  let errors = [];
  if (e instanceof AxiosError) {
    console.log("ERROR", e);
    message = e.response?.data.message || e.response?.data.title;
    errors = e.response?.data.errors;
  } else {
    console.log("ERROR", e);
  }
  return {
    data: null,
    status: false,
    message,
    errors,
  };
};

import { FetchCatchResponse, FetchResponse, IpfsFetch } from "./index";
import { FileType } from "../types/file";
const IpfsApiBaseURL: string = process.env.REACT_APP_IPFS_URL || "";
const IpfsApiKey: string = process.env.REACT_APP_IPFS_API_KEY || "";

export async function getFilesApi(
  url: string
): Promise<FetchResponse<FileType[]>> {
  try {
    // const { data } = await IpfsFetch().post(
    //   `/api/v0/files/ls?arg=${url}&long=true`
    // );

    const myHeaders = new Headers();
    myHeaders.append("x-api-key", IpfsApiKey);

    const requestOptions = {
      method: "POST",
      headers: myHeaders
    };

    const res = await fetch(
      IpfsApiBaseURL + "/api/v0/files/ls?arg=/&long=true",
      requestOptions
    );
    const data = await res.json();

    return {
      data: data.Entries,
      status: true,
      message: "",
    };
  } catch (e) {
    return FetchCatchResponse(e);
  }
}

export async function uploadApi(
  file: File,
  url: string
): Promise<FetchResponse<FileType>> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("path", url);

    const { data } = await IpfsFetch().post(`/api/v0/add?pin=true`, formData);
    return {
      data: data.Result,
      status: true,
      message: data.Message,
    };
  } catch (e) {
    return FetchCatchResponse(e);
  }
}

export async function copyApi(
  hash: string,
  name: string
): Promise<FetchResponse<boolean>> {
  try {
    const formData = new FormData();
    formData.append("arg", `/ipfs/${hash}`);
    formData.append("arg", name);

    await IpfsFetch().post(`/api/v0/files/cp`, formData);
    return {
      data: true,
      status: true,
      message: "",
    };
  } catch (e) {
    return FetchCatchResponse(e);
  }
}

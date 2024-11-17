import { AuthFetch, FetchCatchResponse, FetchResponse } from "./index";
import type {
  ProfileApiResponce,
  ProfileImageApiResponce,
} from "../types/profile";

const Profile_ApiUrl = `/web3-auth/profile`;
const UserAvatar_ApiUrl = `/web3-auth/profile/avatar`;

export type GetProfile = {
  Id: number;
  Balance: number;
};

export async function getProfileApi(): Promise<
  FetchResponse<ProfileApiResponce>
> {
  try {
    const { data } = await AuthFetch().get(Profile_ApiUrl);
    return {
      data: data.Result,
      status: true,
      message: data.Message,
    };
  } catch (e) {
    return FetchCatchResponse(e);
  }
}

export async function saveProfileApi(
  name: string,
  email: string
): Promise<FetchResponse<ProfileApiResponce>> {
  try {
    const { data } = await AuthFetch().put(Profile_ApiUrl, {
      Name: name,
      Email: email,
    });
    return {
      data: data.Result,
      status: true,
      message: data.Message,
    };
  } catch (e) {
    return FetchCatchResponse(e);
  }
}

export async function getProfileImageApi(): Promise<any> {
  return await AuthFetch().get(UserAvatar_ApiUrl, {
    responseType: "blob",
  });
}

export async function saveProfileImageApi(
  formData: any
): Promise<FetchResponse<ProfileImageApiResponce>> {
  try {
    const { data } = await AuthFetch().post(UserAvatar_ApiUrl, formData);
    return {
      data: data.Result,
      status: true,
      message: data.Message,
    };
  } catch (e) {
    return FetchCatchResponse(e);
  }
}

import { Fetch, FetchCatchResponse, FetchResponse } from "./index";

const Networks_ApiUrl = `/web3-auth/networks`;
const Handshake_ApiUrl = `/web3-auth/handshake`;
const Verify_ApiUrl = `/web3-auth/verify`;

export async function getAvailableNetworkApi(): Promise<FetchResponse<any>> {
  try {
    const { data } = await Fetch.get(Networks_ApiUrl);
    return {
      data: data.Result,
      status: true,
      message: data.Message,
    };
  } catch (e) {
    return FetchCatchResponse(e);
  }
}

export async function networkHandshakeApi(
  networkId: string,
  public_key: string
): Promise<FetchResponse<any>> {
  try {
    const { data } = await Fetch.post(Handshake_ApiUrl, {
      NetworkId: networkId,
      WalletAddress: public_key,
    });
    return {
      data: data.Message,
      status: true,
      message: "",
    };
  } catch (e) {
    return FetchCatchResponse(e);
  }
}

export async function authApi(
  networkId: string,
  public_key: string,
  signature: string
): Promise<FetchResponse<any>> {
  try {
    const { data } = await Fetch.put(Verify_ApiUrl, {
      WalletAddress: public_key,
      Signature: signature,
      NetworkId: networkId,
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

export type Profile = {
  id: number;
  name: string;
  email: string;
  balance: number;
  avatar: string;
  confirmation: any;
};

export type ProfileStateType = {
  loading: boolean;
  loadingImage: boolean;
  error: boolean;
  body: Partial<Profile>;
};

export interface ProfileApiResponce {
  Name: string;
  Email: string;
}

export interface ProfileImageApiResponce {
  Image: string;
}

export interface ProfileBalanceApiResponce {
  Balance: number;
}

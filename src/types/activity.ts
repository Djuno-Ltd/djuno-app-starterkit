import { PaginationType } from ".";

export type PaymentStatusType = "Success" | "Pending" | "Failed";

export type PaymentType = {
  message?: string;
  method?: "CREDIT" | "PAYMENT";
  type: number;
  price: number;
  amount?: number;
  status: PaymentStatusType;
  signature: string;
  payed_at?: string;
  created_at?: string;
  updated_at: string;
};

export type ActivityStateType = {
  loading: boolean;
  error: boolean;
  body: {
    payments: PaymentType[];
    paginations: PaginationType;
  };
};

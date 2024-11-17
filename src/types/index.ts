import * as network from "./network";

export { network };

export type Option = {
  value: string;
  label: string;
};

export type Position = {
  x: number;
  y: number;
};

export type Action = {
  type: string;
  payload?: any;
};

export type PaginationType = {
  pageNumber: number;
  pageSize: number;
  total: number;
};

export type PaginationApiType = {
  PageNumber: number;
  Total: number;
};

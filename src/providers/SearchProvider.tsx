import React, { createContext, useContext, useReducer } from "react";

import { Action } from "../types";

export type SearchState = {
  value: string;
  result?: any[];
};

const initialState = {
  value: "",
  result: [],
};

export const SearchContext = createContext<SearchState>(initialState);
export const SearchDispatchContext = createContext<React.Dispatch<any>>(
  () => {}
);

export enum SearchActionType {
  SET_VALUE = "SET_VALUE",
  SET_PATH = "SET_PATH",
  SET_EXTENSION = "SET_EXTENSION",
  SET_RESULT = "SET_RESULT",
  CLEAR = "CLEAR",
}

function reducer(state: SearchState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case SearchActionType.SET_VALUE:
      return { ...state, value: action.payload };
    case SearchActionType.SET_RESULT:
      if (state.value) {
        return { ...state, result: action.payload };
      } else {
        return state;
      }
    case SearchActionType.CLEAR:
      if (JSON.stringify(initialState) === JSON.stringify(state)) return state;
      return initialState;
    default:
      throw Error(`Type [${type}] not exist!`);
  }
}

export type SearchProviderProps = {
  children: React.ReactNode;
};

function SearchProvider({ children }: SearchProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SearchDispatchContext.Provider value={dispatch}>
      <SearchContext.Provider value={state}>{children}</SearchContext.Provider>
    </SearchDispatchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
export const useSearchDispatch = () => useContext(SearchDispatchContext);

export default SearchProvider;

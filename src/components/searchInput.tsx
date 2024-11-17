import React, { useCallback, useRef, useState } from "react";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
// import classNames from "classnames";
import {
  SearchActionType,
  useSearch,
  useSearchDispatch,
} from "../providers/SearchProvider";
// import { useDjibConnection } from "../providers/DjibConnectionProvider";
import Loading from "./loading";
// import { useLocation } from "react-router-dom";
// import { getFilter } from "../utils/drive";

export type SearchInputProps = {
  // open: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

function SearchInput({ ...props }: SearchInputProps) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { value } = useSearch();
  const dispatch = useSearchDispatch();
  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (!value) dispatch({ type: SearchActionType.CLEAR, payload: value });
      else {
        dispatch({ type: SearchActionType.SET_VALUE, payload: value });
      }
    },
    [dispatch]
  );

  return (
    <div className="flex items-center gap-2 h-11 relative w-full">
      {/* <div className={classNames(styles.container, { [styles.open]: open })}> */}
      <div
        className="w-6 h-6 text-slate-400 absolute left-4 cursor-pointer"
        onClick={() => inputRef.current?.focus()}
      >
        {loading ? (
          <Loading
            size={18}
            borderSize={2}
            color={"#475569"}
            borderColor={"#e2e8f0"}
          />
        ) : (
          <SearchIcon />
        )}
      </div>
      <input
        className="min-w-[320px] w-full h-full py-0 pr-4 pl-[calc(1rem+36px)] outline-0"
        ref={inputRef}
        type={"text"}
        {...props}
        value={value}
        onChange={handleChange}
        placeholder="Search by name or extension ..."
      />
    </div>
  );
}

export default SearchInput;

import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "./../styles/FileList.module.scss";
import Skeleton from "./skeleton";
import { ReactComponent as EmptyState } from "./../assets/icons/empty-state.svg";
import { useAppDispatch, useAppSelector } from "../hooks";
// import { selectLoading as selectProfileLoading } from "../store/profileSlice";
import type { FileType } from "../types/file";
import { selectFiles, selectLoading } from "../store/filesSlice";
import { useSearch } from "../providers/SearchProvider";
import File2 from "./file2";

function FileList2() {
  const files = useAppSelector(selectFiles);
  const [filteredFiles, setSearchedFiles] = useState<FileType[]>([]);
  const filesLoading = useAppSelector(selectLoading);
  // const profileLoading = useAppSelector(selectProfileLoading);

  const dispatch = useAppDispatch();
  const { value: searchValue } = useSearch();
  useEffect(() => {
    const lookedUpFiles = files?.filter((file) =>
      file.Name?.includes(searchValue)
    );
    setSearchedFiles(lookedUpFiles);
  }, [dispatch, searchValue, files]);

  return (
    <>
      <>
        <div className={styles.fileList}>
          {!!files?.length && (
            <>
              <div className={classNames(styles.header, "col-name")}>Name</div>
              <div className={classNames(styles.header, "col-size")}>Size</div>
              {/* <div className={classNames(styles.header, "col-lastModified")}>
                Last Modified
              </div> */}
              <div className={classNames(styles.header, "col-action")}></div>
            </>
          )}

          {/*  */}
          {filesLoading && (
            <>
              {Array.from(Array(24).keys()).map((i) => (
                <div
                  key={`file-skeleton-${i}`}
                  className="flex gap-2 py-4 px-2 h-s"
                >
                  {(i + 1) % 3 === 1 && (
                    <>
                      <Skeleton className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]" />
                      <Skeleton className="w-[75px] h-[25px] md:w-[200px] md:h-[30px]" />
                    </>
                  )}
                  {(i + 1) % 3 === 2 && (
                    <>
                      <Skeleton className="w-[75px] h-[25px] md:w-[150px] md:h-[30px]" />
                    </>
                  )}
                  {/* {(i + 1) % 4 === 3 && (
                    <>
                      <Skeleton width={150} height={30} />
                    </>
                  )} */}
                  {(i + 1) % 3 === 0 && (
                    <>
                      <Skeleton className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]" />
                      <Skeleton className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]" />
                    </>
                  )}
                </div>
              ))}
            </>
          )}
          {!filesLoading &&
            filteredFiles?.map((file, i) => (
              <File2
                key={`file-${i}`}
                file={file}
                type={file.Type}
                name={file.Name}
                size={file.Size || 0}
              />
            ))}
        </div>
        {!files?.length && !filesLoading && (
          <div className={styles.empty}>
            <EmptyState />
            <p className="text-2xl text-slate-300 mt-4 font-medium">
              Drop files here
            </p>
            <p className="text-sm text-slate-300">
              Or use “Upload file” button.
            </p>
          </div>
        )}
      </>
    </>
  );
}

export default FileList2;

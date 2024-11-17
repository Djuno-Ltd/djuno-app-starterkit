import { useRef } from "react";
import styles from "./../styles/File.module.scss";
import { ReactComponent as Export } from "./../assets/icons/export.svg";
import { ReactComponent as CopyToClipboardIcon } from "./../assets/icons/copy.svg";
import IconButton from "./iconButton";
import classNames from "classnames";
// import FileIcon, { FileTypeType, extToType } from "./fileIcon";
import { humanizeSize } from "../utils/file";
import { FileType } from "../types/file";
import Highlighter from "react-highlight-words";
import { useSearch } from "../providers/SearchProvider";
// import { updateBreadCrumb } from "../store/breadCrumbSlice";
// import { fetchFiles } from "../store/filesSlice";
// import { dateConvertor } from "../utils/helper";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
// import { getExportApi } from "../api/exportApi";
// import { toast } from "react-hot-toast";
// import { PhotoModal } from "./modals/photoModal";

export type FileProps = {
  name: string;
  type: number;
  size: number;
  file: FileType;
};

function File2({ name, type, size, file }: FileProps) {
  const ref = useRef(null);
  const { value: searchValue } = useSearch();

  const handleCopyToClipboard = (file: FileType) => {
    if (file.Type !== 0) {
      return;
    } else
      navigator.clipboard.writeText(
        process.env.REACT_APP_IPFS_URL + "/ipfs/" + file.Hash || ""
      );
    toast.success("Copied");
  };

  return (
    <div
      className={classNames(styles.file)}
      ref={ref}
      // onDoubleClick={(e) => handleFile(file, e)}
    >
      <div className={classNames(styles.name, "col-name")}>
        {/* <FileIcon
          type={
            file.Type === 0
              ? "folder"
              : (extToType(
                  extension?.split(".")[0] ||
                    file.file_name.split(".")[1] ||
                    file.content_type?.split("/")[1] ||
                    ""
                ) as FileTypeType)
          }
        /> */}
        <p>
          <Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={[searchValue]}
            autoEscape={true}
            textToHighlight={name}
          />
        </p>
      </div>
      <div className={classNames(styles.size, "col-size")}>
        {size !== 0
          ? humanizeSize(Number(size), { fractionDigits: 2 }).join("B")
          : ""}
      </div>
      {/* <div className={classNames(styles.date, "col-lastModified")}>
        {dateConvertor(createdAt)}
      </div> */}
      <div className={classNames(styles.action, "col-action")}>
        <div className="flex gap-2">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleCopyToClipboard(file);
            }}
          >
            <CopyToClipboardIcon className="w-7 h-7" />
          </IconButton>

          <Link
            to={process.env.REACT_APP_IPFS_URL + "/ipfs/" + file.Hash || ""}
            target="_blank"
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Export className="w-6 h-6" />
            </IconButton>
          </Link>
        </div>
      </div>
      {/* {showPhoto && (
        <PhotoModal
          show={true}
          onClose={() => {
            setShowPhoto(false);
          }}
          file={file}
          setPhotoLoading={setPhotoLoading}
          photoLoading={PhotoLoading}
        />
      )} */}
    </div>
  );
}

export default File2;

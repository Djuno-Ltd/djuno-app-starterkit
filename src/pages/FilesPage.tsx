import { useCallback, useEffect, useRef } from "react";
import Button from "../components/button";
import { useAppDispatch } from "../hooks";
import { fetchFiles } from "../store/filesSlice";
import classNames from "classnames";
import globalStyles from "./../styles/global.module.scss";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { copyApi, uploadApi } from "../api/filesApi";
import FileList2 from "../components/fileList2";

export default function FilesPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  const upload = useCallback(
    async (file: File, url: string) => {
      const _t = toast.loading(`uploading file`);
      // const _url = UrlConvertor(url);
      const _url = url;
      try {
        const { data } = await uploadApi(file, _url);
        await copyApi(data.Hash, data.Name);
        toast.success(`upload completed`, {
          id: _t,
        });
        dispatch(fetchFiles());
      } catch (e) {
        toast.error(`Failed!`, {
          id: _t,
        });
      }
      try {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (e) {}
    },
    [dispatch]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      upload(acceptedFiles[0], "/");
    },
    [upload]
  );

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
  });

  const handleUploadFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        upload(files[0], "/");
      }
    },
    [upload]
  );

  const handleUploadClick = useCallback(() => {
    if (fileInputRef.current) fileInputRef.current.click();
  }, []);

  return (
    <>
      <input
        type="file"
        // accept="application/pdf"
        hidden={true}
        ref={fileInputRef}
        multiple={true}
        onChange={handleUploadFiles}
      />

      <div className="flex sticky py-6 px-8 top-0 bg-white transition-all duration-500">
        <div className="flex items-center justify-between w-full">
          <div className="text-slate-800 text-xl font-medium">Files</div>
          <div className="btns flex gap-2">
            <Button onClick={handleUploadClick}>Upload File</Button>
          </div>
        </div>
      </div>
      <div
        {...getRootProps({
          className: classNames(globalStyles.homeContent, {
            [globalStyles.dragActive]: isDragActive,
          }),
        })}
      >
        <input {...getInputProps()} />
        <FileList2 />
      </div>
    </>
  );
}

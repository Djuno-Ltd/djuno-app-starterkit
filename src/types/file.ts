export type FileType = {
  // Id: number;
  Name: string;
  Type: number;
  Size: number;
  Hash: string;
};

export type FilesStateType = {
  loading: boolean;
  // error: boolean;
  files: Array<FileType> | [];
  // selectedFile: FileType | null;
  // selectLoading: boolean;
};

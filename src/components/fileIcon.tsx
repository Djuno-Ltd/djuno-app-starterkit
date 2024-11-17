import { useMemo } from "react";
import { ReactComponent as DocumentIcon } from "./../assets/icons/document-text.svg";
import { ReactComponent as DefaultIcon } from "./../assets/icons/document.svg";
import { ReactComponent as PDFIcon } from "./../assets/icons/pdf.svg";

export type FileTypeType = 0 | 1;
export type FileIconProps = {
  type: FileTypeType;
};
const exts = {
  photo: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
  video: ["mp4", "webm", "mkv", "flv", "vob", "avi", "mov", "qt", "wmv", "ts"],
  sound: [
    "mp3",
    "3gp",
    "aa",
    "aac",
    "aax",
    "act",
    "aiff",
    "alac",
    "amr",
    "flac",
    "m4v",
    "ogg",
    "m4a",
  ],
  document: ["txt", "pdf", "md", "doc"],
};

export function extToType(ext: string | null) {
  if (!ext) return;
  const _ext = ext.toLowerCase();
  return Object.keys(exts).find((type) =>
    exts[type as keyof typeof exts].includes(_ext)
  );
}

function FileIcon({ type }: FileIconProps) {
  const renderIcon = useMemo(() => {
    switch (type) {
      case 0:
        return <PDFIcon />;
      case 1:
        return <DocumentIcon />;
      default:
        return <DefaultIcon />;
    }
  }, [type]);
  return renderIcon;
}

export default FileIcon;

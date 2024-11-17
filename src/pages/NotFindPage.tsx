import { Link } from "react-router-dom";
import { ReactComponent as LogoText } from "./../assets/icons/logo-text.svg";
import { ReactComponent as NotFindIcon } from "./../assets/icons/404.svg";
import { ReactComponent as SwissIcon } from "./../assets/icons/swiss.svg";

export default function ShowFilePage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center  md:gap-10">
        <div className="w-full sticky top-0 z-10 bg-white border-b-2 border-gray-200 flex items-center h-20 px-7 md:px-8 lg:px-14 justify-between">
          <Link to={"/"}>
            <LogoText className="w-[90px]" />
          </Link>
        </div>
        <div className="relative min-h-[85vh] w-full flex flex-col justify-start items-center">
          <div className="w-full h-full flex flex-col justify-start items-center bg-white mt-10">
            <NotFindIcon className="max-w-sm min-w-md" />
            <span className="text-slate-400 font-bold text-5xl mt-4">404</span>
            <span className="text-slate-500 font-normal text-lg mt-4">
              Sorry, the page you visited does not exist.
            </span>
          </div>
          <div className="w-full bg-white flex items-center h-20 px-7 md:px-8 lg:px-14 absolute bottom-0 z-20">
            <div className="text-base text-center w-full text-slate-400 flex gap-1 items-center justify-center">
              All rights Reserved. <SwissIcon className="w-3 h-3" />
              Swiss Made
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

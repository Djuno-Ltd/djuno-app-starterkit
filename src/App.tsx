import { Outlet, useMatch } from "react-router-dom";
import Container from "./components/container";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Button from "./components/button";
import useShow from "./hooks/useShow";
import { useLocation } from "react-router-dom";
import buttonStyle from "./styles/Button.module.scss";
import { Toaster } from "react-hot-toast";
// import * as pdfjs from "pdfjs-dist";
// import { pdfjs as pdfjs_react } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import classNames from "classnames";

import { Tooltip } from "react-tooltip";

function App() {
  const isMatchSignPage = useMatch("/sign/:token");
  const isMatchSettingPage = useMatch("/settings");
  const [showNav, { show, hide }] = useShow();
  const location = useLocation();
  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  // pdfjs.GlobalWorkerOptions.workerSrc =
  //   "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js";
  // new URL(
  //   "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.min.js",
  //   import.meta.url
  // ).toString();

  // pdfjs_react.GlobalWorkerOptions.workerSrc =
  //   "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

  // if(isMatchSignPage)return <></>
  return (
    <>
      {!isMatchSignPage && (
        <Sidebar active={segments[0] ?? ""} show={showNav} />
      )}
      <Container
        className={classNames({
          "lg:w-[calc(100%-260px)] w-full": !isMatchSignPage,
          "w-full": isMatchSignPage,
        })}
      >
        <Header
          onShowNav={show}
          onHideNav={hide}
          withoutSearch={!!isMatchSignPage || !!isMatchSettingPage}
          withLogo={!!isMatchSignPage || false}
        />
        <Outlet />
      </Container>
      <Toaster position="top-center" reverseOrder={false} />
      <Tooltip variant="info" id="primary-tooltip" />
      <Tooltip variant="dark" place="right" id="right-tooltip" />
      <Tooltip id="tooltip" />
      <div id="modal" />
    </>
  );
}

export default App;

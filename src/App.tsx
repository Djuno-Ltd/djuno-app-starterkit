import { Outlet, useMatch } from "react-router-dom";
import Container from "./components/container";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import useShow from "./hooks/useShow";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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

import ReactDOM from "react-dom/client";
import "@djuno/web3auth-ui/dist/style.css";
import "./index.css";
import "react-widgets/styles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import NotFindPage from "./pages/NotFindPage";
import SearchProvider from "./providers/SearchProvider";
import FilesPage from "./pages/FilesPage";
import { Web3authUiProvider } from "@djuno/web3auth-ui";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Web3authUiProvider
      clientConfigs={{ accessKey: process.env.REACT_APP_ACCESS_KEY || "" }}
    >
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="files" element={<FilesPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFindPage />} />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </Web3authUiProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

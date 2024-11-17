import ReactDOM from "react-dom/client";
import "./index.css";
import "react-widgets/styles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import AuthProvider from "./providers/AuthProvider";
import { SolanaWalletsProvider } from "./providers/SolanaWalletsProvider";
import { MetaMaskProvider } from "./providers/MetamaskProvider";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import NotFindPage from "./pages/NotFindPage";
// import * as pdfjs from "pdfjs-dist";
import { pdfjs as pdfjs_react } from "react-pdf";
import SearchProvider from "./providers/SearchProvider";
import FilesPage from "./pages/FilesPage";

// pdfjs.GlobalWorkerOptions.workerSrc =
//   "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js";
// new URL(
//   "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.min.js",
//   import.meta.url
// ).toString();

pdfjs_react.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <MetaMaskProvider>
      <SolanaWalletsProvider>
        <SearchProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <AuthProvider>
                    <App />
                  </AuthProvider>
                }
              >
                <Route index element={<HomePage />} />
                <Route path="files" element={<FilesPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<NotFindPage />} />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </SolanaWalletsProvider>
    </MetaMaskProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

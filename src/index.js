import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Toaster } from "react-hot-toast";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          iconTheme: {
            primary: "#6a5103",
            secondary: "#ffd308",
          },
        }}
      />
    </Provider>
);

reportWebVitals();

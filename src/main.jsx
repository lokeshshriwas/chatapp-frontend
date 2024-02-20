import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import ChatContextProvider from "./Context/Chatprovider.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChatContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ChatContextProvider>
  </BrowserRouter>
);

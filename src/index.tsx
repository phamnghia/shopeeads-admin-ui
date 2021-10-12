import ReactDOM from "react-dom";
import "./assets/style.scss";
import "rsuite/dist/rsuite.min.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { AppContextProvider } from "./context/app";

ReactDOM.render(
  <ChakraProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </ChakraProvider>,
  document.getElementById("root")
);

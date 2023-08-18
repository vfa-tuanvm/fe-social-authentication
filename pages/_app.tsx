import "@/styles/globals.css";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import theme from "../src/theme";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className={roboto.className}>
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </Provider>
      <Toaster />
    </ApolloProvider>
  );
}

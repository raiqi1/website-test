import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "../utils/Store";
import { Providers } from "./provider";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Providers>
      <SessionProvider session={session}>
        <StoreProvider>
          <div className="dark:bg-medium dark:text-white">
            <Component {...pageProps} />
          </div>
        </StoreProvider>
      </SessionProvider>
    </Providers>
  );
}

export default MyApp;

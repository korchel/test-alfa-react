import { FC, PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

import { Header } from "./Header";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
        <div id='modal'></div>
        <Toaster />
      </main>
    </>
  );
};

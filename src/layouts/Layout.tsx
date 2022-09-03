import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";

type LayoutProps = {
  title?: string;
};

export const Layout: React.FunctionComponent<LayoutProps> = ({
  title = "かんたん沼計算機",
  children,
}) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="w-full max-w-lg mx-auto mt-4 mb-8 px-4">{children}</main>
      <Footer />
    </>
  );
};

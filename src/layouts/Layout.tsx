import React from "react";
import { Helmet } from "react-helmet";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import Footer from "../components/Footer";

config.autoAddCss = false;

export type LayoutProps = {
  title?: string;
  children?: React.ReactElement;
};

export function Layout({ title = "かんたん沼計算機", children }: LayoutProps) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <main className="w-full max-w-lg mx-auto mt-4 mb-8 px-4">{children}</main>
      <Footer />
      {/* アイコンの巨大化対策 */}
      {/* cf. https://fontawesome.com/v5/docs/web/other-topics/server-side-rendering#css */}
      <style>{dom.css()}</style>
    </>
  );
}

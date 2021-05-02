import React from "react";
import { Link } from "gatsby";
import { Layout } from "../layouts/Layout";

export default function NotFound() {
  return (
    <Layout>
      <h1>ページが見つかりませんでした</h1>
      <Link to="/">トップに戻る</Link>
    </Layout>
  );
}

const React = require("react");

export const onRenderBody = ({ setHeadComponents }) => {
  // 全ページ共通
  setHeadComponents([
    <script
      key="hatena"
      src="https://b.st-hatena.com/js/bookmark_button.js"
      charSet="utf-8"
      async
    />,
    <meta
      property="og:description"
      content="目標摂取カロリーとPFCバランスから、沼のレシピを計算します。"
    />,
    <meta property="og:image" content="/numa_card_square.png" />,
    <meta name="twitter:card" content="summary" />,
    <meta name="twitter:site" content={"@uhey22e"} />,
  ]);
};

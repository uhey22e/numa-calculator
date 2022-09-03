const React = require("react");

export const onRenderBody = ({ setHeadComponents }) => {
  // 全ページ共通
  setHeadComponents([
    // はてブ
    <script
      key="hatena"
      src="https://b.st-hatena.com/js/bookmark_button.js"
      charSet="utf-8"
      async
    />,
    // OGP
    <meta
      property="og:description"
      content="目標摂取カロリーとPFCバランスから、沼のレシピを計算します。"
    />,
    <meta
      property="og:image"
      content="https://numa-calculator.uhey22e.com/numa_card_square.png"
    />,
    // Twitter OGP
    <meta name="twitter:card" content="summary" />,
    <meta name="twitter:site" content={"@uhey22e"} />,
    // Google Adsesnse
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_ADSENSE_PUBLISHER_ID}`}
      crossorigin="anonymous"
    ></script>,
  ]);
};

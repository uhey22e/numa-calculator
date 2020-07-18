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
  ]);
};

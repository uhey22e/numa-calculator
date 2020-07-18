const React = require("react");

export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    <script
      key="hatena"
      src="https://b.st-hatena.com/js/bookmark_button.js"
      charSet="utf-8"
      async
    />,
  ]);
  setPreBodyComponents([
    <React.Fragment key="fb">
      <div id="fb-root"></div>
      <script
        async
        defer
        crossorigin="anonymous"
        src="https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v7.0&appId=390341601927113&autoLogAppEvents=1"
        nonce="cNG2AnJn"
      ></script>
    </React.Fragment>,
  ]);
};

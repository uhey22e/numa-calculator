import React from "react";

export default function ShareButtons() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-4">
      {/* Twitter */}
      <div>
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          className="twitter-share-button"
          data-text="かんたん沼計算機"
          data-url="https://numa-calculator.uhey22e.com/"
          data-hashtags="かんたん沼計算機 #マッスルグリル"
          data-lang="ja"
          data-show-count="false"
        >
          ツイート
        </a>
      </div>

      {/* はてな */}
      <div>
        <a
          href="https://b.hatena.ne.jp/entry/s/numa-calculator.uhey22e.com/"
          className="hatena-bookmark-button"
          data-hatena-bookmark-layout="basic-label-counter"
          data-hatena-bookmark-lang="ja"
          title="このエントリーをはてなブックマークに追加"
        >
          <img
            src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
            alt="このエントリーをはてなブックマークに追加"
            width="20"
            height="20"
            style={{ border: "none" }}
          />
        </a>
      </div>
    </div>
  );
}

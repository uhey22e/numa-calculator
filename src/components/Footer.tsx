import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitterSquare,
  faGithubSquare,
} from "@fortawesome/free-brands-svg-icons";

type Props = {};

type MenuItem = {
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  {
    label: "トップページ",
    href: "/",
  },
  {
    label: "このアプリについて",
    href: "/about",
  },
  {
    label: "レシピの計算方法について",
    href: "/calc-procedure",
  },
];

export default function Footer(props: Props) {
  const menuItemElms = menuItems.map((v) => {
    return (
      <li key={`pagelink_${v.href}`}>
        <Link to={v.href}>{v.label}</Link>
      </li>
    );
  });

  const snsLinks = [
    {
      icon: faTwitterSquare,
      href: "//twitter.com/uhey22e",
    },
    {
      icon: faGithubSquare,
      href: "//github.com/uhey22e/numa-calcurator",
    },
  ];

  const snsLinkElms = snsLinks.map((v) => {
    return (
      <div key={`snslink_${v.href}`}>
        <a href={v.href}>
          <FontAwesomeIcon icon={v.icon} color="#505050" size="3x" />
        </a>
      </div>
    );
  });

  return (
    <div className=" py-4 flex flex-col justify-center gap-4">
      <div>
        <ul>{menuItemElms}</ul>
      </div>
      <div>{snsLinkElms}</div>
      <div>
        <div>
          <a rel="license" href="//creativecommons.org/licenses/by/4.0/">
            <img
              alt="Creative Commons License"
              style={{
                borderWidth: 0,
                margin: 0,
              }}
              src="//i.creativecommons.org/l/by/4.0/88x31.png"
            />
          </a>
        </div>
        <div>
          <span>This work is licensed under a </span>
          <a rel="license" href="//creativecommons.org/licenses/by/4.0/">
            Creative Commons Attribution 4.0 International License
          </a>
        </div>
      </div>
      <div>
        <span>Copyright &copy; {new Date().getFullYear()} </span>
        <a href="//twitter.com/uhey22e">uhey22e</a>
      </div>
    </div>
  );
}

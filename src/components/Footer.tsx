import React from "react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitterSquare,
  faGithubSquare,
} from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames";

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

const snsLinks = [
  {
    key: "link-twitter",
    icon: faTwitterSquare,
    href: "//twitter.com/uhey22e",
  },
  {
    key: "link-github",
    icon: faGithubSquare,
    href: "//github.com/uhey22e/numa-calcurator",
  },
];

export default function Footer(props: {}) {
  return (
    <div
      className={classNames(
        "w-full py-4 flex flex-col items-center gap-3",
        "bg-slate-100 text-gray-500",
        "text-center text-sm",
        "[&_a]:text-inherit [&_a]:underline"
      )}
    >
      <ul className=" flex flex-col gap-1">
        {menuItems.map(({ label, href }) => (
          <li key={`pagelink-${href}`}>
            <Link to={href}>{label}</Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-row gap-2">
        {snsLinks.map((v) => (
          <div key={v.key}>
            <a href={v.href}>
              <FontAwesomeIcon icon={v.icon} color="#505050" size="3x" />
            </a>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <a
          className="block"
          rel="license"
          href="//creativecommons.org/licenses/by/4.0/"
        >
          <img
            alt="Creative Commons License"
            src="//i.creativecommons.org/l/by/4.0/88x31.png"
            width={88}
            height={31}
          />
        </a>
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

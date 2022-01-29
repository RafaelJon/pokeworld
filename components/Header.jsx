import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { css, cx } from "@emotion/css";
import Image from "next/image";
import resolutions from "../variables/Constants";

const headerBg = css({
  position: "fixed",
  top: 0,
  width: "100%",
  transition: ".3s ease-in-out",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  padding: "10px",
});

const scrolledBg = css({
  height: "60px",
  backdropFilter: "blur(5px)",
  backgroundColor: "#ffffffcc",
  boxShadow: "0px 2px 20px grey",
  transition: ".3s ease-in-out",
});

const nav = css({
  position: "relative",
  padding: "0 10px",
  display: "none",
  [resolutions.sm]: {
    display: "block",
  },
});

const logo = css({
  position: "relative",
  height: "100%",
  width: "60%",
  [resolutions.sm]: {
    width: "20%",
  },
});

export default function Header() {
  const [isScrolled, setisScrolled] = useState(false);
  const headerRef = useRef();

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setisScrolled(window.scrollY > 50);
    });
  }, []);

  return (
    <div ref={headerRef} className={cx(headerBg, { [scrolledBg]: isScrolled })}>
      <Link href={"/"}>
        <a className={nav}>Discover</a>
      </Link>
      <div className={logo}>
        <Image
          src="/PokeWorld.svg"
          layout="fill"
          objectFit="contain"
          alt="logo"
        />
      </div>
      <Link href={"/collection"}>
        <a className={nav}>Collection</a>
      </Link>
    </div>
  );
}

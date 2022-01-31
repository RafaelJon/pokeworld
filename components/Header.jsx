import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { css, cx } from "@emotion/css";
import Image from "next/image";
import { resolutions } from "../utils/Constants";

const headerBg = css({
  position: 'fixed',
  zIndex: '100',
  top: 0,
  width: '100%',
  transition: '.3s ease-in-out',
  height: '5em',
  padding: '1.25em 1em',
  '& > div': {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    maxWidth: '1240px',
  }
});

const scrolledBg = css({
  height: '4em',
  padding: '0.75em 1em',
  backdropFilter: 'blur(5px)',
  backgroundColor: '#ffffffbb',
  boxShadow: '0 0.125em 2em grey',
});

const nav = css({
  color: 'white',
  background: '#1c92d2',
  position: 'relative',
  padding: '0.2em 0.75em',
  marginLeft: '1em',
  border: 'solid 0.25em #1c92d2',
  borderRadius: '0.7em',
  fontWeight: 'bold',
  display: 'none',
  // right: '0',
  transition: '.3s ease-in-out',
  [resolutions.md]: {
    display: 'block',
  },
  '&:hover': {
    background: '#0082c8',
    border: 'solid 0.25em #0082c8',

  },
  '&:active': {
    background: '#283c86',
    border: 'solid 0.25em #1c92d2'
  }
});

const logo = css({
  position: 'relative',
  height: '100%',
  width: '100%',
  maxWidth: '145px',
  margin: 'auto',
  '& img': {
    objectPosition: 'center',
  },
  [resolutions.md]: {
    marginLeft: '0',
  },
});

export default function Header() {
  const [isScrolled, setisScrolled] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setisScrolled(window.scrollY > 50);
    });
  }, []);

  return (
    <div className={cx(headerBg, { [scrolledBg]: isScrolled })}>
      <div>
        <Link href={"/"}>
          <a className={logo}>
            <Image
              src="/PokeWorld.svg"
              layout="fill"
              objectFit="contain"
              alt="logo"
              priority={true}
            />
          </a>
        </Link>
        <Link href={"/"}>
          <a className={nav}>DISCOVER</a>
        </Link>
        <Link href={"/collection"}>
          <a className={nav}>COLLECTION</a>
        </Link>
      </div>
    </div>
  );
}

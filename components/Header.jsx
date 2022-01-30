import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { css, cx } from "@emotion/css";
import Image from "next/image";
import resolutions from "../variables/Constants";

const headerBg = css({
  position: 'fixed',
  zIndex: '100',
  top: 0,
  width: '100%',
  transition: '.3s ease-in-out',
  height: '5em',
  padding: '0.5em',
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
  backdropFilter: 'blur(5px)',
  backgroundColor: '#ffffffcc',
  boxShadow: '0 0.125em 2em grey',
});

const nav = css({
  position: 'relative',
  padding: '0.35em 1em',
  margin: '0 1em',
  border: 'solid 1px black',
  borderRadius: '9999px',
  fontWeight: 'bold',
  display: 'none',
  right: '0',
  transition: '.3s ease-in-out',
  [resolutions.sm]: {
    display: 'block',
  },
  '&:hover':{
    backgroundColor: 'lightgray'
  }
});

const logo = css({
  position: 'relative',
  height: '100%',
  width: '40%',
  margin: 'auto',
  [resolutions.sm]: {
    width: '15%',
    marginLeft: '0',
  },
  [resolutions.lg]: {
    width: '10%',
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
        <div className={logo}>
          <Image
            src="/PokeWorld.svg"
            layout="fill"
            objectFit="contain"
            alt="logo"
          />
        </div>
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

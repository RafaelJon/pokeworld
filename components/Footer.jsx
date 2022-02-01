import React from "react";
import { css } from "@emotion/css";
import { FiCompass } from "react-icons/fi";
import { MdCatchingPokemon } from "react-icons/md";
import Link from "next/link";
import { resolutions } from "../utils/Constants";

const footer = css({
  position: "sticky",
  bottom: 0,
  height: '5em',
  width: "100%",
  display: "flex",
  padding: "10px",
  backgroundColor: "white",
  borderTop: "solid 1px lightgray",
  justifyContent: "space-around",
  [resolutions.md]: {
    display: "none",
  },
});

const nav = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export default function Footer() {
  return (
    <div className={footer}>
      <Link href={"/"}>
        <a className={nav}>
          <FiCompass size={"1.75em"} color="#396bba" />
          Discover
        </a>
      </Link>
      <Link href={"/collection"}>
        <a className={nav}>
          <MdCatchingPokemon size={"1.75em"} color="#ee1515" />
          Collection
        </a>
      </Link>
    </div>
  );
}

import { css } from '@emotion/css';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { resolutions } from '../utils/Constants';

const Main = styled.div({
  width: '100%',
  backgroundImage: 'linear-gradient(to bottom, #ACB6E5, #74ebd5, #ffffff 90%)',
  padding: '6em 0.5em 2em 0.5em',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '& div': {
    position: 'relative',
    zIndex: '0',
    width: '100%',
    paddingTop: '50%',
    [resolutions.sm]: {
      width: '85%',
      paddingTop: '30%',
    }
  },
  '& h1': {
    marginBottom: '0',
    textAlign: 'center'
  },
  '& p': {
    margin: '0',
    textAlign: 'center'
  }
})

const nav = css({
  color: 'white',
  background: '#1c92d2',
  position: 'relative',
  margin: '1em',
  padding: '0.2em 0.75em',
  marginLeft: '1em',
  border: 'solid 0.25em #1c92d2',
  borderRadius: '0.7em',
  fontWeight: 'bold',
  transition: '.3s ease-in-out',
  '&:hover': {
    background: '#0082c8',
    border: 'solid 0.25em #0082c8',

  },
  '&:active': {
    background: '#283c86',
    border: 'solid 0.25em #283c86'
  }
});

export default function Custom404() {
  return <div className={css({
    display: 'flex',
    minHeight: 'calc(100vh - 5em)',
    [resolutions.md]: {
      minHeight: 'calc(100vh)',
    }
  })}>
    <Main>
      <div>
        <Image
          src='/404.png'
          layout='fill'
          objectFit='contain'
          alt='logo'
          priority={true}
        />
      </div>
      <h1>Looks like you got lost in the tall grass!</h1>
      <p>
        Let&apos;s go back before wild pokémons attack!
      </p>
      <Link href={"/"}>
        <a className={nav}><p>Go back</p></a>
      </Link>
    </Main>
  </div>;
}

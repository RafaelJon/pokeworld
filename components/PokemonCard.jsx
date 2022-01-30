import Image from 'next/image';
import React, { useState } from 'react';
import { css, cx } from "@emotion/css"
import styled from '@emotion/styled'
import resolutions from '../variables/Constants';
import Link from 'next/link';

const image = css({
  position: 'relative',
  width: '75%',
  paddingTop: '75%',
  margin: '-30% auto 0 auto',
  [resolutions.xs]: {
    marginTop: '-40%',
  }
})

const rounded = css({
  overflow: 'hidden',
  borderRadius: '9999px',
})

const Card = styled.div({
  width: '100%',
  marginTop: '40%',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0px 0.35em 0.5em 0.125em lightgray',
  display: 'flex',
  flexDirection: 'column',
  transition: ".3s ease-in-out",
  '& > span': {
    position: 'static',
    margin: '1em auto',
    padding: '1.25em 1em 0 1em',
    transform: 'translateY(-20%)',
    textAlign: 'center'
  },
  '&: hover': {
    transform: 'scale(1.05)',
    cursor: 'pointer',
  },
  [resolutions.md]: {
    '&: hover': {
      transform: 'scale(1.1)',
    },
  }
})

export default function PokemonCard({ picture = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png', name = 'ASD' }) {
  const [pokemonImage, setpokemonImage] = useState(picture);
  const [isLoading, setisLoading] = useState(true);

  const toBase64 = (str) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#ccc" offset="20%" />
          <stop stop-color="#bbb" offset="50%" />
          <stop stop-color="#ccc" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#ccc" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `

  return <Link href={{
    pathname: '/pokemon/[name]',
    query: { name: name },
  }}>
    <a>

      <Card>
        <div className={cx(image, { [rounded]: isLoading })}>
          <Image
            src={pokemonImage}
            layout='fill'
            objectFit='contain'
            alt={name + '\'s image'}
            placeholder='blur'
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            onError={() => {
              setpokemonImage('/pokeball.svg')
            }}
            onLoadingComplete={() => {
              setisLoading(false)
            }}
          />
        </div>
        <span>
          {name}
        </span>
      </Card>
    </a>
  </Link>
}

import Image from 'next/image';
import React, { useState } from 'react';
import { css, cx } from "@emotion/css"
import styled from '@emotion/styled';
import Link from 'next/link';
import { resolutions, shimmer, toBase64 } from '../utils/Constants';

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

export default function PokemonCard({ picture = '/pokeball.svg', name = 'UNKNOWN', id = 0 }) {
  const [pokemonImage, setpokemonImage] = useState(picture);
  const [isLoading, setisLoading] = useState(true);

  return <Link href={{
    pathname: '/pokemon/[id]',
    query: { id: id },
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

import Image from 'next/image';
import React, { useState } from 'react';
import { cx } from "@emotion/css"
import styled from '@emotion/styled';
import Link from 'next/link';
import { resolutions, shimmer, toBase64 } from '../utils/Constants';
import { image } from '../styles/Card';
import { circle } from '../styles/Component';

const Card = styled.div({
  width: '100%',
  marginTop: '40%',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0px 0.125em 0.5em 0.125em lightgray',
  display: 'flex',
  flexDirection: 'column',
  transition: ".3s ease-in-out",
  '& > em': {
    wordBreak: 'break-all',
    position: 'static',
    margin: '0.5em auto 1em auto',
    padding: '0 1em',
    transform: 'translateY(-20%)',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '1'
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
        <div className={cx(image, { [circle]: isLoading },)}>
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
            onLoadingComplete={({ naturalHeight, naturalWidth }) => {
              if (naturalHeight === 0 || naturalWidth === 0) {
                setpokemonImage('/pokeball.svg')
              }
              setisLoading(false)
            }}
          />
        </div>
        <em>
          {name}
        </em>
      </Card>
    </a>
  </Link>
}

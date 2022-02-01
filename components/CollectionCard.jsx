import Image from 'next/image';
import React, { useState } from 'react';
import { css, cx } from "@emotion/css"
import styled from '@emotion/styled';
import { resolutions, shimmer, toBase64 } from '../utils/Constants';

const image = css({
  position: 'relative',
  width: '90%',
  paddingTop: '90%',
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
  boxShadow: '0px 0.125em 0.5em 0.125em lightgray',
  display: 'flex',
  flexDirection: 'column',
  transition: ".3s ease-in-out",
  '& > h3': {
    wordBreak: 'break-all',
    position: 'static',
    textAlign: 'center',
    margin: '0.5em 0.25em 0 0.25em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '1'
  },
  '& > em': {
    wordBreak: 'break-all',
    position: 'static',
    margin: '0.25em 0.25em 0 0.25em',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '1'
  },
})

const Button = styled.button({
  padding: '0.25em 0.5em',
  borderRadius: '5px',
  fontSize: '1em',
  transition: '.3s ease-in-out',
  userSelect: 'none',
  margin: '0.5em 1em',
  color: 'white',
  backgroundColor: '#ee1515',
  border: 'solid 0.125em #ee1515',
  '&:hover': {
    cursor: 'pointer',
  },
})


export default function CollectionCard({ picture = '/pokeball.svg', name = 'UNKNOWN', nickname = 'UNKNOWN', release }) {
  const [pokemonImage, setpokemonImage] = useState(picture);
  const [isLoading, setisLoading] = useState(true);

  return <Card>
    <div className={cx(image, { [rounded]: isLoading }, )}>
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
    <h3>
      {nickname}
    </h3>
    <em>
      {name}
    </em>
    <Button onClick={release}>
      release
    </Button>
  </Card>
}

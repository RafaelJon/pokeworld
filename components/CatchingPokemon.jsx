import React, { useEffect, useState } from 'react';
import { css, cx, keyframes } from '@emotion/css'
import styled from '@emotion/styled';
import Image from 'next/image';
import { resolutions } from '../utils/Constants';

const fallIn = keyframes`
  from {
    transform: translate3d(0,-100vh,0);
  }

  to{
    transform: translate3d(0,0,0);
  }
`

const flyUp = keyframes`
  from {
    transform: translate3d(0,0,0);
  }

  to{    
    transform: translate3d(0,-100vh,0);
  }
`

const roll = keyframes`
  from, 50%, to{
    transform: translate3d(0, 0, 0) rotate(0deg);
  }

  25% {
    transform: translate3d(-40px, 0,0) rotate(-40deg);
  }

  75% {
    transform: translate3d(40px, 0,0) rotate(40deg);
  }
`
const Screen = styled.div(({ animation }) => ({
  position: 'fixed',
  zIndex: 1000,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100vw',
  padding: '0.2em',
  background: 'rgba(0,0,0,0.75)',
  transform: 'translate3d(0, -100vh, 0)',
  animation: `${animation} .5s ease-in-out forwards`
}))

const show = css({
  transform: 'translate3d(0, 0, 0)',
})

const pokeball = css({
  position: 'relative',
  margin: 'auto',
  width: '80%',
  paddingTop: '70vh',
  display: 'flex',
  flexDirection: 'column',
  [resolutions.sm]: {
    width: '100%',
  },
  '& > span': {
    margin: 'auto !important',
    maxWidth: '400px',
  }
})

const catching = css({
  '& > span': {
    animation: `${roll} 1.5s 0.5s ease-in-out infinite`,
  },
})

const status = css({
  position: 'absolute',
  width: '100%',
  height: '30vh',
  color: 'white',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

const Button = styled.button({
  padding: '0.25em 1em',
  borderRadius: '9999px',
  fontSize: '1em',
  letterSpacing: '2px',
  transition: '.3s ease-in-out',
  userSelect: 'none',
  margin: '0.25em',
  '&:hover': {
    cursor: 'pointer',
  },
})

const primaryButton = css({
  color: 'white',
  backgroundColor: '#5691c8',
  border: 'solid 0.125em #5691c8',
  '&:active': {
    background: '#01baef',
  }
})

const secondaryButton = css({
  color: 'white',
  backgroundColor: 'gray',
  border: 'solid 0.125em gray',
})

const input = css({
  padding: '0.25em 1em',
  borderRadius: '9999px',
  fontSize: '1em',
  border: 'solid 0.125em #5691c8',
  width: '100%'
})

export default function CatchingPokemon({ pokemonImage, closeCatching, caughtPokemon }) {
  const [isShown, setisShown] = useState(true);
  const [nickname, setnickname] = useState('');
  const [image, setimage] = useState('/pokeball_colored.svg');
  const [statusMessage, setstatusMessage] = useState('catching...');
  const [isCaught, setisCaught] = useState(undefined);

  const catchPokemon = () => {
    setnickname('')
    setstatusMessage('catching...')
    setimage('/pokeball_colored.svg')
    setisCaught(undefined)
    setTimeout(() => {
      let caught = Math.random() < 0.5
      if (!caught) {
        setimage(pokemonImage)
        setstatusMessage('The pokemon broke free... :(')
      } else {
        setstatusMessage('The pokemon has been caught, give a nickname.')
      }
      setisCaught(caught)
    }, 5000);
  }

  const close = () => {
    setisShown(false)
    setTimeout(() => {
      closeCatching()
    }, 500);
  }

  const caught = () => {
    setisShown(false)
    setTimeout(() => {
      closeCatching()
      caughtPokemon(nickname)
    }, 500);
  }

  useEffect(() => {
    catchPokemon()
  }, []);

  const tryAgain = () => {
    return <div>
      <Button className={secondaryButton} onClick={close}>COMEBACK LATER</Button>
      <Button className={primaryButton} onClick={catchPokemon}>TRY AGAIN</Button>
    </div>
  }

  const inputNickName = () => {
    return <div>
      <input
        className={input}
        placeholder='nickname'
        onChange={(e) => {
          setnickname(e.target.value)
        }}
        value={nickname}
      />
      <Button className={primaryButton} onClick={caught}>SUBMIT</Button>
    </div>
  }

  return <Screen animation={isShown ? fallIn : flyUp}>
    <div className={cx(pokeball, { [catching]: isCaught === undefined })}>
      <Image
        src={image}
        layout='fill'
        objectFit='contain'
        alt='pokeball'
        onError={() => {
          setimage('/pokeball.svg')
        }}
      />
      <div className={status}>
        <h3>
          {statusMessage}
        </h3>
        {
          isCaught === undefined ? <></> :
            isCaught ? inputNickName() :
              tryAgain()
        }
      </div>
    </div>
  </Screen>;
}
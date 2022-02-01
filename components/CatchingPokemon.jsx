import React, { useContext, useEffect, useState } from 'react';
import { css, cx, keyframes } from '@emotion/css'
import styled from '@emotion/styled';
import Image from 'next/image';
import { resolutions } from '../utils/Constants';
import { CollectionContext } from '../pages/_app';

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
  height: '100%',
  padding: '0.2em',
  background: 'rgba(0,0,0,0.75)',
  transform: 'translate3d(0, -100vh, 0)',
  animation: `${animation} .5s ease-in-out forwards`
}))

const caughtPokeball = css({
  filter: 'brightness(60%)'
})

const pokeball = css({
  position: 'relative',
  margin: 'auto',
  bottom: 0,
  width: '80%',
  height: '60%',
  paddingTop: '50vh',
  display: 'flex',
  flexDirection: 'column',
  transition: '.5s ease-in-out',
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
  position: 'relative',
  padding: '0.5em',
  left: 0,
  right: 0,
  top: 0,
  width: '100%',
  height: '20%',
  color: 'white',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transition: '.5s ease-in-out',
})

const Button = styled.button({
  padding: '0.5em 1em',
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
  color: '#5691c8',
  backgroundColor: 'white',
  border: 'solid 0.125em white',
})

const input = css({
  margin: '0.5em',
  padding: '0.25em 1em',
  borderRadius: '9999px',
  fontSize: '1em',
  border: 'solid 0.125em #5691c8',
  width: '100%'
})

export default function CatchingPokemon({ pokemonImage, closeCatching, caughtPokemon }) {
  const collectionContext = useContext(CollectionContext);

  const [isShown, setisShown] = useState(true);
  const [nickname, setnickname] = useState('');
  const [image, setimage] = useState('/pokeball_colored.svg');
  const [statusMessage, setstatusMessage] = useState('catching...');
  const [error, seterror] = useState('');
  const [isCaught, setisCaught] = useState(undefined);

  const catchPokemon = () => {
    setnickname('')
    seterror('')
    setstatusMessage('catching...')
    setimage('/pokeball_colored.svg')
    setisCaught(undefined)
    setTimeout(() => {
      let caught = Math.random() < 0.5
      if (!caught) {
        setimage(pokemonImage)
        setstatusMessage('The pokémon broke free... :(')
      } else {
        setstatusMessage('The pokémon has been caught, give a nickname.')
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
    if (nickname === '') {
      seterror('nickname can\'t be empty!')
    } else if (collectionContext.collection.map((c) => c.nickname).indexOf(nickname) > -1) {
      seterror('nickname has already been taken!')
    } else {
      setisShown(false)
      setTimeout(() => {
        closeCatching()
        caughtPokemon(nickname)
      }, 500);
    }
  }

  useEffect(() => {
    catchPokemon()
  }, []);

  const tryAgain = () => {
    return <div className={css({
      display: 'flex',
      flexDirection: 'row-reverse',
      flexWrap: 'wrap',
      justifyContent: 'center'
    })}>
      <Button className={primaryButton} onClick={catchPokemon}>TRY AGAIN</Button>
      <Button className={secondaryButton} onClick={close}>COMEBACK LATER</Button>
    </div>
  }

  const inputNickName = () => {
    return <div className={css({
      display: 'flex',
      flexDirection: 'row-reverse',
      flexWrap: 'wrap',
      justifyContent: 'center',
      maxWidth: '480px',
    })}>
      <input
        className={input}
        placeholder='nickname'
        onChange={(e) => {
          setnickname(e.target.value)
        }}
        value={nickname}
        autoFocus
      />
      {
        error !== '' &&
        <p className={css({
          width: '100%',
          color: '#ff4444',
          margin: '0 auto'
        })}>
          {error}
        </p>
      }
      <Button className={primaryButton} onClick={caught}>SUBMIT</Button>
      <Button className={secondaryButton} onClick={close}>RELEASE</Button>
    </div>
  }

  return <Screen animation={isShown ? fallIn : flyUp}>
    <div className={status}>
      <h3>
        {statusMessage}
      </h3>
    </div>
    <div className={cx(pokeball, { [catching]: isCaught === undefined }, { [caughtPokeball]: isCaught })}>
      <Image
        src={image}
        layout='fill'
        objectFit='contain'
        alt='pokeball'
        onError={() => {
          setimage('/pokeball.svg')
        }}
      />
    </div>
    <div className={status}>
      {
        isCaught === undefined ? <></> :
          isCaught ? inputNickName() :
            tryAgain()
      }
    </div>
  </Screen>;
}

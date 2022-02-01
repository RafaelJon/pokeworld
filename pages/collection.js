import { css } from "@emotion/css";
import styled from "@emotion/styled";
import Image from "next/image";
import { useContext } from "react";
import CollectionCard from "../components/CollectionCard";
import { resolutions } from "../utils/Constants";
import { CollectionContext } from "./_app";

const Main = styled.div({
  backgroundImage: 'linear-gradient(to bottom, #ACB6E5, #74ebd5, #ffffff 90%)',
  padding: '6em 0.5em 2em 0.5em',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& div': {
    position: 'relative',
    zIndex: '0',
    width: '100%',
    paddingTop: '30%',
    [resolutions.sm]: {
      width: '65%',
      paddingTop: '20%',
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

const content = css({
  width: '100%',
  maxWidth: '1240px',
  margin: 'auto',
  padding: '0 1em 2em 1em',
  [resolutions.sm]: {
    padding: '0 2em 2em 2em',
  }
})

const list = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '1em',
  [resolutions.xs]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5em 1em',
  },
  [resolutions.sm]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [resolutions.md]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2em 1em',
  },
  [resolutions.lg]: {
    gridTemplateColumns: 'repeat(6, 1fr)',
  }
})

export default function Collection() {
  const collectionContext = useContext(CollectionContext);
  const d = new Date()

  const release = (idx) => {
    collectionContext.collectionDispatch({ type: 'release', idx: idx })
  }

  return <div className={css({
    minHeight: 'calc(100vh - 5em)',
    [resolutions.md]: {
      minHeight: 'calc(100vh)',
    }
  })}>
    <Main>
      <div>
        <Image
          src='/PokeWorld.svg'
          layout='fill'
          objectFit='contain'
          alt='logo'
          priority={true}
        />
      </div>
      <h1>Welcome back from your adventure!</h1>
      <p>
        Ready to see your pokémons? check&apos;em all here
      </p>
    </Main>
    <div>
      {
        collectionContext.collection.length === 0 ?
          (<h3 className={css({
            padding: '1em',
            textAlign: 'center'
          })}>
            You haven&apos;t caught a single pokémon yet.
          </h3>) :
          (
            <div className={content}>
              <div className={list}>
                {
                  collectionContext.collection.map((p, index) => (
                    <CollectionCard {...p} release={() => { release(index) }} key={'pokemon' + index + d.getTime()} />
                  ))
                }
              </div>
            </div>
          )
      }
    </div>
  </div>;
}

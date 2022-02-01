import { css } from "@emotion/css";
import Image from "next/image";
import { useContext } from "react";
import CollectionCard from "../components/CollectionCard";
import { content, list, Main } from "../styles/Component";
import { resolutions } from "../utils/Constants";
import { CollectionContext } from "./_app";

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

import { gql } from "@apollo/client";
import { css } from "@emotion/css";
import Image from "next/image";
import { useContext, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonCard from "../components/PokemonCard";
import { resolutions } from "../utils/Constants";
import client from "../utils/Apollo";
import { CollectionContext } from "./_app";
import { content, list, Main } from "../styles/Component";

const Home = ({ count, pokemonDatas }) => {
  const collectionContext = useContext(CollectionContext);
  const [pokemons, setPokemons] = useState(pokemonDatas);
  const [hasMore, setHasMore] = useState(true);

  const getMorePokemon = async () => {
    try {
      const res = await fetch(window.location.origin + '/api/pokemons/' + pokemons.length)
      const data = await res.json()
      setHasMore(pokemons.length + data.pokemons.results.length < data.pokemons.count)
      setPokemons((pokemons) => ([...pokemons, ...data.pokemons.results]))
    } catch (error) {
      setHasMore(false)
    }
  }

  return (
    <InfiniteScroll
      dataLength={pokemons.length}
      next={getMorePokemon}
      hasMore={hasMore}
      className={css({
        minHeight: 'calc(100vh - 5em)',
        [resolutions.md]: {
          minHeight: 'calc(100vh)',
        }
      })}
    >
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
        <h1>Welcome to PokéWorld</h1>
        <p>
          Ready to become a pokémon master? Try to catch&apos;em all
        </p>
      </Main>
      <div className={content}>
        <div>
          <p>
            Owned: {collectionContext.collection.length} / {count}
          </p>
        </div>
        <div className={list}>
          {
            pokemons.map((p, index) => (
              <PokemonCard picture={p.image} name={p.name} id={index + 1} key={'pokemon' + p.id + p.name} />
            ))
          }
        </div>
      </div>
    </InfiniteScroll>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        pokemons(limit:60, offset:0){
          count,
          results{
            id,
            name,
            image,
            artwork,
            dreamworld,
          }
        }
      }
    `,
  });

  return {
    props: {
      count: data.pokemons.count,
      pokemonDatas: data.pokemons.results
    },
    revalidate: 3600,
  };
}

export default Home
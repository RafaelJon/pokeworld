import { gql } from "@apollo/client";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PokemonCard from "../components/PokemonCard";
import { resolutions } from "../utils/Constants";
import client from "../utils/Apollo";

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

const Home = ({ pokemonDatas }) => {
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
        height: '100%'
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
            Owned: 0 / 1200
          </p>
        </div>
        <div className={list}>
          {
            pokemons.map((p, index) => (
              <PokemonCard picture={p.image} name={p.name} id={p.id} key={'pokemon' + index} />
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
            url
          }
        }
      }
    `,
  });

  return {
    props: {
      pokemonDatas: data.pokemons.results
    },
    revalidate: 3600,
  };
}

export default Home
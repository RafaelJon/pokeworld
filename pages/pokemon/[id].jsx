import { gql } from '@apollo/client';
import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import client from '../../utils/Apollo';
import { resolutions, shimmer, toBase64, typeColor } from '../../utils/Constants';
import ColorThief from 'colorthief'
import DefaultErrorPage from 'next/error'
import CatchingPokemon from '../../components/CatchingPokemon';

const Main = styled.div(({ color }) => ({
  backgroundImage: `linear-gradient(to bottom, ${color} 30%, #ffffff 80%)`,
  display: 'flex',
  transition: "box-shadow 0.5s ease-in-out",
  '& > div': {
    margin: 'auto',
    display: 'flex',
    padding: '6em 2em 2em 2em',
    width: '100%',
    height: '100%',
    maxWidth: '1240px',
    flexDirection: 'column',
    [resolutions.md]: {
      flexDirection: 'row',
    },
  }
}))

const image = css({
  position: 'relative',
  width: '10em',
  paddingTop: '10em',
  margin: '0 auto -3em auto',
  display: 'flex',
  flexDirection: 'column',
  [resolutions.md]: {
    paddingTop: '30%',
    width: '30%',
    margin: '0 1.5em auto 1.5em',
  }
})

const CatchButton = styled.button({
  color: 'white',
  backgroundColor: '#63a4ff',
  border: 'solid 0em #63a4ff',
  borderRadius: '9999px',
  height: '5em',
  width: '5em',
  fontSize: '1em',
  position: 'fixed',
  zIndex: '100',
  bottom: '5em',
  left: 0,
  right: 0,
  margin: '1em auto 0 auto',
  transform: 'translateY(50%)',
  transition: '.3s ease-in-out',
  userSelect: 'none',
  [resolutions.md]: {
    height: 'unset',
    width: 'unset',
    zIndex: 'unset',
    transform: 'translateY(0)',
    position: 'absolute',
    padding: '0.25em 1em',
    margin: '1em auto',
    bottom: 'unset',
    '&:hover': {
      transform: 'scale(1.1)'
    },
  },
  '&:hover': {
    cursor: 'pointer',
  },
  '&:active': {
    background: '#01baef',
  }
})

const rounded = css({
  overflow: 'hidden',
  borderRadius: '9999px',
})

const Card = styled.div({
  margin: 'auto',
  width: '100%',
  padding: '3em 1em 1em 1em',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0px 0.35em 0.5em 0.125em lightgray',
  display: 'flex',
  flexDirection: 'column',
  transition: ".3s ease-in-out",
  '& > h1': {
    textAlign: 'center',
    textTransform: 'uppercase',
    wordWrap: 'break-word'
  },
  [resolutions.md]: {
    width: '70%',
    height: 'unset',
    paddingTop: '1em'
  }
})

const atrTitle = css({
  marginBottom: '0.25em'
})

const atrGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  '& h5': {
    textTransform: 'capitalize'
  },
  [resolutions.xs]: {
    gap: '0 1em',
  },
  [resolutions.md]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0 1.5em',
  }
})

const moveItem = css({
  marginBottom: '1em',
  height: 'unset'
})

const moveGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  borderBottom: 'solid 1px lightgray',
  '& p': {
    margin: '0.5em 0'
  }
})

const itemGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '0.125em',
  [resolutions.xs]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5em 1em',
  },
  [resolutions.sm]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [resolutions.md]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1em 1em',
  },
  [resolutions.lg]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  }
})

const content = css({
  textAlign: 'center',
  margin: 'auto',
})

const TypeP = styled.p(props => ({
  textAlign: 'center',
  textTransform: 'capitalize',
  overflow: 'hidden',
  color: 'white',
  margin: '0',
  borderRadius: '5px',
  background: typeColor[props.type]
}))

const Pokemon = ({ notFound = false, pokemon, picture = '/pokeball.svg' }) => {
  const [isCatching, setisCatching] = useState(false);
  const [pokemonImage, setpokemonImage] = useState(picture);
  const [color, setcolor] = useState('#ffffff');
  const [opacity, setopacity] = useState(1);
  const [isLoading, setisLoading] = useState(true);
  const mainRef = useRef();
  const imageRef = useRef();

  const closeCatching = () => {
    setisCatching(false)
  }

  const caughtPokemon = (nickname) => {
    try {
      let collection = JSON.parse(window.localStorage.getItem('collection')) !== null ? JSON.parse(window.localStorage.getItem('collection')) : []
      window.localStorage.setItem('collection', JSON.stringify([...collection, {
        picture: pokemon.image,
        nickname: nickname,
        name: pokemon.name
      }]))
    } catch (error) {
      alert('collection is full')
    }
  }

  const setBg = () => {
    try {
      const img = document.getElementById('pokemon-img')
      const colorThief = new ColorThief()
      const color = colorThief.getColor(img)
      setcolor('rgb(' + color.join(', ') + ')')
      setopacity(0)
    } catch (error) {
      setisLoading(true)
    }
  }

  if (notFound) return <DefaultErrorPage statusCode={404} />

  return (<>
    {isCatching && <CatchingPokemon pokemonImage={picture} closeCatching={closeCatching} caughtPokemon={caughtPokemon} />}
    <Main color={color} ref={mainRef} style={{
      boxShadow: `inset 0 80vh 10em -10em rgba(150, 150, 150, ${opacity}), inset 0 0 10em 50vw rgba(225, 225, 225, ${opacity})`
    }}>
      <div>
        <div className={cx(image, { [rounded]: isLoading })} ref={imageRef} >
          <Image
            id='pokemon-img'
            src={pokemonImage}
            layout='fill'
            objectFit='contain'
            alt={pokemon.name + '\'s image'}
            placeholder='blur'
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            onError={(e) => {
              setpokemonImage('/pokeball.svg')
            }}
            onLoadingComplete={({ naturalHeight, naturalWidth }) => {
              if (naturalHeight === 0 || naturalWidth === 0) {
                setpokemonImage('/pokeball.svg')
              }
              setisLoading(false)
              setBg()
            }}
            priority={true}
          />
          <CatchButton
            onClick={() => {
              setisCatching(true)
            }}
          >
            catch
          </CatchButton>
        </div>
        <Card>
          <h1>
            <em>
              {pokemon.name}
            </em>
          </h1>
          <div className={atrGrid}>
            <div>
              <h3 className={atrTitle}>Type</h3>
              <div className={itemGrid}>
                {
                  pokemon.types.map((type, index) => (
                    <TypeP type={type} key={'type' + index}>
                      {type}
                    </TypeP>
                  ))
                }
              </div>
            </div>
            <div>
              <h3 className={atrTitle}>Abilities</h3>
              <div className={itemGrid}>
                {
                  pokemon.abilities.map((ability, index) => (
                    <em className={content} key={'ability' + index}>
                      {ability}
                    </em>
                  ))
                }
              </div>
            </div>
          </div>
          <div>
            <h3 className={atrTitle}>Learnable Moves</h3>
            <div className={atrGrid}>
              {
                pokemon.moveGroups.map((group, index) => (
                  <div className={moveItem} key={'movegroup' + index}>
                    <h5>{group.name} Moves</h5>
                    <div className={moveGrid}>
                      <h6>
                        Lv.
                      </h6>
                      <h6>
                        Move
                      </h6>
                    </div>
                    {
                      group.moves.map((move, index) => (
                        <div className={moveGrid} key={"move" + index}>
                          <p>
                            {move.level}
                          </p>
                          <p>
                            <em>
                              {move.name}
                            </em>
                          </p>
                        </div>)
                      )
                    }
                  </div>
                ))
              }
            </div>
          </div>
        </Card>
      </div>
    </Main>
  </>)
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        pokemons(limit:-1, offset:0){
          count
        }
      }
    `,
  });
  const paths = Array.from(Array(data.pokemons.count).keys()).map((p, index) => ({
    params: { id: (index + 1).toString() },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query {
        pokemons(limit:1, offset:${parseInt(params.id) - 1}){
          count,
          results{
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

  if (data.pokemons.results[0] === undefined) {
    return {
      props: {
        notFound: true
      }
    }
  }

  const detail = await client.query({
    query: gql`
      query {
        pokemon(name:"${data.pokemons.results[0].name}"){
          id,
          name,
          species{
            name
          },
          abilities{
            ability{
              name
            }
          },
          moves {
            move {
              name
            },
            version_group_details {
              level_learned_at,
              move_learn_method{
                name
              }
            }
          },
          types {
            type {
              name
            }
          }
        }
      }
    `,
  });

  if (detail.data.pokemon === undefined) {
    return {
      props: {
        notFound: true
      }
    }
  }

  let group = new Set(detail.data.pokemon.moves.map((m) => m.version_group_details[0].move_learn_method.name))

  let moveGroups = [...group].map((g) => ({
    name: g,
    moves: detail.data.pokemon.moves.filter((m) => m.version_group_details[0].move_learn_method.name === g).map((m) => ({
      level: parseInt(m.version_group_details[0].level_learned_at),
      name: m.move.name
    })).sort((a, b) => (a.level - b.level))
  })).sort((a, b) => (a.moves.length - b.moves.length))

  return {
    props: {
      pokemon: {
        image: data.pokemons.results[0] !== undefined ? data.pokemons.results[0].image : '/pokeball.svg',
        name: detail.data.pokemon.name,
        species: detail.data.pokemon.species,
        types: detail.data.pokemon.types.map((t) => t.type.name),
        abilities: detail.data.pokemon.abilities.map((a) => a.ability.name),
        moveGroups: moveGroups
      },
      picture: data.pokemons.results[0] !== undefined ? data.pokemons.results[0].artwork : '/pokeball.svg'
    },
    revalidate: 3600,
  };
}

export default Pokemon;
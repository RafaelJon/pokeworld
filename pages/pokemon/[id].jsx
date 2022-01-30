import { gql } from '@apollo/client';
import { css, cx } from '@emotion/css';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import client from '../../utils/Apollo';
import { resolutions, shimmer, toBase64, typeColor } from '../../utils/Constants';
import ColorThief from 'colorthief'

const Main = styled.div(({ color }) => ({
  backgroundImage: `linear-gradient(to bottom, ${color} 30%, #ffffff 80%)`,
  padding: '6em 2em 2em 2em',
  display: 'flex',
  transition: "box-shadow 0.5s ease-in-out",
  height: 'calc(100vh)',
  flexDirection: 'column',
  [resolutions.sm]: {
    flexDirection: 'row',
  }
}))

const image = css({
  position: 'relative',
  width: '80%',
  paddingTop: '6em',
  margin: '0 auto -3em auto',
  [resolutions.sm]: {
    paddingTop: '30%',
    width: '30%',
    margin: 'auto 1.5em'
  }
})

const rounded = css({
  overflow: 'hidden',
  borderRadius: '9999px',
})

const Card = styled.div({
  margin: 'auto',
  width: '100%',
  height: '100%',
  padding: '3em 1em 1em 1em',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0px 0.35em 0.5em 0.125em lightgray',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  transition: ".3s ease-in-out",
  '& > h1': {
    fontSize: '1.25em',
    textAlign: 'center',
    textTransform: 'uppercase',
    wordWrap: 'break-word'
  },
  [resolutions.sm]: {
    width: '70%',
    height: 'unset',
    paddingTop: '1em'
  }
})

const typeGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gap: '0.5em',
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
  },
  [resolutions.xl]: {
    gridTemplateColumns: 'repeat(8, 1fr)',
  }
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

const Pokemon = ({ pokemon, picture }) => {
  const [pokemonImage, setpokemonImage] = useState(picture);
  const [color, setcolor] = useState('#ffffff');
  const [opacity, setopacity] = useState(1);
  const [isLoading, setisLoading] = useState(true);
  const mainRef = useRef();
  const imageRef = useRef();

  const setBg = () => {
    const img = document.getElementById('pokemon-img')
    const colorThief = new ColorThief()
    const color = colorThief.getColor(img)
    setcolor('rgb(' + color.join(', ') + ')')
    setopacity(0)
  }

  return <Main color={color} ref={mainRef} style={{
    boxShadow: `inset 0 -60vh 10em -10em rgba(225, 225, 225, ${opacity}), inset 0 0 10em 50vh rgba(150, 150, 150, ${opacity})`
  }}>
    <div className={cx(image, { [rounded]: isLoading })} ref={imageRef} >
      <Image
        id='pokemon-img'
        src={pokemonImage}
        layout='fill'
        objectFit='contain'
        alt={pokemon.name + '\'s image'}
        placeholder='blur'
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        onError={() => {
          setpokemonImage('/pokeball.svg')
        }}
        onLoadingComplete={() => {
          setisLoading(false)
          setBg()
        }}
      priority={true}
      />
    </div>
    <Card>
      <h1>
        <em>
          {pokemon.name}
        </em>
      </h1>
      <div>
        <p>Type</p>
        <div className={typeGrid}>
          {
            pokemon.types.map((d, index) => (
              <TypeP type={d.type.name} key={'type' + index}>
                {d.type.name}
              </TypeP>
            ))
          }
        </div>
      </div>
      <div>
        <p>Moves</p>
      </div>
    </Card>
  </Main>;
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        pokemons(limit:-1, offset:0){
          count,
          results{
            id
          }
        }
      }
    `,
  });
  const paths = data.pokemons.results.map((p) => ({
    params: { id: p.id.toString() },
  }))
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query {
        pokemons(limit:1, offset:${parseInt(params.id)-1}){
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
  return {
    props: {
      pokemon: detail.data.pokemon,
      picture: data.pokemons.results[0] !== undefined ? data.pokemons.results[0].artwork : '/pokeball.svg'
    },
    revalidate: 3600,
  };
}

export default Pokemon;
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { resolutions } from "../utils/Constants";

export const Main = styled.div({
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

export const content = css({
  width: '100%',
  maxWidth: '1240px',
  margin: 'auto',
  padding: '0 1em 2em 1em',
  [resolutions.sm]: {
    padding: '0 2em 2em 2em',
  }
})

export const circle = css({
  overflow: 'hidden',
  borderRadius: '9999px',
})

export const list = css({
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
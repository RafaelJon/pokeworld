const media = (bp) => `@media (min-width: ${bp}px)`

const resolutions = {
  sm: media("480"),
  md: media("640"),
  lg: media("720"),
  xl: media("1024"),
}

export default resolutions;
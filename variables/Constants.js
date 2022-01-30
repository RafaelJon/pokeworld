const media = (bp) => `@media (min-width: ${bp}px)`

const resolutions = {
  xs: media('321'),
  sm: media('481'),
  md: media('721'),
  lg: media('1025'),
  xl: media('1441'),
}

export default resolutions;
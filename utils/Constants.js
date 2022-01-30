const media = (bp) => `@media (min-width: ${bp}px)`

export const resolutions = {
  xs: media('321'),
  sm: media('481'),
  md: media('721'),
  lg: media('1025'),
  xl: media('1441'),
}

export const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#ccc" offset="20%" />
          <stop stop-color="#bbb" offset="50%" />
          <stop stop-color="#ccc" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#ccc" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `

export const typeColor = {
  'normal': '#b8b8a8',
  'fighting': '#f87070',
  'flying': 'linear-gradient(to bottom, #3dc7ef 50%, #bdb9b8 50%)',
  'poison': '#e090f8',
  'ground': 'linear-gradient(to bottom, #e0e000 50%, #c8a048 50%)',
  'rock': '#c8a048',
  'bug': '#a0c888',
  'ghost': '#a870f8',
  'steel': '#b8b8d0',
  'fire': '#f89030',
  'water': '#6898f7',
  'grass': '#90e880',
  'electric': '#e0e000',
  'psychic': '#f838a8',
  'ice': '#30d8cf',
  'dragon': 'linear-gradient(to bottom, #6898f8 50%, #f87070 50%)',
  'dark': '#908888',
  'fairy': '#ff65d5',
  'unknown': '#1c9c88',
  'shadow': '#302945',
}
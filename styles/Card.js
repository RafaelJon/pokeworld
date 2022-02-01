import { css } from "@emotion/css";
import { resolutions } from "../utils/Constants";

export const image = css({
  position: 'relative',
  width: '90%',
  paddingTop: '90%',
  margin: '-30% auto 0 auto',
  [resolutions.xs]: {
    marginTop: '-40%',
  }
})
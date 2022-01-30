// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { gql } from "@apollo/client";
import client from "../../variables/Apollo";

export default async function handler(req, res) {
  console.log(res)
  const data = client
    .query({
      query: gql`
      query {
        pokemons(limit:12, offset:res.offset){
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
    `
    })
  console.log(data)
  res.status(200).json(data)
}

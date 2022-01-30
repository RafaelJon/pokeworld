// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { gql } from "@apollo/client";
import client from "../../../variables/Apollo";

export default async function handler(req, res) {
  let offsetData = parseInt(req.query.offset)
  const { data } = await client.query({
    query: gql` 
      query {
        pokemons(limit:12, offset: ${offsetData}){
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
  res.status(200).json(data)
}

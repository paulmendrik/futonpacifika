
import { sanityClient } from 'sanity:client';


const paintingFields = `
  _id,
  title,
  painting,
  'slug': slug.current,
  order, 
  views,
  "slides": views[]
`


export async function getPaintings() {
return await sanityClient().fetch(`*[_type in ["paintings, paintings-2, paintings-3"]]{${paintingFields}}`
);
}





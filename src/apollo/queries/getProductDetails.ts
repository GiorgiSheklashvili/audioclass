/**
 * @flow
 */

import { gql } from '@apollo/client';
import { MEDIA_GALLERY_FRAGMENT } from './mediaGalleryFragment';
import type { MediaGalleryItemType } from './mediaGalleryFragment';
import type { PriceRange } from './getCategoryProducts';

export const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      total_count
      items {
        id
        sku
        name
        small_image
        meta_title
        description
        media_gallery_entries {
          disabled
          label
          position
          file
        }
        price {
          minimalPrice{
             amount{
               value
               currency
             }
           }
           maximalPrice{
             amount{
               value
               currency
             }
           }
           regularPrice{
             amount{
               value
               currency
             }
           }
        }
        ... on DownloadableProduct {
          downloadable_product_links {
            id
            title
            sample_url
          }
        }
      }
    }
  }
`;

export type ProductDetailsType = {
  id: number,
  sku: string,
  name: string,
  media_gallery_entries: Array<MediaGalleryItemType>,
  price: PriceRange,
  description: string,
  url: string,
  meta_title: string,
  small_image: string,
  // media_gallery_entries: {
  //   disabled : boolean,
  //   label : String,
  //   position : number,
  //   file : String
  // }
};

export type ProductDetailsResponseType = {
  products: {
    total_count: number,
    items: Array<ProductDetailsType>,
  },
};

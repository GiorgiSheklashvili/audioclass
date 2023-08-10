/**
 * @flow
 */

import { gql } from '@apollo/client';

export const GET_CATEGORY_PRODUCTS = gql`
  query GetCategoryProducts($id: String!, $pageSize: Int!, $currentPage: Int!) {
    products(
      filter: { category_id: { eq: $id } }
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      total_count
      items {
        id
        name
        sku
        small_image
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

export type GetCategoryProductsType = {
  products: {
    total_count: number,
    items: Array<ProductType>,
  },
};

export type PriceRange = {
  minimalPrice: {
    amount: {
      currency: string,
      value: number,
    },
  },
};

export type ProductType = {
  id: number,
  name: string,
  sku: string,
  small_image: string,
  price_range: PriceRange,
  meta_title: string,
};
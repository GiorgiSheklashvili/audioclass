//@flow
import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories($id: Int!) {
    category( id: $id ) {
      id
      children {
        id
        name
        product_count
        children_count
        children {
          id
          name
          product_count
          children_count
        }
      }
    }
  }
`;

export type CategoryListType = {
  category: CategoryListNodeType,
};

export type CategoryListNodeType = {
  id: number,
  children: Array<CategoryType>,
};

export type CategoryType = {
  id: number,
  name: string,
  product_count: number,
  children_count: number,
};
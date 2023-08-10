/**
 * @flow
 */
import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_PRODUCT_DETAILS } from '../../apollo/queries/getProductDetails';
import type {
  ProductDetailsResponseType,
  ProductDetailsType,
} from '../../apollo/queries/getProductDetails';

type Props = {
  sku: string;
};

type Result = {
  getProductDetails: () => void;
  loading: boolean;
  productData: ProductDetailsType | null | undefined;
};

export const useProductDetails = ({ sku }: Props): Result => {
  const [productData, setProductData] = useState<ProductDetailsType | null | undefined>(null);

  const [getProductDetailsQuery, responseObject] = useLazyQuery<ProductDetailsResponseType>(
    GET_PRODUCT_DETAILS,
    {
      variables: { sku },
      onCompleted: (response) => {
        console.log(response);
        setProductData(response?.products?.items?.[0]);
      },
      onError: (response) => {
        console.log(response);
      }
    },
  );

  const { loading } = responseObject;

  const getProductDetails = () => {
    getProductDetailsQuery();
  };

  return {
    getProductDetails,
    loading,
    productData,
  };
};
import crashlytics from '@react-native-firebase/crashlytics';
/**
 * @flow
 */

import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_CATEGORIES } from '../../apollo/queries/getCategory';
import type { CategoryType, CategoryListType } from '../../apollo/queries/getCategory';

type Props = {
  categoryId: number,
};

type Result = {
  getCategories(): void,
  categories: Array<CategoryType>,
  loading: boolean,
};

export const useCategories = (props: Props): Result => {
  const [categories, setCategories] = useState<Array<CategoryType>>([]);
  const [getCategories, { called, loading, data, error }] = useLazyQuery(
    GET_CATEGORIES,
    { variables: { id: props.categoryId } }
  );

  // useEffect(() => {
    // if (data) {
    // const list: CategoryListType = {"category":{"id":2,"children":[{"id":37,"name":"Sale","product_count":1,"children_count":0},{"id":42,"name":"Entrepreneurship","product_count":1,"children_count":0,},{"id":44,"name":"Relationships","product_count":1,"children_count":0},{"id":45,"name":"Investing","product_count":1,"children_count":0,},{"id":47,"name":"Education","product_count":1,"children_count":0},{"id":48,"name":"History","product_count":1,"children_count":0},{"id":49,"name":"Languages","product_count":0,"children_count":0},{"id":50,"name":"Art","product_count":0,"children_count":0},{"id":51,"name":"Poetry","product_count":0,"children_count":0}]}};
    // console.log(JSON.stringify(list.category?.children))
    // if (list.category?.children?.length > 0) {
    //   setCategories(list.category?.children);
    // }
    // }
    // if (error) {
    //   console.log({ error });
    //   console.log(error.networkError);

    //   crashlytics().log('error: ');
    //   crashlytics().log(error.message);
    //   crashlytics().log(error.extraInfo);
    //   crashlytics().log(error.graphQLErrors.toString());
    //   crashlytics().log(error.name);

    //   crashlytics().crash();
    // }
  // }, [data, error]);

  useEffect(()=>{
    const list: CategoryListType = {"category":{"id":2,"children":[{"id":37,"name":"Sale","product_count":1,"children_count":0},{"id":42,"name":"Entrepreneurship","product_count":0,"children_count":0,},{"id":44,"name":"Relationships","product_count":1,"children_count":0},{"id":45,"name":"Investing","product_count":1,"children_count":0,},{"id":47,"name":"Education","product_count":1,"children_count":0},{"id":48,"name":"History","product_count":1,"children_count":0},{"id":49,"name":"Languages","product_count":0,"children_count":0},{"id":50,"name":"Art","product_count":0,"children_count":0},{"id":51,"name":"Poetry","product_count":0,"children_count":0}]}};
    console.log(JSON.stringify(list.category?.children))
    if (list.category?.children?.length > 0) {
      setCategories(list.category?.children);
    }
  }, [])

  return {
    getCategories,
    categories,
    loading,
  };
};
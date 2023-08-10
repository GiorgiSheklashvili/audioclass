/**
 * @flow
 */
import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_CATEGORY_PRODUCTS } from '../../apollo/queries/getCategoryProducts';
import type { GetCategoryProductsType, ProductType } from '../../apollo/queries/getCategoryProducts';

type Props = {
  categoryId: string,
};

type Result = {
  products: Array<ProductType>,
  getCategoryProducts(): void,
  loading: boolean,
  refreshing: boolean,
  refresh(): void,
  loadMore(): void,
};

const PAGE_SIZE = 10;

export const useCategoryProducts = ({ categoryId }: Props): Result => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [getCategoryProducts, queryResponse] = useLazyQuery(
    GET_CATEGORY_PRODUCTS,
    {
      variables: { id: categoryId, pageSize: PAGE_SIZE, currentPage: currentPage },
      // fetchPolicy: 'no-cache',
      onCompleted: (responseData) => {
        if (responseData?.products?.items && currentPage === 1) {
          setProducts(responseData?.products?.items);
        } else if (
          responseData?.products?.items &&
          products.length < responseData.products.total_count &&
          products.length < currentPage * PAGE_SIZE
        ) {
          setProducts([...products, ...responseData?.products?.items]);
        }
      },
    },
  );
  const { loading, error, data } = queryResponse;

  useEffect(() => {
    if (!loading) {
      getCategoryProducts();
    }
  }, [currentPage, getCategoryProducts]); // eslint-disable-line

  // useEffect(()=>{
  //   switch(categoryId.toString()){
  //     case '48': {
  //       const obj: any = [
  //         {
  //           "id": 2041,
  //           "name": "Napoleon - Coming to power(FREE)",
  //           "image": "/n/a/napoleon_4.jpg",
  //           "description": "<p>Born on the island of Corsica, Napoleon rapidly rose through the ranks of the military during the French Revolution (1789-1799). After seizing political power in France in a 1799 coup d'état, he crowned himself emperor in 1804.</p>",
  //           "price": {
  //             "minimalPrice": {
  //               "amount": {
  //                 "value": 2,
  //                 "currency": "USD"
  //               }
  //             },
  //             "maximalPrice": {
  //               "amount": {
  //                 "value": 2,
  //                 "currency": "USD"
  //               }
  //             },
  //             "regularPrice": {
  //               "amount": {
  //                 "value": 2,
  //                 "currency": "USD"
  //               }
  //             }
  //           },
  //           "downloadable_product_links": {
  //             "id" : 1,
  //             "title" : "sadad",
  //             "sample_url" : "sdasd"
  //           }
  //         }
  //       ];

  //       setProducts(obj);
  //       break;
  //     }
  //     case '42': {
  //       const obj: any = [
  //         {
  //           "id": 2042,
  //           "name": "Life lessons from Henry Ford",
  //           "image": "/f/o/ford.jpg",
  //           "description": "Henry Ford was not only a pioneer of the American automobile industry but also a great businessman and innovator. He founded Ford Motor Company in 1903 and went on to revolutionize the way we manufacture and distribute automobiles. But he was more than just an industrialist. He had a unique perspective on life that was shaped by his experiences, failures, and successes.\r\n\r\nIn this lesson, we will delve into some of the most important life lessons we can learn from Henry Ford. We will explore how he valued hard work, persistence, and determination, and how he believed that success is achieved through innovation, creativity, and collaboration.",
  //           "price": {
  //             "minimalPrice": {
  //               "amount": {
  //                 "value": 3,
  //                 "currency": "USD"
  //               }
  //             },
  //             "maximalPrice": {
  //               "amount": {
  //                 "value": 3,
  //                 "currency": "USD"
  //               }
  //             },
  //             "regularPrice": {
  //               "amount": {
  //                 "value": 3,
  //                 "currency": "USD"
  //               }
  //             }
  //           },
  //           "downloadable_product_links": {
  //             "id" : 1,
  //             "title" : "sadad",
  //             "sample_url" : "sdasd"
  //           }
  //         }
  //       ];

  //       setProducts(obj);
  //       break;

  //     }
  //     case '44': {
  //       const obj: any = [
  //         {
  //           "id": 2043,
  //           "name": "Building business relationships",
  //           "image": "/h/a/hands.jpg",
  //           "description": "<p>This lesson is focused on the importance of establishing strong and lasting relationships with business partners, customers, and other stakeholders. Throughout this lesson, participants will learn key strategies for building and maintaining effective business relationships, including effective communication, active listening, empathy, and trust building.</p>\r\n<p>Also, you will explore the benefits of investing time and resources into building strong business relationships, including increased loyalty, enhanced collaboration, and improved productivity. Additionally, the lesson will cover techniques for managing and resolving conflicts that may arise in business relationships, as well as best practices for building and maintaining long-term partnerships.</p>",
  //           "price": {
  //             "minimalPrice": {
  //               "amount": {
  //                 "value": 3,
  //                 "currency": "USD"
  //               }
  //             },
  //             "maximalPrice": {
  //               "amount": {
  //                 "value": 3,
  //                 "currency": "USD"
  //               }
  //             },
  //             "regularPrice": {
  //               "amount": {
  //                 "value": 3,
  //                 "currency": "USD"
  //               }
  //             }
  //           },
  //           "downloadable_product_links": {
  //             "id" : 1,
  //             "title" : "sadad",
  //             "sample_url" : "sdasd"
  //           }
  //         }
  //       ];

  //       setProducts(obj);
  //       break;

  //     }
  //     case '45': {
  //       const obj: any = [
  //         {
  //           "id": 2044,
  //           "name": "Common mistakes of new investor",
  //           "image": "/m/o/money.jpg",
  //           "description": "<p>This audio lesson explores the common mistakes made by new investors and provides tips on how to avoid them. Topics covered include the importance of doing research, avoiding emotional decision-making, diversifying investments, and having a long-term investment strategy.</p>",
  //           "price": {
  //             "minimalPrice": {
  //               "amount": {
  //                 "value": 3,
  //                 "currency": "USD"
  //               }
  //             },
  //             "maximalPrice": {
  //               "amount": {
  //                 "value": 3,
  //                 "currency": "USD"
  //               }
  //             },
  //             "regularPrice": {
  //               "amount": {
  //                 "value": 3,
  //                 "currency": "USD"
  //               }
  //             }
  //           },
  //           "downloadable_product_links": {
  //             "id" : 1,
  //             "title" : "sadad",
  //             "sample_url" : "sdasd"
  //           }
  //         }
  //       ];

  //       setProducts(obj);
  //       break;
  //     }
  //     case '47': {
  //       const obj: any = [
  //         {
  //           "id": 2045,
  //           "name": "HomeSchooling/Apprenticeship vs Traditional route",
  //           "image": "/e/d/education.jpg",
  //           "description": "<p>Homeschooling and apprenticeships offer personalized education and practical skills, but may lack structure and socialization. Traditional schooling provides a comprehensive education with socialization opportunities, but may not meet individual needs. The choice depends on personal circumstances and goals.</p>",
  //           "price": {
  //             "minimalPrice": {
  //               "amount": {
  //                 "value": 3,
  //                 "currency": "USD"
  //               }
  //             },
  //             "maximalPrice": {
  //               "amount": {
  //                 "value": 3,
  //                 "currency": "USD"
  //               }
  //             },
  //             "regularPrice": {
  //               "amount": {
  //                 "value": 3,
  //                 "currency": "USD"
  //               }
  //             }
  //           },
  //           "downloadable_product_links": {
  //             "id" : 1,
  //             "title" : "sadad",
  //             "sample_url" : "sdasd"
  //           }
  //         }
  //       ];
  //       setProducts(obj);
  //       break;
  //     }
  //     case '37': {
  //       const obj: any = [
  //         {
  //           "id": 2046,
  //           "name": "Cold calling",
  //           "image": "/c/o/cold.jpg",
  //           "description": "<p>\"Cold calling\" is an audio class that teaches techniques and strategies for making successful sales calls to potential customers who have not expressed any prior interest in a product or service. The class covers topics such as preparing for the call, overcoming objections, and building rapport with the prospect. Students will learn how to confidently and effectively engage with potential customers over the phone, leading to increased sales and revenue.</p>",
  //           "price": {
  //             "minimalPrice": {
  //               "amount": {
  //                 "value": 2,
  //                 "currency": "USD"
  //               }
  //             },
  //             "maximalPrice": {
  //               "amount": {
  //                 "value": 2,
  //                 "currency": "USD"
  //               }
  //             },
  //             "regularPrice": {
  //               "amount": {
  //                 "value": 2,
  //                 "currency": "USD"
  //               }
  //             }
  //           },
  //           "downloadable_product_links": {
  //             "id" : 1,
  //             "title" : "sadad",
  //             "sample_url" : "sdasd"
  //           }
  //         }
  //       ];

  //       setProducts(obj);
  //       break;
  //     }

  //   }
  // }, [])

  const refresh = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      getCategoryProducts();
    }
  };

  const loadMore = () => {
    if (loading) {
      return;
    }

    if (currentPage * PAGE_SIZE === products.length) {
      setCurrentPage(currentPage + 1);
    }
  };


  return {
    products,
    getCategoryProducts,
    loading,
    refreshing: loading,
    refresh,
    loadMore,
  };
};
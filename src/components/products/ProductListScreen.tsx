/**
 * @flow
 */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { View, Text, Spacings } from 'react-native-markup-kit';
import { useCategoryProducts } from '../../logic/products/useCategoryProducts';
import { useRoute, useNavigation } from '@react-navigation/core';
import type { ProductType } from '../../apollo/queries/getCategoryProducts';
import { ProductListItem } from './ProductListItem';
import * as routes from '../../navigation/routes';


export const ProductListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  // const { loading, products, loadMore, refreshing, refresh } = useCategoryProducts({
  //   categoryId: route?.params?.categoryId,
  // });


  
  const onProductItemPress = (item: ProductType) => {
    navigation.push(routes.NAVIGATION_PRODUCT_DETAILS_ROUTE, {
      title: item.name,
      sku: item.sku,
    });
  };

  useEffect(() => {
    // getCategoryProducts();
    const ssss =route?.params?.categoryId;
    switch(ssss){
      case 48: {
        const obj: any = [
          {
            "id": 2041,
            "name": "Napoleon - Coming to power(FREE)",
            "sku": "NPCP1-FREE",
            "small_image": "/n/a/napoleon_4.jpg",
            "description": "<p>Born on the island of Corsica, Napoleon rapidly rose through the ranks of the military during the French Revolution (1789-1799). After seizing political power in France in a 1799 coup d'état, he crowned himself emperor in 1804.</p>",
            "price": {
              "minimalPrice": {
                "amount": {
                  "value": 2,
                  "currency": "USD"
                }
              },
              "maximalPrice": {
                "amount": {
                  "value": 2,
                  "currency": "USD"
                }
              },
              "regularPrice": {
                "amount": {
                  "value": 2,
                  "currency": "USD"
                }
              }
            },
            "downloadable_product_links": {
              "id" : 1,
              "title" : "sadad",
              "sample_url" : "sdasd"
            }
          }
        ];
  
        setProducts(obj);
        break; 
      }
      // case 42: {
      //   const obj: any = [
      //     {
      //       "id": 2042,
      //       "name": "Life lessons from Henry Ford",
      //       "small_image": "/f/o/ford.jpg",
      //       "sku": "Life lessons from Henry Ford",
      //       "description": "Henry Ford was not only a pioneer of the American automobile industry but also a great businessman and innovator. He founded Ford Motor Company in 1903 and went on to revolutionize the way we manufacture and distribute automobiles. But he was more than just an industrialist. He had a unique perspective on life that was shaped by his experiences, failures, and successes.\r\n\r\nIn this lesson, we will delve into some of the most important life lessons we can learn from Henry Ford. We will explore how he valued hard work, persistence, and determination, and how he believed that success is achieved through innovation, creativity, and collaboration.",
      //       "price": {
      //         "minimalPrice": {
      //           "amount": {
      //             "value": 3,
      //             "currency": "USD"
      //           }
      //         },
      //         "maximalPrice": {
      //           "amount": {
      //             "value": 3,
      //             "currency": "USD"
      //           }
      //         },
      //         "regularPrice": {
      //           "amount": {
      //             "value": 3,
      //             "currency": "USD"
      //           }
      //         }
      //       },
      //       "downloadable_product_links": {
      //         "id" : 1,
      //         "title" : "sadad",
      //         "sample_url" : "sdasd"
      //       }
      //     }
      //   ];
  
      //   setProducts(obj);
      //   break;
      // }
      case 44: {
        const obj: any = [
          {
            "id": 2043,
            "name": "Building Relationships in Sales",
            "small_image": "/h/a/hands.jpg",
            "sku": "Building Relationships in Sales",
            "description": "<p>This lesson is focused on the importance of establishing strong and lasting relationships with business partners, customers, and other stakeholders. Throughout this lesson, participants will learn key strategies for building and maintaining effective business relationships, including effective communication, active listening, empathy, and trust building.</p>\r\n<p>Also, you will explore the benefits of investing time and resources into building strong business relationships, including increased loyalty, enhanced collaboration, and improved productivity. Additionally, the lesson will cover techniques for managing and resolving conflicts that may arise in business relationships, as well as best practices for building and maintaining long-term partnerships.</p>",
            "price": {
              "minimalPrice": {
                "amount": {
                  "value": 3,
                  "currency": "USD"
                }
              },
              "maximalPrice": {
                "amount": {
                  "value": 3,
                  "currency": "USD"
                }
              },
              "regularPrice": {
                "amount": {
                  "value": 3,
                  "currency": "USD"
                }
              }
            },
            "downloadable_product_links": {
              "id" : 1,
              "title" : "sadad",
              "sample_url" : "sdasd"
            }
          }
        ];
  
        setProducts(obj);
        break;
      }
      case 45: {
        const obj: any = [
          {
            "id": 2044,
            "name": "Common mistakes of new investor",
            "sku": "Common mistakes of new investor",
            "small_image": "/m/o/money.jpg",
            "description": "<p>This audio lesson explores the common mistakes made by new investors and provides tips on how to avoid them. Topics covered include the importance of doing research, avoiding emotional decision-making, diversifying investments, and having a long-term investment strategy.</p>",
            "price": {
              "minimalPrice": {
                "amount": {
                  "value": 3,
                  "currency": "USD"
                }
              },
              "maximalPrice": {
                "amount": {
                  "value": 3,
                  "currency": "USD"
                }
              },
              "regularPrice": {
                "amount": {
                  "value": 3,
                  "currency": "USD"
                }
              }
            },
            "downloadable_product_links": {
              "id" : 1,
              "title" : "sadad",
              "sample_url" : "sdasd"
            }
          }
        ];
  
        setProducts(obj);
        break;
      }
      case 47: {
        const obj: any = [
          {
            "id": 2045,
            "name": "HomeSchooling in USA",
            "small_image": "/e/d/education.jpg",
            "sku": "HomeSchooling in USA",
            "description": "<p>Homeschooling and apprenticeships offer personalized education and practical skills, but may lack structure and socialization. Traditional schooling provides a comprehensive education with socialization opportunities, but may not meet individual needs. The choice depends on personal circumstances and goals.</p>",
            "price": {
              "minimalPrice": {
                "amount": {
                  "value": 3,
                  "currency": "USD"
                }
              },
              "maximalPrice": {
                "amount": {
                  "value": 3,
                  "currency": "USD"
                }
              },
              "regularPrice": {
                "amount": {
                  "value": 3,
                  "currency": "USD"
                }
              }
            }
          }
        ];
        setProducts(obj);
        break;
      }
      case 37: {
        const obj: any = [
          {
            "id": 2046,
            "name": "The Flaws of Traditional Cold Calling and the Evolution of Selling Practices",
            "sku": "Cold calling",
            "small_image": "/c/o/cold.jpg",
            "description": "The course teaches a new sales strategy, replacing traditional cold calling with engaging conversations about buyer needs. It emphasizes relationship-building, effective pitching, networking, social media, and team management. It also covers empathy for customers, hiring, training, motivation, goal-setting, and compensation.",
            "price": {
              "minimalPrice": {
                "amount": {
                  "value": 2,
                  "currency": "USD"
                }
              },
              "maximalPrice": {
                "amount": {
                  "value": 2,
                  "currency": "USD"
                }
              },
              "regularPrice": {
                "amount": {
                  "value": 2,
                  "currency": "USD"
                }
              }
            }
          }
        ];
  
        setProducts(obj);
        break;
      }
  
    }
  }, []);

  // if (loading) {
  //   return (
  //     <View flex center>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductType,
    index: number,
  }) => {
    return <ProductListItem item={item} index={index} onPress={onProductItemPress} />;
  };

  // const footerComponent = () => {
  //   if (loading && products.length !== 0) {
  //     return (
  //       <View flex center height={80}>
  //         <ActivityIndicator size="large" />
  //       </View>
  //     );
  //   }
  //   return null;
  // };

  return (
     <View flex>
        <FlatList
          numColumns={2}
          contentContainerStyle={{
            paddingVertical: Spacings.s2,
            marginHorizontal: Spacings.s2,
          }}
          data={products}
          keyExtractor={(item) => `productItem${item.id.toString()}`}
          renderItem={renderItem}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          // }
          // onEndReached={loadMore}
          // ListFooterComponent={footerComponent}
        />
    </View>
  );
};
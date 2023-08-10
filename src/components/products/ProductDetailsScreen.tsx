/**
 * @flow
 */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/core';
import { View, Text, Constants  } from 'react-native-markup-kit';
import { useProductDetails } from '../../logic/products/useProductDetails';
import { MediaGallery } from '../common/MediaGallery';
import { priceStringFromPriceRange } from '../../logic/util/price';
import { ProductDetailsScreenRouteProp } from '../../navigation/Navigation';
import Html from 'react-native-render-html';
import * as routes from '../../navigation/routes';
import type { ProductDetailsType } from '../../apollo/queries/getProductDetails';
import Purchases from 'react-native-purchases';
import { mediaUrl } from '../../logic/util/constants';

type ProductDetailsScreenProps = {
  route: ProductDetailsScreenRouteProp;
};

export const ProductDetailsScreen = ({ route }: ProductDetailsScreenProps) => {
  const [premium, setPremium] = useState(true);
  const navigation = useNavigation();
  const [productData, setProductData] = useState();

  // const { getProductDetails, loading, productData } = useProductDetails({
  //   sku: route?.params?.sku,
  // });

  useEffect(() => {
    checkUserMembership();
    Purchases.addCustomerInfoUpdateListener(info => {
      console.log('shemovida productdetailsscreen addCustomerInfoUpdateListenershi');
      checkUserMembership();
    });
    // setPremium(true)
    switch(route?.params?.sku){
      // case "Life lessons from Henry Ford":{
      //   const obj: any = {
      //     "id": 2042,
      //     "sku": "Life lessons from Henry Ford",
      //     "name": "Life lessons from Henry Ford",
      //     "small_image": "/f/o/ford.jpg",
      //     "meta_title": "No Author",
      //     "description": "Henry Ford was not only a pioneer of the American automobile industry but also a great businessman and innovator. He founded Ford Motor Company in 1903 and went on to revolutionize the way we manufacture and distribute automobiles. But he was more than just an industrialist. He had a unique perspective on life that was shaped by his experiences, failures, and successes.\r\n\r\nIn this lesson, we will delve into some of the most important life lessons we can learn from Henry Ford. We will explore how he valued hard work, persistence, and determination, and how he believed that success is achieved through innovation, creativity, and collaboration.",
      //     "media_gallery_entries": [
      //       {
      //         "disabled": false,
      //         "label": null,
      //         "position": 0,
      //         "file": "/h/e/henryford.jpg"
      //       },
      //       {
      //         "disabled": false,
      //         "label": null,
      //         "position": 1,
      //         "file": "/f/o/ford.jpg"
      //       }
      //     ],
      //     "price": {
      //       "minimalPrice": {
      //         "amount": {
      //           "value": 3,
      //           "currency": "USD"
      //         }
      //       },
      //       "maximalPrice": {
      //         "amount": {
      //           "value": 3,
      //           "currency": "USD"
      //         }
      //       },
      //       "regularPrice": {
      //         "amount": {
      //           "value": 3,
      //           "currency": "USD"
      //         }
      //       }
      //     },
      //     "downloadable_product_links": [
      //       {
      //         "id": 5,
      //         "title": "Life lessons from Henry Ford",
      //         "sample_url": "https://audioclasss.fra1.cdn.digitaloceanspaces.com/easy1.mp3"
      //       },
      //       // {
      //       //   "id": 6,
      //       //   "title": "part2",
      //       //   "sample_url": null
      //       // },
      //       // {
      //       //   "id": 7,
      //       //   "title": "part3",
      //       //   "sample_url": null
      //       // },
      //       // {
      //       //   "id": 8,
      //       //   "title": "part4",
      //       //   "sample_url": null
      //       // }
      //     ]
      //   };
      //   setProductData(obj);
      //   break;
      // }
      case "Building Relationships in Sales":{
        const obj: any = {
          "id": 2043,
          "sku": "Building Relationships in Sales",
          "name": "Building Relationships in Sales",
          "small_image": "/h/a/hands.jpg",
          "meta_title": "No Author",
          "description": "<p>This lesson is focused on the importance of establishing strong and lasting relationships with business partners, customers, and other stakeholders. Throughout this lesson, participants will learn key strategies for building and maintaining effective business relationships, including effective communication, active listening, empathy, and trust building.</p>\r\n<p>Also, you will explore the benefits of investing time and resources into building strong business relationships, including increased loyalty, enhanced collaboration, and improved productivity. Additionally, the lesson will cover techniques for managing and resolving conflicts that may arise in business relationships, as well as best practices for building and maintaining long-term partnerships.</p>",
          "media_gallery_entries": [
            {
              "disabled": false,
              "label": null,
              "position": 1,
              "file": "/h/a/hands.jpg"
            }
          ],
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
          "downloadable_product_links": [
            {
              "id": 9,
              "title": "Building Relationships in Sales",
              "sample_url": "https://audioclasss.fra1.cdn.digitaloceanspaces.com/building-relationships-in-sales.wav"
            },
            // {
            //   "id": 10,
            //   "title": "part2",
            //   "sample_url": "https://audioclasss.fra1.cdn.digitaloceanspaces.com/Building%20Relationships%20in%20Sales2.wav"
            // },
            // {
            //   "id": 11,
            //   "title": "part3",
            //   "sample_url": null
            // },
            // {
            //   "id": 12,
            //   "title": "part4",
            //   "sample_url": null
            // }
          ]
        };
        setProductData(obj);
        break;
      }
      case "Cold calling":{
        const obj: any = {
          "id": 2046,
          "sku": "Cold calling",
          "name": "The Flaws of Traditional Cold Calling and the Evolution of Selling Practices",
          "small_image": "/c/o/cold.jpg",
          "meta_title": "No Author",
          "description": "The course teaches a new sales strategy, replacing traditional cold calling with engaging conversations about buyer needs. It emphasizes relationship-building, effective pitching, networking, social media, and team management. It also covers empathy for customers, hiring, training, motivation, goal-setting, and compensation.",
          "media_gallery_entries": [
            {
              "disabled": false,
              "label": null,
              "position": 1,
              "file": "/c/o/cold.jpg"
            }
          ],
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
          "downloadable_product_links": [
            {
              "id": 21,
              "title": "The Flaws of Traditional Cold Calling and the Evolution of Selling Practices",
              "sample_url": "https://audioclasss.fra1.cdn.digitaloceanspaces.com/Cold%20Calling.wav"
            },
            // {
            //   "id": 22,
            //   "title": "part2",
            //   "sample_url": null
            // },
            // {
            //   "id": 23,
            //   "title": "part3",
            //   "sample_url": null
            // },
            // {
            //   "id": 24,
            //   "title": "part4",
            //   "sample_url": null
            // }
          ]
        };
        setProductData(obj);
        break;
      }
      case "HomeSchooling in USA":{
        const obj: any = {
          "id": 2045,
          "sku": "HomeSchooling in USA",
          "name": "HomeSchooling in USA",
          "small_image": "/e/d/education.jpg",
          "meta_title": "No Author",
          "description": "<p>Homeschooling and apprenticeships offer personalized education and practical skills, but may lack structure and socialization. Traditional schooling provides a comprehensive education with socialization opportunities, but may not meet individual needs. The choice depends on personal circumstances and goals.</p>",
          "media_gallery_entries": [
            {
              "disabled": false,
              "label": null,
              "position": 3,
              "file": "/e/d/education.jpg"
            }
          ],
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
          "downloadable_product_links": [
            {
              "id": 17,
              "title": "HomeSchooling in USA",
              "sample_url": "https://audioclasss.fra1.cdn.digitaloceanspaces.com/HomeSchooling%20in%20USA.wav"
            },
            // {
            //   "id": 18,
            //   "title": "part2",
            //   "sample_url": null
            // },
            // {
            //   "id": 19,
            //   "title": "part3",
            //   "sample_url": null
            // },
            // {
            //   "id": 20,
            //   "title": "part4",
            //   "sample_url": null
            // }
          ]
        };
        setProductData(obj);
        break;
      }
      case "NPCP1-FREE":{
        const obj: any = {
          "id": 2041,
          "sku": "NPCP1-FREE",
          "name": "Napoleon - Coming to power(FREE)",
          "small_image": "/n/a/napoleon_4.jpg",
          "meta_title": "No Author",
          "description": "<p>Born on the island of Corsica, Napoleon rapidly rose through the ranks of the military during the French Revolution (1789-1799). After seizing political power in France in a 1799 coup d'état, he crowned himself emperor in 1804.</p>",
          "media_gallery_entries": [
            {
              "disabled": false,
              "label": null,
              "position": 1,
              "file": "/n/a/napoleon_4.jpg"
            },
            {
              "disabled": false,
              "label": null,
              "position": 2,
              "file": "/n/a/napoleon1.jpg"
            }
          ],
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
          "downloadable_product_links": [
            {
              "id": 1,
              "title": "Napoleon - Coming to Power",
              "sample_url": "https://audioclasss.fra1.cdn.digitaloceanspaces.com/Napoleon.wav"
            }
            // {
            //   "id": 2,
            //   "title": "part2",
            //   "sample_url": "https://audioclasss.fra1.cdn.digitaloceanspaces.com/easy2.mp3"
            // },
            // {
            //   "id": 3,
            //   "title": "part3",
            //   "sample_url": "https://audioclasss.fra1.cdn.digitaloceanspaces.com/easy3.mp3"
            // },
            // {
            //   "id": 4,
            //   "title": "part4",
            //   "sample_url": "https://audioclasss.fra1.cdn.digitaloceanspaces.com/awaken1.mp3"
            // }
          ]
        };
        setProductData(obj);
        break;
      }
      case "Common mistakes of new investor":{
        const obj: any = {
          "id": 2044,
          "sku": "Common mistakes of new investor",
          "name": "Common mistakes of new investor",
          "small_image": "/m/o/money.jpg",
          "meta_title": "No Author",
          "description": "<p>This audio lesson explores the common mistakes made by new investors and provides tips on how to avoid them. Topics covered include the importance of doing research, avoiding emotional decision-making, diversifying investments, and having a long-term investment strategy.</p>",
          "media_gallery_entries": [
            {
              "disabled": false,
              "label": null,
              "position": 1,
              "file": "/m/o/money.jpg"
            }
          ],
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
          "downloadable_product_links": [
            {
              "id": 13,
              "title": "Common mistakes of new investor",
              "sample_url": "https://audioclasss.fra1.cdn.digitaloceanspaces.com/Common%20mistakes%20of%20new%20investors.wav"
            },
            // {
            //   "id": 14,
            //   "title": "part2",
            //   "sample_url": null
            // },
            // {
            //   "id": 15,
            //   "title": "part3",
            //   "sample_url": null
            // },
            // {
            //   "id": 16,
            //   "title": "part4",
            //   "sample_url": null
            // }
          ]
        };
        setProductData(obj);
        break;
      }
    }
  }, []);

  const checkUserMembership = async () => {
    try{
      const purchaserInfo = await Purchases.getCustomerInfo();
      console.log(purchaserInfo);
      if(typeof purchaserInfo.entitlements.active.pro == 'undefined'){
        setPremium(false)
      } else {
        setPremium(true)
      }
    } catch(error){
      console.log(error);
    }
  }

  const onPlayPress = (item) => {
    if(premium || item?.sku.endsWith("-FREE")){
      navigation.push(routes.NAVIGATION_AUDIO_PLAYER, {
        file: item?.downloadable_product_links[0].sample_url,
        id: item?.downloadable_product_links[0].id,
        title: item?.downloadable_product_links[0].title,
        artist: item?.meta_title,
        artwork: mediaUrl.concat(item?.small_image),
      });
    } else {
      navigation.push(routes.NAVIGATION_PAWYALL_ROUTE, {
        title: "",
        initial: false,
      });
    }
  };

  // useEffect(() => {
  //   getProductDetails();
  // }, []);

  // if (loading) {
  //   return (
  //     <View flex center>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <ScrollView>
    <View flex>
      <MediaGallery items={productData?.media_gallery_entries ?? []} />
      <Text style={styles.title}>
        {productData?.name}
      </Text>
      {/* <Text text70 center black30> */}
        {/* `${priceRange.minimum_price.final_price.currency} ${priceRange.minimum_price.final_price.value}` */}
        {/* {priceStringFromPriceRange(productData?.price)} */}
      {/* </Text> */}
      {!!productData && (
        <View paddingH-15>
          {/* <Text>
            {productData?.description}
          </Text> */}
          <Html
            baseStyle={{ fontSize: 15, color: 'black' }}
            source={{ html: productData?.description }}
            contentWidth={Constants.screenWidth}
            classesStyles={{ smallRedFont: { fontSize: 10, color: 'red' } }}   
          />
        </View>
      )}
      <View center>
        <TouchableOpacity style={styles.btn} onPress={() => onPlayPress(productData)}>
          <Text style={styles.text}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  btn: {
    backgroundColor: '#3d5a80',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    width: 160,
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  title: {
    color: 'black',
    textAlign: 'center',
    marginTop: 15,
  }
});
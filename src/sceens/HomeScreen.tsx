import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {Button, Text, View, StyleSheet, FlatList, Pressable} from 'react-native';
import * as routes from '../navigation/routes';
import Purchases from 'react-native-purchases';

// import {styles} from './styles';
import {useAuth} from '../navigation/auth';
import { ProductListItem } from '../components/products/ProductListItem';
import { useCategoryProducts } from '../logic/products/useCategoryProducts';
import { ProductType } from '../apollo/queries/getCategoryProducts';
import { Spacings } from 'react-native-markup-kit';
import analytics from '@react-native-firebase/analytics';


export const HomeScreen = () => {
  const navigation = useNavigation();
  const [subscribed, setSubscribed] = useState(false);
  const [products, setProducts] = useState();
  // const { loading, products, loadMore, refreshing, refresh } = useCategoryProducts({
  //   categoryId: 48,
  // });

  useEffect(()=>{
    checkUserMembership();
    Purchases.addCustomerInfoUpdateListener(info => {
      console.log('shemovida Home addCustomerInfoUpdateListenershi');
      checkUserMembership();
    });
    const obj: any = [{
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
    }];
    setProducts(obj);
  }, [])

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductType,
    index: number,
  }) => {
    return <ProductListItem item={item} index={index} onPress={onProductItemPress} />;
  };

  const checkUserMembership = async () => {
    try{
      const purchaserInfo = await Purchases.getCustomerInfo();
      if(typeof purchaserInfo.entitlements.active.pro != 'undefined'){
        console.log('subscribedtrue');
        setSubscribed(true)
      } else{
        console.log('subscribedfalse');
        setSubscribed(false)
      }
    } catch(error){
      console.log(error);
    }
  }

  const fetchOfferings = () => {
    navigation.push(routes.NAVIGATION_PAWYALL_ROUTE, {
      title: "",
      initial: false,
    });
  };
  

  const onProductItemPress = (item: ProductType) => {
    navigation.push(routes.NAVIGATION_PRODUCT_DETAILS_ROUTE, {
      title: item.name,
      sku: item.sku,
    });
  };

  return (
    <View style={style.container}>
      <Text style={style.title}> Sample course: </Text>
      {/* <ProductListItem item={firstProduct} index={0} onPress={onProductItemPress} /> */}
      <FlatList
        style={{ maxHeight: 320}}
        numColumns={1}
        // contentContainerStyle={{flexWrap : "wrap"}} 
        // contentContainerStyle={{
        //   paddingVertical: Spacings.s2,
        //   marginHorizontal: Spacings.s2,
        // }}
        data={products}
        keyExtractor={(item) => `productItem${item.id.toString()}`}
        renderItem={renderItem}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        // }
        // onEndReached={loadMore}
        // ListFooterComponent={footerComponent}
      />
      {subscribed ? null : 
      <Pressable style={style.button} onPress={fetchOfferings}>
        <Text style={style.text}>Subscribe</Text>
      </Pressable>
       }
    </View>
  );
};

const style = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#3d5a80',
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      color: 'white' 
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#FFF7D6',
      margin: 20
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
    },
  });
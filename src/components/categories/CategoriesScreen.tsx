/**
 * @flow
 */
import React, {useEffect} from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, ListRenderItemInfo } from 'react-native';
import { Text, View } from 'react-native-markup-kit';
import { useCategories } from '../../logic/categories/useCategories';
import type { CategoryType } from '../../apollo/queries/getCategory';
import { useNavigation, useRoute } from '@react-navigation/core';
import * as routes from '../../navigation/routes';
import { CategoryListItem } from './CategoryListItem';
import { useCategoryColors } from '../../logic/categories/useCategoryColors';
import {
  CategoriesScreenRouteProp,
  CategoriesScreenNavigationProp,
} from '../../navigation/Navigation';

type CategoriesScreenProps = {
  route: CategoriesScreenRouteProp;
  navigation: CategoriesScreenNavigationProp;
};

export const CategoriesScreen = ({ route, navigation }: CategoriesScreenProps) => {
  const { getCategoryColorByIndex } = useCategoryColors();
    // const route = useRoute();
    // const navigation = useNavigation();
    const { getCategories, categories, loading } = useCategories({
        categoryId: route?.params?.categoryId ?? 2,
      });

    // useEffect(()=>{
    //     getCategories();
    // }, [getCategories])

    const onCategoryItemPress = (item: CategoryType) => {
        // navigation.push(routes.NAVIGATION_CATEGORIES_ROUTE, {
        //   categoryId: item.id,
        //   title: item.name,
        // });
        if (item.product_count > 0) {
          navigation.push(routes.NAVIGATION_PRODUCTS_ROUTE, {
            categoryId: item.id,
            title: item.name,
          });
        } else if (item.children_count > 0) {
          navigation.push(routes.NAVIGATION_CATEGORIES_ROUTE, {
            categoryId: item.id,
            title: item.name,
          });
          
        }
      };

    if (loading) {
    return (
        <View flex center>
            <ActivityIndicator size="large" />
        </View> 
    );
    }

    const renderItem = ({ item, index }: ListRenderItemInfo<CategoryType>)  => {
      // <CategoryListItem
      //   item={item}
      //   onPress={onCategoryItemPress}
      //   color={getCategoryColorByIndex(index)}
      // />
      const disabled = false;
      return (
        <TouchableOpacity onPress={() => onCategoryItemPress(item)} disabled={disabled}>
          <View center height={80} bg-grey50={!disabled} bg-grey40={disabled} marginH-15 marginB-15 br40>
            <Text style={{color: 'black'}}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
      };

    return (
        <View flex paddingT-15>
            <FlatList
                contentContainerStyle={{ paddingTop: 15 }}
                data={categories}
                keyExtractor={(item) => (`categoryItem${item.id.toString()}`)}
                renderItem={renderItem}
                refreshControl={
                  <RefreshControl refreshing={loading} onRefresh={getCategories} />
                }
            />
        </View>
    );
}
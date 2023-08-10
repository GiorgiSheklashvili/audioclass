//@flow
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Text, View } from 'react-native-markup-kit';
import type { CategoryType } from '../../apollo/queries/getCategory';
import { TouchableScale } from '../common/TouchableScale';
// import { AnimatedAppearance } from '../common/AnimatedAppearance';

type Props = {
  item: CategoryType,
  onPress(item: CategoryType): void,
  color: string,
  index: number,
};

const ITEM_HEIGHT = 80;

export const CategoryListItem = ({ item, onPress, color }: Props) => {
  const [disabled] = useState(item.children_count < 1 && item.product_count < 1);
  const renderText = () => (
    <View flex center>
      <Text text50L>{item.name}</Text>
    </View>
  );

  const renderContent = () => {
      return (
        <>
          {renderText()}
        </>
      );
  };


  return (
    // <AnimatedAppearance index={index}>
      <TouchableScale
        onPress={() => onPress(item)}
        disabled={disabled}
        scaleTo={0.97}>
        <View
          center
          row
          height={ITEM_HEIGHT}
          backgroundColor={color}
          marginH-15
          marginB-15
          shadow70
          br40>
          {renderContent()}
        </View>
      </TouchableScale>
    // </AnimatedAppearance>
  );
};
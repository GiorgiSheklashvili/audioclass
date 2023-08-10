/**
 * @flow
 */
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View, Text, Constants, Spacings } from 'react-native-markup-kit';
import type { ProductType } from '../../apollo/queries/getCategoryProducts';
import { TouchableScale } from '../common/TouchableScale';
// import { AnimatedAppearance } from '../common/AnimatedAppearance';
import { priceStringFromPriceRange } from '../../logic/util/price';
import { mediaUrl } from '../../logic/util/constants';

type Props = {
  item: ProductType,
  index: number,
  onPress(item: ProductType): void,
};

const COLUMN_SIZE = Constants.screenWidth / 2 - Spacings.s2 * 3;

export const ProductListItem = ({ item, index, onPress }: Props) => {
  return (
    // <AnimatedAppearance index={index}>
      <TouchableScale onPress={() => {onPress(item)}} scaleTo={0.97} disabled={false}>
        <View
          flex
          bg-white
          br40
          margin-s2
          shadow70
          style={{ width: COLUMN_SIZE }}>
          <View style={[styles.image, styles.imageWrap]} br40>
            <Image
              source={{ uri: mediaUrl.concat(item.small_image) }}
              style={styles.image}
            />
          </View>
          <Text style={styles.text} margin-5>
            {item.name}
          </Text>
          {/* <Text center marginB-5>
            {priceStringFromPriceRange(item.price_range)}
          </Text> */}
        </View>
       </TouchableScale>
    // </AnimatedAppearance>
  );
};

const styles = StyleSheet.create({
  image: {
    width: COLUMN_SIZE,
    height: (COLUMN_SIZE / 3) * 4,
  },
  imageWrap: {
    overflow: 'hidden',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    margin: 5,
  }
});
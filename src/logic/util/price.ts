/**
 * @flow
 */
import type { PriceRange } from '../../apollo/queries/getCategoryProducts';

export const priceStringFromPriceRange = (priceRange?: PriceRange) => {
  if (priceRange) {
    return `${priceRange.minimalPrice.amount.currency} ${priceRange.minimalPrice.amount.value}`;
  }

  return '';
};
/**
 * @flow
*/
import { gql } from '@apollo/client';

export const MEDIA_GALLERY_FRAGMENT = gql`
  fragment MediaGallery on ProductInterface {
    media_gallery_entries {
      disabled
      label
      position
      file
    }
  }
`;

export type MediaGalleryItemType = {
  disabled: boolean,
  label: string,
  position: number,
  file: string,
};
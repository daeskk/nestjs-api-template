const DICEBEAR_BASE_SHAPE_URI = 'https://api.dicebear.com/7.x/shapes';
const DICEBEAR_BASE_PIXEL_ART_URI = 'https://api.dicebear.com/9.x/pixel-art';

export const generateShapeAvatarUri = (slug: string) => {
  return DICEBEAR_BASE_SHAPE_URI + '/svg?seed=' + slug;
};

export const generatePixelArtAvatarUri = (slug: string) => {
  return DICEBEAR_BASE_PIXEL_ART_URI + '/svg?seed=' + slug;
};

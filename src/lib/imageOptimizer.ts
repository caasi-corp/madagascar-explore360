
/**
 * Utilitaire pour l'optimisation des images
 */

// Constants for image optimization
const DEFAULT_QUALITY = 80;
const DEFAULT_WIDTH = 800;
const DEFAULT_THUMBNAIL_WIDTH = 20;
const DEFAULT_BLUR_AMOUNT = 10;

/**
 * Optimizes image URLs by adding parameters for size, quality, and format
 * @param url - The original image URL
 * @param width - The desired width of the image
 * @param quality - The quality setting (0-100)
 * @returns Optimized image URL
 */
export const optimizeImageUrl = (url: string, width = DEFAULT_WIDTH, quality = DEFAULT_QUALITY): string => {
  if (!url) return '';
  
  // For Unsplash images, add optimization parameters
  if (url.includes('unsplash.com')) {
    return `${url}?w=${width}&q=${quality}&auto=format&fit=crop`;
  }
  
  // For other sources, return the original URL
  return url;
};

/**
 * Creates a tiny thumbnail URL for progressive loading
 * @param url - The original image URL
 * @returns Thumbnail URL for progressive loading
 */
export const getImageThumbnail = (url: string): string => {
  if (!url) return '';
  
  if (url.includes('unsplash.com')) {
    return `${url}?w=${DEFAULT_THUMBNAIL_WIDTH}&blur=${DEFAULT_BLUR_AMOUNT}&q=30`;
  }
  return url;
};

/**
 * Creates a placeholder URL when no image is available
 */
export const getPlaceholder = (): string => {
  return '/placeholder.svg';
};

/**
 * Formats image props for progressive loading
 * @param url - The image URL
 * @param alt - Alt text for the image
 * @param width - The desired width
 * @returns Object with image properties
 */
export const getImageProps = (url: string, alt: string = '', width = DEFAULT_WIDTH) => {
  if (!url) return { src: getPlaceholder(), alt, loading: "lazy" as const };
  
  return {
    src: optimizeImageUrl(url, width),
    alt,
    loading: "lazy" as const,
    decoding: "async" as const,
    fetchPriority: width > 400 ? "high" : "auto",
    className: "image-progressive-loading",
  };
};

/**
 * Pre-computes image URLs for different sizes for responsive images
 * @param url - The original image URL
 * @returns Object containing different sized image URLs
 */
export const getResponsiveImageUrls = (url: string) => {
  if (!url) return { small: '', medium: '', large: '', thumbnail: '' };
  
  return {
    small: optimizeImageUrl(url, 400, 70),
    medium: optimizeImageUrl(url, 800, 80),
    large: optimizeImageUrl(url, 1200, 85),
    thumbnail: getImageThumbnail(url),
  };
};

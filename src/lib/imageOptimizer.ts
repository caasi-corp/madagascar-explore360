
/**
 * Utilitaire amélioré pour l'optimisation des images
 */

// Constants for image optimization
const DEFAULT_QUALITY = 80;
const DEFAULT_WIDTH = 800;
const DEFAULT_THUMBNAIL_WIDTH = 20;
const DEFAULT_BLUR_AMOUNT = 10;
const IMAGE_PLACEHOLDER = '/placeholder.svg';

// Type for supported image formats
type ImageFormat = 'webp' | 'avif' | 'jpeg' | 'png' | 'auto';

/**
 * Checks if the browser supports a specific image format
 */
const supportsFormat = (format: ImageFormat): boolean => {
  if (typeof document === 'undefined') return false;
  
  const formats = {
    webp: 'image/webp',
    avif: 'image/avif',
    jpeg: 'image/jpeg',
    png: 'image/png'
  };
  
  if (format === 'auto') return true;
  
  const canvas = document.createElement('canvas');
  if (!canvas || typeof canvas.toDataURL !== 'function') return false;
  
  return canvas.toDataURL(formats[format]).indexOf(`data:${formats[format]}`) === 0;
};

// Choose best format based on browser support
const getBestFormat = (): ImageFormat => {
  if (supportsFormat('avif')) return 'avif';
  if (supportsFormat('webp')) return 'webp';
  return 'jpeg';
};

/**
 * Optimizes image URLs by adding parameters for size, quality, and format
 * @param url - The original image URL
 * @param width - The desired width of the image
 * @param quality - The quality setting (0-100)
 * @param format - The image format (webp, avif, jpeg, png, auto)
 * @returns Optimized image URL
 */
export const optimizeImageUrl = (
  url: string, 
  width = DEFAULT_WIDTH, 
  quality = DEFAULT_QUALITY,
  format: ImageFormat = 'auto'
): string => {
  if (!url) return IMAGE_PLACEHOLDER;
  
  // For Unsplash images, add optimization parameters
  if (url.includes('unsplash.com')) {
    const bestFormat = format === 'auto' ? getBestFormat() : format;
    
    // Important - Fix: Remove any existing URL parameters before adding new ones
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=${width}&q=${quality}&fm=${bestFormat}&fit=crop`;
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
  if (!url) return IMAGE_PLACEHOLDER;
  
  if (url.includes('unsplash.com')) {
    // Fix: Remove any existing URL parameters before adding new ones
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=${DEFAULT_THUMBNAIL_WIDTH}&blur=${DEFAULT_BLUR_AMOUNT}&q=30`;
  }
  return url;
};

/**
 * Creates a placeholder URL when no image is available
 */
export const getPlaceholder = (): string => {
  return IMAGE_PLACEHOLDER;
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
    width,
    height: "auto",
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

/**
 * Generate srcset attribute for responsive images
 * @param url - The original image URL
 * @param sizes - Array of widths to generate
 * @returns srcset attribute string
 */
export const generateSrcSet = (url: string, sizes: number[] = [400, 800, 1200]): string => {
  if (!url) return '';
  
  // Fix: Remove any existing URL parameters before adding new ones
  const baseUrl = url.split('?')[0];
  
  return sizes
    .map(size => `${optimizeImageUrl(baseUrl, size)} ${size}w`)
    .join(', ');
};

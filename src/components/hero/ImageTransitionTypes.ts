
/**
 * Props for the useImageTransition hook
 */
export interface UseImageTransitionProps {
  /**
   * Array of image URLs to transition between
   */
  images: string[];
  
  /**
   * Time interval in milliseconds between transitions
   * @default 10000
   */
  transitionInterval?: number;
}

/**
 * State interface for image transition
 */
export interface ImageTransitionState {
  /**
   * Index of the currently displayed image
   */
  currentImageIndex: number;
  
  /**
   * Index of the previously displayed image
   */
  previousImageIndex: number;
  
  /**
   * Current transition effect name
   */
  currentEffect: string;
  
  /**
   * Whether a transition is currently in progress
   */
  isTransitioning: boolean;
}

/**
 * Return type of the useImageTransition hook
 */
export interface ImageTransitionResult extends ImageTransitionState {
  /**
   * Function to manually change the displayed image
   */
  changeImage: (newIndex: number) => void;
}

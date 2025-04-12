
/**
 * Props interface for the Hero component
 */
export interface HeroProps {
  /**
   * Main title displayed in the hero section
   * @default "Excursions personnalisées dans le nord de Madagascar"
   */
  title?: string;
  
  /**
   * Subtitle text displayed below the main title
   * @default "Vivez l'expérience d'une biodiversité unique et de paysages à couper le souffle avec nos guides locaux experts"
   */
  subtitle?: string;
  
  /**
   * Whether to show the search component
   * @default true
   */
  showSearch?: boolean;
  
  /**
   * Optional background image URL to override the carousel
   */
  backgroundImage?: string;
  
  /**
   * Height of the hero section
   * @default "h-screen"
   */
  height?: string;
  
  /**
   * Page identifier for banner selection
   * @default "home"
   */
  page?: string;
}

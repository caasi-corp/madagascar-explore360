
export interface HeroContentProps {
  title: string;
  subtitle: string;
  cta: {
    primary: {
      text: string;
      link: string;
    };
    secondary: {
      text: string;
      link: string;
    };
  };
  images: string[];
}

export const heroContent: HeroContentProps = {
  title: "Explorez Madagascar comme Jamais Auparavant",
  subtitle: "Découvrez la magie de la Grande Île avec des expériences authentiques et des aventures inoubliables",
  cta: {
    primary: {
      text: "Explorer Nos Circuits",
      link: "/tours"
    },
    secondary: {
      text: "Contactez-Nous",
      link: "/contact"
    }
  },
  images: [
    "/lovable-uploads/f8c8f079-7776-45ac-a077-6570cfbb7fcf.png",
    "/placeholder.svg",
    "/placeholder.svg"
  ]
};

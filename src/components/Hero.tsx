
import React from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HeroProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  backgroundImage?: string;
  height?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "Discover Madagascar's Hidden Treasures",
  subtitle = "Experience the unique biodiversity and breathtaking landscapes with our expert local guides",
  showSearch = true,
  backgroundImage = "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
  height = "h-screen"
}) => {
  return (
    <div 
      className={`relative ${height} flex items-center`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 z-10 text-center md:text-left">
        <h1 
          className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 max-w-3xl animate-fade-in"
        >
          {title}
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-8 animation-delay-300 animate-fade-in">
          {subtitle}
        </p>
        
        {showSearch && (
          <div className="bg-white/90 dark:bg-madagascar-blue/90 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg max-w-4xl mx-auto md:mx-0 animation-delay-600 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-madagascar-green" size={18} />
                <Input 
                  placeholder="Where to?" 
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-madagascar-green" size={18} />
                <Select>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coming-week">Coming week</SelectItem>
                    <SelectItem value="next-month">Next month</SelectItem>
                    <SelectItem value="custom">Custom date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-madagascar-green" size={18} />
                <Select>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 People</SelectItem>
                    <SelectItem value="3+">3+ People</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-madagascar-green hover:bg-madagascar-green/80 text-white h-10">
                <Search className="mr-2" size={18} />
                Search
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;

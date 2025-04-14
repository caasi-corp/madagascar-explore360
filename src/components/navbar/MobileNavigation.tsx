
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, ChevronRight } from 'lucide-react';
import AuthStatus from './AuthStatus';

interface MobileNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onToggle }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onToggle}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex justify-end pt-4 md:hidden">
          <AuthStatus />
        </div>
        
        <nav className="flex flex-col gap-4 mt-8">
          <SheetClose asChild>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-muted/80 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              Accueil
              <ChevronRight className="h-4 w-4" />
            </NavLink>
          </SheetClose>

          <div className="px-4 py-2 text-sm font-medium text-muted-foreground">Circuits</div>
          <SheetClose asChild>
            <NavLink
              to="/tours"
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors pl-6 ${
                  isActive
                    ? 'bg-muted/80 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              Tous les circuits
              <ChevronRight className="h-4 w-4" />
            </NavLink>
          </SheetClose>
          <SheetClose asChild>
            <NavLink
              to="/tours?region=north"
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors pl-6 ${
                  isActive
                    ? 'bg-muted/80 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              Nord
              <ChevronRight className="h-4 w-4" />
            </NavLink>
          </SheetClose>
          <SheetClose asChild>
            <NavLink
              to="/tours?region=south"
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors pl-6 ${
                  isActive
                    ? 'bg-muted/80 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              Sud
              <ChevronRight className="h-4 w-4" />
            </NavLink>
          </SheetClose>
          <SheetClose asChild>
            <NavLink
              to="/tours?region=east"
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors pl-6 ${
                  isActive
                    ? 'bg-muted/80 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              Est
              <ChevronRight className="h-4 w-4" />
            </NavLink>
          </SheetClose>
          <SheetClose asChild>
            <NavLink
              to="/tours?region=west"
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors pl-6 ${
                  isActive
                    ? 'bg-muted/80 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              Ouest
              <ChevronRight className="h-4 w-4" />
            </NavLink>
          </SheetClose>

          <div className="px-4 py-2 text-sm font-medium text-muted-foreground">Services</div>
          <SheetClose asChild>
            <NavLink
              to="/car-rental"
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors pl-6 ${
                  isActive
                    ? 'bg-muted/80 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              Location de voitures
              <ChevronRight className="h-4 w-4" />
            </NavLink>
          </SheetClose>
          <SheetClose asChild>
            <NavLink
              to="/catamaran-cruise"
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors pl-6 ${
                  isActive
                    ? 'bg-muted/80 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              Croisières en catamaran
              <ChevronRight className="h-4 w-4" />
            </NavLink>
          </SheetClose>
          <SheetClose asChild>
            <NavLink
              to="/hotels"
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors pl-6 ${
                  isActive
                    ? 'bg-muted/80 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              Réservation d'hôtels
              <ChevronRight className="h-4 w-4" />
            </NavLink>
          </SheetClose>
          <SheetClose asChild>
            <NavLink
              to="/flights"
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors pl-6 ${
                  isActive
                    ? 'bg-muted/80 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              Vols
              <ChevronRight className="h-4 w-4" />
            </NavLink>
          </SheetClose>

          <SheetClose asChild>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-muted/80 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              À propos
              <ChevronRight className="h-4 w-4" />
            </NavLink>
          </SheetClose>

          <SheetClose asChild>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-muted/80 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              Contact
              <ChevronRight className="h-4 w-4" />
            </NavLink>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;


import React from 'react';
import MobileNavLink from './MobileNavLink';

interface NavItem {
  title: string;
  path: string;
}

interface MobileNavSectionProps {
  title: string;
  items: NavItem[];
}

const MobileNavSection: React.FC<MobileNavSectionProps> = ({ title, items }) => {
  return (
    <>
      <div className="px-4 py-2 text-sm font-medium text-muted-foreground">{title}</div>
      {items.map((item, index) => (
        <MobileNavLink key={index} to={item.path} indented={true}>
          {item.title}
        </MobileNavLink>
      ))}
    </>
  );
};

export default MobileNavSection;

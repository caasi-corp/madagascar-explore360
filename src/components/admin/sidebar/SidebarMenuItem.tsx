
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import {
  SidebarMenuItem as BaseSidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';

type SubMenuItem = {
  title: string;
  path: string;
};

type SidebarMenuItemProps = {
  icon: React.ReactNode;
  title: string;
  path: string;
  isActive: boolean;
  hasActiveChild?: boolean;
  children?: SubMenuItem[];
};

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  icon,
  title,
  path,
  isActive,
  hasActiveChild,
  children,
}) => {
  return (
    <BaseSidebarMenuItem>
      {children ? (
        <>
          <SidebarMenuButton
            tooltip={title}
            isActive={hasActiveChild}
            className="hover:bg-northgascar-teal/10 data-[active=true]:bg-northgascar-teal/20"
          >
            {icon}
            <span>{title}</span>
            <ChevronRight className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </SidebarMenuButton>
          <SidebarMenuSub>
            {children.map((child, idx) => (
              <SidebarMenuSubItem key={idx}>
                <SidebarMenuSubButton
                  asChild
                  isActive={child.path === location.pathname}
                >
                  <Link to={child.path}>{child.title}</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </>
      ) : (
        <SidebarMenuButton
          asChild
          tooltip={title}
          isActive={isActive}
          className="hover:bg-northgascar-teal/10 data-[active=true]:bg-northgascar-teal/20"
        >
          <Link to={path}>
            {icon}
            <span>{title}</span>
          </Link>
        </SidebarMenuButton>
      )}
    </BaseSidebarMenuItem>
  );
};

export default SidebarMenuItem;

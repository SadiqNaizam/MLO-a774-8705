import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input'; // Example: for a search bar in sidebar
import { Search } from 'lucide-react';

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (query: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  className,
  showSearch = false,
  searchPlaceholder = "Search...",
  onSearchChange
}) => {
  console.log("Rendering Sidebar");

  return (
    <aside className={`bg-background border-r h-full flex flex-col ${className || 'w-72 md:w-80'}`}>
      {showSearch && (
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              className="pl-8 w-full"
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        </div>
      )}
      <ScrollArea className="flex-1">
        <div className="p-2 md:p-4 space-y-1">
          {children}
        </div>
      </ScrollArea>
      {/* Optional Footer for Sidebar */}
      {/* <div className="p-4 border-t">
        <p className="text-xs text-muted-foreground">Sidebar Footer</p>
      </div> */}
    </aside>
  );
};

export default Sidebar;
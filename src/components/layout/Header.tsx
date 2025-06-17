import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MoreVertical } from 'lucide-react'; // Example icons

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
  children?: React.ReactNode; // For additional controls or elements
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton, onBackButtonClick, children }) => {
  console.log("Rendering Header with title:", title);

  return (
    <header className="bg-background border-b sticky top-0 z-50 flex items-center justify-between h-16 px-4">
      <div className="flex items-center gap-2">
        {showBackButton && (
          <Button variant="ghost" size="icon" onClick={onBackButtonClick} aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        {title && <h1 className="text-lg font-semibold truncate">{title}</h1>}
      </div>
      <div className="flex items-center gap-2">
        {children}
        {/* Example: More options button */}
        {/* <Button variant="ghost" size="icon" aria-label="More options">
          <MoreVertical className="h-5 w-5" />
        </Button> */}
      </div>
    </header>
  );
};

export default Header;
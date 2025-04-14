
import React from 'react';
import AuthStatus from '../AuthStatus';

const MobileNavHeader: React.FC = () => {
  return (
    <div className="flex justify-end pt-4 md:hidden">
      <AuthStatus />
    </div>
  );
};

export default MobileNavHeader;

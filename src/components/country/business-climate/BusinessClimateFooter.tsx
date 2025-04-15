
import React from 'react';

interface BusinessClimateFooterProps {
  lastUpdate: string | undefined;
}

const BusinessClimateFooter = ({ lastUpdate }: BusinessClimateFooterProps) => {
  return (
    <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
      <span>
        Dernière mise à jour: {
          lastUpdate 
            ? new Date(lastUpdate).toLocaleDateString()
            : (new Date()).toLocaleDateString() + ' (Données simulées)'
        }
      </span>
      <span className="text-xs text-muted-foreground">
        Sources: Banque Mondiale, Trading Economics, Doing Business, Données locales
      </span>
    </div>
  );
};

export default BusinessClimateFooter;

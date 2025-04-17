
// Export des fonctionnalités des services financiers
// Ce fichier sert de point d'entrée pour tous les services financiers

import { FinancialIndicators } from './financial/types';
import { getDefaultFinancialData } from './financial/defaultData';
import { updateCountryFinancialData } from './financial/updateService';
import { startFinancialDataUpdates } from './financial/realtimeUpdates';

export {
  FinancialIndicators,
  getDefaultFinancialData,
  updateCountryFinancialData,
  startFinancialDataUpdates
};

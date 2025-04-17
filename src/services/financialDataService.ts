
// Export des fonctionnalités des services financiers
// Ce fichier sert de point d'entrée pour tous les services financiers

import type { FinancialIndicators } from './financial/types';
import { getDefaultFinancialData } from './financial/defaultData';
import { updateCountryFinancialData } from './financial/updateService';
import { startFinancialDataUpdates } from './financial/realtimeUpdates';

export {
  getDefaultFinancialData,
  updateCountryFinancialData,
  startFinancialDataUpdates
};

export type { FinancialIndicators };

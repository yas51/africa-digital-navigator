
// Fonction pour récupérer les données de la Banque Mondiale
export const fetchWorldBankData = async (countryCode: string) => {
  try {
    // Indicateurs : PIB, Population, etc.
    const indicators = 'NY.GDP.MKTP.CD,SP.POP.TOTL,NY.GDP.PCAP.KD.ZG';
    const response = await fetch(
      `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicators}?format=json&per_page=3&date=2023`
    );
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données de la Banque Mondiale');
    }
    
    const data = await response.json();
    return data[1] || [];
  } catch (error) {
    console.error('Erreur World Bank API:', error);
    return [];
  }
};

// Fonction pour récupérer les données de l'ONU
export const fetchUNData = async (countryCode: string) => {
  try {
    const response = await fetch(
      `https://population.un.org/dataportalapi/api/v1/data/indicators/49/locations/${countryCode}/start/2023/end/2023`
    );
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données de l\'ONU');
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erreur UN API:', error);
    return [];
  }
};


export const getDefaultValue = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getScoreLabel = (score: number | undefined): string => {
  if (score === undefined || score === null) return "Non disponible";
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Très bon";
  if (score >= 50) return "Bon";
  if (score >= 35) return "Moyen";
  return "À améliorer";
};

export const getScoreColor = (score: number | undefined): string => {
  if (score === undefined || score === null) return "bg-gray-300";
  if (score >= 80) return "bg-green-500";
  if (score >= 65) return "bg-green-400";
  if (score >= 50) return "bg-blue-500";
  if (score >= 35) return "bg-yellow-500";
  return "bg-red-500";
};

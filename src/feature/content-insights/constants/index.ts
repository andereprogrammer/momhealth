export const categoryColorCodes = {
  Gynec: ['#FACEE2', '#E59CC2', '#FFFBF8', '#5F1C66'],
  Mentalhealth: ['#C69DF9', '#732DCF', '#FFFBF8', '#5F1C66'],
  Fitness: ['#5F1C66', '#2B4FD', '#FFFBF8', '#5F1C66'],
  Yoga: ['#FACEE2', '#E59CC2', '#FFFBF8', '#5F1C66'],
  Physio: ['#FF9F7F', '#FF7963', '#FFFBF8', '#5F1C66'],
  GarbhSanskar: ['#FFDD8D', '#FFC133', '#FFFBF8', '#5F1C66'],
  Nutrition: ['#CBE1B0', '#B4D091', '#FFFBF8', '#5F1C66'],
};

export const getColorCodesByCategory = (category: string): string[] => {
  switch (category) {
    case 'Gynec':
      return ['#FACEE2', '#E59CC2', '#FFFBF8', '#5F1C66'];
    case 'Mental health':
      return ['#C69DF9', '#732DCF', '#FFFBF8', '#5F1C66'];
    case 'Fitness':
      return ['#5F1C66', '#2B4FD', '#FFFBF8', '#5F1C66'];
    case 'Yoga':
      return ['#FACEE2', '#E59CC2', '#FFFBF8', '#5F1C66'];
    case 'Physio':
      return ['#FF9F7F', '#FF7963', '#FFFBF8', '#5F1C66'];
    case 'Garbh Sanskar':
      return ['#FFDD8D', '#FFC133', '#FFFBF8', '#5F1C66'];
    case 'Nutrition':
      return ['#CBE1B0', '#B4D091', '#FFFBF8', '#5F1C66'];
    default:
      return ['#CBE1B0', '#B4D091', '#FFFBF8', '#5F1C66'];
  }
};

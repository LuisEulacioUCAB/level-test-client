export const getLevel = (answers: number): string => {
  if (answers >= 0 && answers <= 10) {
    return 'Nivel A1 Beginner';
  }
  if (answers >= 11 && answers <= 20) {
    return 'Nivel A2 beginner';
  }

  if (answers >= 21 && answers <= 30) {
    return 'Nivel intermediate B1';
  }

  if (answers >= 31 && answers <= 40) {
    return 'Intermediate Nivel B2';
  }

  if (answers >= 41 && answers <= 50) {
    return 'Advance C1';
  }
  if (answers >= 51 && answers <= 60) {
    return 'Advance C2';
  }

  return '';
};

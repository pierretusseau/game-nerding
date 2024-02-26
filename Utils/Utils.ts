export const getRandomEntries = <T>(array: GameGenre[]): Genre[] => {
  let originalArray = array;

  for (let i = originalArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [originalArray[i], originalArray[j]] = [originalArray[j], originalArray[i]];
  }

  const resultArray = originalArray
    .slice(0,3)
    .sort((a, b) => a.id - b.id)
  
  return resultArray
};
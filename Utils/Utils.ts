export const getRandomEntries = <T>(array: T[], numEntries: number): T[] => {
  // Check if the array is not empty
  if (array.length === 0) {
    return []; // or handle the empty array case as needed
  }

  // Calculate the number of entries to select (up to the array length)
  const numToSelect = Math.min(numEntries, array.length);

  // Create a copy of the array to avoid modifying the original array
  const shuffledArray = [...array];

  // Shuffle the array using Fisher-Yates algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  // Return the selected entries
  return shuffledArray.slice(0, numToSelect);
};
export const arrayToChunks = (array: (string|any)[], chunkSize: number) => {
  const myArray = [...array];
  const results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize));
  }

  return results;
};

export const other = "";

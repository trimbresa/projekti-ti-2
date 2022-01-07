/**
 *
 * @description Updates an existing item in array
 * @param {Array} originalArray
 * @param {Object} item
 * @param {String} updateByField
 * @return {Array}
 */
 export const updateItemInArray = (originalArray, item, updateByField) => {
  const existingItemIndex = originalArray.findIndex(
    (updatedItem) => updatedItem[updateByField] === item[updateByField],
  );
  if (existingItemIndex !== -1) {
    const updatedArray = [
      ...originalArray.slice(0, existingItemIndex),
      item,
      ...originalArray.slice(existingItemIndex + 1),
    ];
    return updatedArray;
  }

  return originalArray;
};
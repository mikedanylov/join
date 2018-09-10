/**
 * Shallow flattening of array of arrays
 * @param {Array} arrays
 * @returns {Array}
 */
const flatten = arrays => {
  if (!arrays || !Array.isArray(arrays)) {
    return [];
  }

  const reducer = (acc, curr) => [...acc, ...curr];
  
  return arrays.reduce(reducer, []);
};

/**
 * Remove duplicates from an array
 * @param {Array} array
 * @returns {Array}
 */
const removeDuplicates = array => {
  if (!array || !Array.isArray(array)) {
    return [];
  }

  let uniqueArray = [];
  let resultMap = {};

  array.forEach(element => {
    const existingValue = resultMap[JSON.stringify(element)];

    if (existingValue) {
      resultMap[JSON.stringify(element)] = existingValue + 1;
    } else {
      resultMap[JSON.stringify(element)] = 1;
      uniqueArray.push(element);
    }
  });

  return uniqueArray;
};

/**
 * Compare elements by lastModified property
 * @param {Object} element1
 * @param {Object} element2
 * @returns {number}
 */
const sortByLastModifiedAsc = (element1, element2) => {
  if (!element1.lastModified || !element2.lastModified) {
    return 0;
  }

  if (!(element1.lastModified instanceof Date)) {
    return 0;
  }

  if (!(element2.lastModified instanceof Date)) {
    return 0;
  }

  return element1.lastModified.getTime() - element2.lastModified.getTime();
};

module.exports = function(arr1 /*, arrn */) {
  const argsArray = [].slice.call(arguments);

  if (!argsArray || !Array.isArray(argsArray)) {
    return [];
  }

  const flatArray = flatten(argsArray);
  const uniqueArray = removeDuplicates(flatArray);
  const sortedArray = uniqueArray.sort(sortByLastModifiedAsc);

  return sortedArray;
};

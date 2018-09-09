module.exports = function(arr1 /*, arrn */) {
  var argsArray = [].slice.call(arguments);

  if (!argsArray || !Array.isArray(argsArray)) {
    return [];
  }

  var flatArray = flatten(argsArray);
  var uniqueArray = removeDuplicates(flatArray);
  var sortedArray = uniqueArray.slice(0).sort(sortByLastModifiedAsc);

  return sortedArray;
};

/**
 * Shallow flattening of array of arrays
 * @param {Array} arrays
 * @returns {Array}
 */
function flatten(arrays) {
  if (!arrays || !Array.isArray(arrays)) {
    return [];
  }

  var flatArray = arrays.reduce(function(acc, curr) {
    return acc.concat(curr);
  }, []);

  return flatArray;
}

/**
 * Remove duplicates from an array
 * @param {Array} array
 * @returns {Array}
 */
function removeDuplicates(array) {
  if (!array || !Array.isArray(array)) {
    return [];
  }

  var uniqueArray = [];
  var resultMap = {};

  array.forEach(function(element) {
    var existingValue = resultMap[JSON.stringify(element)];
    if (existingValue) {
      resultMap[JSON.stringify(element)] = existingValue++;
    } else {
      resultMap[JSON.stringify(element)] = 1;
      uniqueArray.push(element);
    }
  });

  return uniqueArray;
}

/**
 * Compare elements by lastModified property
 * @param {Object} element1
 * @param {Object} element2
 * @returns {number}
 */
function sortByLastModifiedAsc(element1, element2) {
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
}

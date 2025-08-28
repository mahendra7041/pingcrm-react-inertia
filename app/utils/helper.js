export function excludeFields(inputObject, excludedKeys) {
  const result = {};
  Object.keys(inputObject).forEach((key) => {
    if (!excludedKeys.includes(key)) {
      Object.assign(result, { [key]: inputObject[key] });
    }
  });
  return result;
}

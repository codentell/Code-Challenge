const isEmpty = value => (value === undefined
  || value === null
  || (typeof value === 'object' && Object.keys(value).length === 0)
  || (typeof value === 'string' && value.trim().length === 0));

module.exports = function validateBookmark(data) {
  const errors = {};
  if (!data.id) {
    errors.id = 'no id';
  }
  if (!data.thumbnailURL) {
    errors.thumbnailURL = 'no thumbnailURL';
  }
  if (!data.name) {
    errors.name = 'no name';
  }
  if (!data.address) {
    errors.address = 'no address';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

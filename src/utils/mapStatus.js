const sucessStatus = 200;
const successfullCreationStatus = 201;

const errorStatusMap = {
  INVALID_VALUE: 400,
  PRODUCT_NOT_FOUND: 404,
  NAME_IS_REQUIRED: 400,
  NAME_LENGTH_ERROR: 422,
};

const mapStatusError = (type) => {
  if (errorStatusMap[type]) return errorStatusMap[type];
  return 200;
};

module.exports = {
  sucessStatus,
  successfullCreationStatus,
  mapStatusError,
};

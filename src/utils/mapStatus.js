const sucessStatus = 200;

const errorStatusMap = {
  PRODUCT_NOT_FOUND: 404,
};

const mapStatusError = (type) => {
  if (errorStatusMap[type]) return errorStatusMap[type];
  return 200;
};

module.exports = {
  sucessStatus,
  mapStatusError,
};

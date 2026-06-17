const toSqlValue = (value) => (value === undefined ? null : value);

const hasValue = (value) => value !== undefined && value !== null && value !== '';

module.exports = {
  hasValue,
  toSqlValue,
};

const { v4: uuidv4 } = require('uuid');

async function createColumns(oldColumns = [], newColumns = []) {
  const result = newColumns
    .filter((column) => (column.title && column.order))
    .map((column) => {
      if (column.id) return column;
      return {
        id : uuidv4(),
        ...column
      };
    });
  oldColumns.forEach((oldColumn) => {
    const check = result.indexOf((newColumn) => newColumn.id === oldColumn.id);
    if (check < 0) result.push(oldColumn);
  });
  return result;
}

module.exports = {
  createColumns
}